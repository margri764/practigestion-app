import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import * as authActions from 'src/app/auth.actions'
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/protected/services/error/error.service';


@Component({
  selector: 'app-pick-client-message',
  templateUrl: './pick-client-message.component.html',
  styleUrls: ['./pick-client-message.component.scss']
})
export class PickClientMessageComponent implements OnInit {

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();

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

    arrClient : any []=[];
    arrClientFinded : any []=[];
    labelNoFinded : boolean = false;

  constructor(
              private authService : AuthService,
              private store : Store <AppState>,
              private dialogRef: MatDialogRef<PickClientMessageComponent>,
              private router : Router,
              private errorService : ErrorService


  ) { }

  ngOnInit(): void {

    this.errorService.close$.subscribe((emited)=>{if(emited)this.dialogRef.close()})

    this.spinner = true;

    this.authService.getAllClients().subscribe(
      ({contactos})=>{
        console.log(contactos);
         this.arrClient = contactos;
         this.spinner = false;
      })
  }

  selectClient(client :any){
    this.store.dispatch(authActions.setTempClient({client}));
    setTimeout(()=>{
      this.dialogRef.close();
      this.router.navigateByUrl('/armar-pedido')
    },1000)
  }

  close(){
    this.mostrarSugerencias = false;
    this.itemSearch="";
  }

 
  buscar(){
   this.onEnter.emit( this.itemSearch );
 
  }

   
   Search( valueSearch : string ){
    
     this.mostrarSugerencias = true;
     this.alert = false;
     this.spinner = true;
     this.fade = false;
     this.labelNoFinded = false;


     this.authService.searchClient(valueSearch)
     .subscribe ( ({contactos} )=>{
      console.log(contactos);
      
      this.spinner = false;
      if(contactos.length !== 0){
        this.arrClientFinded = contactos
        // this.user = contactos;
      }else{
        this.labelNoFinded = true;
      }
   
    })
  }

    searchSuggested( termino: string ) {
      this.Search( termino );
    }
 
}
