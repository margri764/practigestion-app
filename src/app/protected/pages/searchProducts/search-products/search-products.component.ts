import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Articulo } from 'src/app/protected/interfaces/articulo.interface';
import { DetalleItem } from 'src/app/protected/interfaces/order.interface';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { OrderService } from 'src/app/protected/services/order/order.service';
import * as articleAction from 'src/app/article.actions'
import { GenericSuccessComponent } from 'src/app/protected/messages/generic-success/generic-success/generic-success.component';
import { SelectArticleMessageComponent } from 'src/app/protected/messages/select-article-message/select-article-message/select-article-message.component';
import { Router } from '@angular/router';
import { getDataLS, saveDataLS } from 'src/app/protected/Storage';
import { LocalStorageService } from 'src/app/protected/services/localStorage/local-storage.service';


@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit, OnDestroy {

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  
  authSuscription! : Subscription;
  articleSuscription! : Subscription;
  arrArticles : Articulo []=[];
  arrItemSelected : DetalleItem []=[];
  
  labelNoArticles : boolean = false;
  isLoading : boolean = false;
  isArticleFounded : boolean = false;
  articleFounded : any = {};

      // search
      itemSearch : string = '';
      mostrarSugerencias: boolean = false;
      sugested : string= "";
      suggested : any[] = [];
      spinner : boolean = false;
      alert:boolean = false;
      fade : boolean = false;
      search : boolean = true;
      product  : any[] = [];
      // search

  constructor(
            private articleService :ArticlesService,
            private dialog : MatDialog,
            private store : Store <AppState>,
            private orderService : OrderService,
            private router : Router,
            private localStorageService: LocalStorageService

  ) { }

  ngOnDestroy() {
    // Aquí cancela tus suscripciones
    if (this.authSuscription) {
      this.authSuscription.unsubscribe();
    }
    if (this.articleSuscription) {
      this.articleSuscription.unsubscribe();
    }
  }
  ngOnInit(): void {

    // this.getProducts();

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
                        codigoInterno : article.codigoArticulo,
                        id : article.idArticulo,
                        bonificacionPorciento: 0,
                        ventaTotal: (1 * article.precioCostoConIva) 
    }

    if(articlesInLStorage == undefined){
      articlesInLStorage = [];
    }

    articlesInLStorage.push(fastSelect);

    //hago el update en redux y LS 
    const updatedArr = [...this.arrItemSelected, fastSelect];
    this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: updatedArr }));
    this.localStorageService.saveStateToSessionStorage(articlesInLStorage, "arrArticles");
    this.openGenericSuccess('1 Producto añadido con éxito')
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

  // search

       // search
       close(){
        this.mostrarSugerencias = false;
        this.itemSearch = '';
        this.suggested = [];
        this.spinner= false;
      }
    
      teclaPresionada(){
    
        console.log(this.mostrarSugerencias);
         
         this.debouncer.next( this.itemSearch );  
         this.sugerencias(this.itemSearch)
         if(this.itemSearch == ''){
           this.suggested=[];
           this.mostrarSugerencias = false  
         }
         if(this.suggested.length === 0) {
           this.spinner= true;
         }
     
       };
    
       sugerencias(value : string){
          this.spinner = true;
          this.itemSearch = value;
          this.mostrarSugerencias = true;  
          const valueSearch = value.toUpperCase();
          this.articleService.searchProducts(valueSearch)
          .subscribe ( ({articulos} )=>{
            if(articulos.length !== 0){
              // this.arrArticlesSugested = articulos;
              this.suggested = articulos.splice(0,10);
              console.log(this.suggested);
                this.spinner = false;
              }else{
                // this.labelNoArticles = true;
              }
            }
          )
        }
     
      buscar(){
       this.onEnter.emit( this.itemSearch );
     
      }
    
       
       Search( id : any ){
        
         this.mostrarSugerencias = true;
         this.alert = false;
         this.spinner = true;
         this.fade = false;
         this.articleService.searchProductById(id)
         .subscribe ( ({articulos} )=>{
            console.log(articulos);
            if(articulos){
              this.articleFounded = articulos;
              this.spinner = false;
              this.close();
              this.isArticleFounded = true;
            }else{
              // this.labelNoArticles = true;
            }
          }
         )
    
      }
    
      searchSuggested( id: any ) {
        console.log(id);
        this.Search( id );
      }
      // search

  goBack(){
    this.router.navigateByUrl('/armar-pedido')
    setTimeout(()=>{
      this.orderService.changeClientValue.emit(true);
    },0)
  }

  styleObject(status : boolean) : object {
 
    if(!status){
      return {'color':'red'};
    }else{
      return {'color':'blue'};
    }
  }

  openGenericSuccess(msg : string){

    this.dialog.open(GenericSuccessComponent, {
      data: msg,
      disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  }

  openDialogArticle(article : any){

    this.dialog.open(SelectArticleMessageComponent, {
      data: article,
      // disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  
  }
}
