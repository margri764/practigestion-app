import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Articulo } from '../../../interfaces/articulo.interface'
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditArticleComponent } from '../../edit-article/edit-article/edit-article.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  
  arrArticles : Articulo[]=[]

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
  arrArticlesSugested : any[]=[];
  // search

  constructor(
              private articleService : ArticlesService,
              private dialog : MatDialog
  ) { }

  ngOnInit(): void {

    // this.articleService.getAllArticles().subscribe(
    //   ({articulos})=>{

    //         if(articulos.length !== 0){

    //           this.arrArticles = articulos;
    //           console.log(articulos);

    //         }
    //   }
    // );

  }



  addArticles(){

    
    this.dialog.open(EditArticleComponent, {
      // data: msg,
      disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });

  }

  deleteArticle( id:any ){}

  editArticle( id:any ){

 // para edita abro un dialog 
 // este es el endpoint editProductById()
    
  }


    // search
    close(){
      this.mostrarSugerencias = false;
      this.itemSearch="";
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
  
      this.itemSearch = value;
      this.mostrarSugerencias = true;  
      const valueSearch = value.toUpperCase();
      this.articleService.searchProductById(valueSearch).subscribe(
        ({articulos})=>{
          console.log(articulos);
          if(articulos.length !== 0){
            // this.arrArticlesSugested = articulos;
            this.suggested = articulos.splice(0,10);
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
  
     
    Search( valueSearch : string ){
      
       this.mostrarSugerencias = true;
       this.alert = false;
       this.spinner = true;
       this.fade = false;
  
       this.articleService.searchProductById(valueSearch).subscribe(
        ({articulos})=>{
          console.log(articulos);
          if(articulos.length !== 0){
            this.arrArticlesSugested = articulos;
          }else{
            // this.labelNoArticles = true;
          }
        }
       )
      //  this.labelNoFinded = false;
  
  
      //  this.authService.searchClient(valueSearch)
      //  .subscribe ( ({contactos} )=>{
      //   console.log(contactos);
        
      //   this.spinner = false;
      //   if(contactos.length !== 0){
      //     this.arrClientFinded = contactos
      //     // this.user = contactos;
      //   }else{
      //     this.labelNoFinded = true;
      //   }
     
      // })
    }
  
    searchSuggested( termino: string ) {
      this.Search( termino );
    }
    // search


}
