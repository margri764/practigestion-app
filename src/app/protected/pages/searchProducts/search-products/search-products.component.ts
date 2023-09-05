import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Articulo } from 'src/app/protected/interfaces/articulo.interface';
import { DetalleItem } from 'src/app/protected/interfaces/order.interface';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { OrderService } from 'src/app/protected/services/order/order.service';
import * as articleAction from 'src/app/article.actions'
import { GenericSuccessComponent } from 'src/app/protected/messages/generic-success/generic-success/generic-success.component';
import { SelectArticleMessageComponent } from 'src/app/protected/messages/select-article-message/select-article-message/select-article-message.component';
import { Router } from '@angular/router';
import { getDataLS, getDataSS, saveDataLS } from 'src/app/protected/Storage';
import { LocalStorageService } from 'src/app/protected/services/localStorage/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit, OnDestroy {

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  debouncerCode: Subject<string> = new Subject();
  
  authSuscription! : Subscription;
  articleSuscription! : Subscription;
  arrArticles : Articulo []=[];
  arrItemSelected : DetalleItem []=[];
  
  labelNoArticles : boolean = false;
  isLoading : boolean = false;
  isArticleFounded : boolean = false;
  articleFounded : any = {};
  noMatches : boolean = false;
  myForm! : FormGroup;

  searchOptions : string [] = ["Por descripción", "Por código"]


  // search by description
  itemSearch : string = '';
  mostrarSugerencias: boolean = false;
  sugested : string= "";
  suggested : any[] = [];
  spinner : boolean = false;
  alert:boolean = false;
  search : boolean = true;
  product  : any[] = [];
  // search

  // search by code
  itemSearchCode : string = '';
  mostrarSugerenciasCode: boolean = false;
  sugestedCode : string= "";
  suggestedCode : any[] = [];
  spinnerCode : boolean = false;
  alertCode:boolean = false;
  searchCode : boolean = true;
  productCode  : any[] = [];
  // search by code

  constructor(
            private articleService :ArticlesService,
            private dialog : MatDialog,
            private store : Store <AppState>,
            private orderService : OrderService,
            private router : Router,
            private localStorageService: LocalStorageService,
            private fb : FormBuilder,


  ) { 

    this.myForm = this.fb.group({
      itemSearch:  [ '',  ],
      searchOption:  [ '', ],
    });   
  }

  ngOnDestroy() {
    if (this.authSuscription) {
      this.authSuscription.unsubscribe();
    }
    if (this.articleSuscription) {
      this.articleSuscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    // despues de seleccionar el articulo con mas opciones como bonificacion, cierro el card de /buscar-pedidos
    this.orderService.selectProductOption$.subscribe((emmited)=>{ if(emmited){this.close()}
    })

    //para las busquedas
    this.myForm.get('itemSearch')?.valueChanges.subscribe(newValue => {
      this.itemSearch = newValue;
      if(this.itemSearch !== null){
        this.teclaPresionada();
      }
    });

    this.debouncer
    .pipe(debounceTime(400))
    .subscribe( valor => {
      this.sugerencias(valor);
    });

  

    this.articleSuscription = this.store.select('article')
    .pipe(

    ).subscribe(({arrSelectedArticles})=>{
      if(arrSelectedArticles.length !== 0){
        this.arrItemSelected = arrSelectedArticles;
      }
    })
  }


  fastSelect( article :  Articulo){

    let articlesInLStorage = getDataLS("arrArticles");

    // creo el objeto para guarda en ls y redux, tiene propiedades para mostrar en el front y otras para el BD
    const fastSelect = {
                        descripcionLarga : article.descripcionLarga,
                        precioCostoConIva: article.precioCostoConIva,
                        cantidad: 1,
                        codigoInterno : article.codigoInterno,
                        id : article.idArticulo,
                        bonificacionPorciento: 0,
                        ventaTotal: (1 * article.precioCostoConIva) 
    }

    if(articlesInLStorage == undefined){
      articlesInLStorage = [];
    }

    articlesInLStorage.push(fastSelect);

    //hago el update en redux y LS 
    let updatedArr = [...this.arrItemSelected, fastSelect];
    this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: updatedArr }));
    this.localStorageService.saveStateToSessionStorage(articlesInLStorage, "arrArticles");
    //guardo en el ss los articulos temporalmente, el concat lo uso para q no se sobreescriban los datos
    let tempData = getDataSS("arrArticles");
    updatedArr.concat(tempData);
    this.localStorageService.saveStateToSessionStorage(updatedArr, "arrArticles");
    this.openGenericSuccess('1 Producto añadido con éxito');
    this.close();



  }


  getProducts(){
    this.labelNoArticles= false;
    this.isLoading = true;
    this.articleService.getAllArticles().subscribe(
      ({articulos})=>{
        console.log(articulos);
        this.isLoading = false;
        if(articulos.length !== 0){
            this.arrArticles = articulos;
        }else{
          this.labelNoArticles = true;
  
        }
  
      }
    )
  }

  close(){
    this.mostrarSugerencias = false;
    this.itemSearch = '';
    this.suggested = [];
    this.spinner= false;
    this.myForm.reset();
    this.isArticleFounded = false;
  }
    
  teclaPresionada(){
    this.noMatches = false;
      this.debouncer.next( this.itemSearch );  
    };
    
  sugerencias(value : string){
    this.spinner = true;
    this.itemSearch = value;
    this.mostrarSugerencias = true;  
    const option = this.myForm.get('searchOption')?.value;
    let field;
    if( option === "Por descripción"){
        field = "desc_larga";
    }else{
        field = "codigo_interno";
    }
    this.articleService.searchArticle(field, value)
    .subscribe ( ({articulos} )=>{
      if(articulos.length !== 0){
        this.suggested = articulos;
          this.spinner = false;
          }else{
          this.spinner = false;
          this.mostrarSugerencias = false
          this.noMatches = true;
        }
      }
    )
  }
     
  Search( item : any ){
      this.articleService.searchProductById(item.idArticulo)
        .subscribe ( ({articulos} )=>{
          if(articulos){
            this.articleFounded = articulos;
            this.spinner = false;
            this.isArticleFounded = true;
            this.mostrarSugerencias = false;
            this.itemSearch = '';
            this.suggested = [];

          }
        }
        )
}

searchSuggested( item: any ) {
  this.Search( item );
}

  goBack(){
    this.router.navigateByUrl('/armar-pedido')
    setTimeout(()=>{
      this.orderService.changeClientValue.emit(true);
    },0)
  }


  openGenericSuccess(msg : string){

    let width : string = '';
    let height : string = '';

    if(screen.width >= 800) {
      width = "400px"
      height ="450px";
    }

    this.dialog.open(GenericSuccessComponent, {
      data: msg,
      width: `${width}`|| "",
      height:`${height}`|| "",
      disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  
  }
  openDialogArticle(article : any){
    let width : string = '';
    let height : string = '';

    if(screen.width >= 800) {
      width = "430px";
      height ="470px";
    }

    this.dialog.open(SelectArticleMessageComponent, {
      data: article,
      width: `${width}`|| "",
      height:`${height}`|| "",
      // disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  
  }
}
