import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { EditClientComponent } from '../../edit-client/edit-client/edit-client.component';
import { NewClientComponent } from '../../new-client/new-client/new-client.component';
import { Subject, take } from 'rxjs';
import { ErrorService } from 'src/app/protected/services/error/error.service';
import { AskDelClientComponent } from 'src/app/protected/messages/ask-del-client/ask-del-client/ask-del-client.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  
// start search
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();

  itemSearch : string = '';
  mostrarSugerencias: boolean = false;
  sugested : string= "";
  suggested : any[] = [];
  spinner : boolean = false;
  alert:boolean = false;
  fade : boolean = false;
  search : boolean = true;
  product  : any[] = [];
// end search

  contactos : any []=[];
  isLoading : boolean = false;
  arrClient : any []=[];
  clientFounded : any = {};
  isClientFounded : boolean = false;
  labelNoFinded : boolean = false;

  constructor(
              private authService : AuthService,
              private dialog : MatDialog,
              private errorService : ErrorService
  ) { }

  ngOnInit(): void {
   
  }

getAllClients(){
  this.isLoading = true;
  this.authService.getAllClients().subscribe(
    ({contactos})=>{
      this.contactos = contactos;
      this.isLoading = false
    })
}

  deleteClient(id : any){

      this.dialog.open(AskDelClientComponent, {
        data: this.clientFounded.archivarComo,
        panelClass:"custom-modalbox-edit",
      });
  
      this.errorService.authDelClient$.pipe(
        take(1)
      ).subscribe( (auth)=> { // el ask-edit dispara ui boolean si se elige CONTINUAR con la acción
        
        if(auth){
          this.authService.deleteClientById(id).subscribe( 
            ()=>{})
        }
      })
   
  }

  editClient(client: any){


  this.dialog.open(EditClientComponent, {
    data: client,
    // disableClose: client,
    panelClass:"custom-modalbox-NoMoreComponent", 
  });

  }

  addClient(){
    this.dialog.open(NewClientComponent, {
      // data: client,
      // disableClose: client,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  }

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
        this.authService.searchClientByName(valueSearch)
        .subscribe ( ({contactos} )=>{
          if(contactos.length !== 0){
            // this.arrArticlesSugested = articulos;
            this.suggested = contactos.splice(0,10);
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
       this.authService.getClientById(id)
       .subscribe ( ({contacto} )=>{
          console.log(contacto);
          if(contacto){
            this.clientFounded = contacto;
            this.spinner = false;
            this.close();
            this.isClientFounded = true;
          }else{
            // this.labelNoArticles = true;
          }
        }
       )
  
    }
  
    searchSuggested( id: any ) {
      this.Search( id );
    }
    // search
  

}
