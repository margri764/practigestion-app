import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, filter, Subject, Subscription, take } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AskUserComponent } from '../../messages/ask-user/ask-user/ask-user.component';
import { SuccessUserComponent } from '../../messages/success-user/success-user/success-user.component';
import { AdminsMessageComponent } from '../../messages/admins-message/admins-message/admins-message.component';
import { Staff } from 'src/app/models/staff.models';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.scss']
})
export class EditCustomersComponent implements OnInit, OnDestroy {

  userSubscription! : Subscription;
  users : any[]=[];
  user: any;
  askAction : string = '';
  isPaused : boolean = false; 
  action : string = '';
  deleteOrPlay : boolean = false;
  userArray : any[]=[];

  // search
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  onDebounce: EventEmitter<string> = new EventEmitter();
  alert : boolean = false;
  spinner! : boolean;
  fade : boolean = false;
  itemSearch : any;
  mostrarSugerencias: boolean = false;
  suggested : any[] = [];
  showSearch : boolean = false; 
  itemArray : any [] = [];
  private staff! : Staff;
  // search

  constructor(
               private authService : AuthService,
               private store : Store <AppState>,
               private dialog : MatDialog,
               private router : Router

  ) { }

getAllUsers(){

    this.authService.getAllUsers().subscribe(
      (res)=>{ 
                if(res.success){
                  this.users = res.users
                }
      })
}

 ngOnInit(): void {

  this.userSubscription = this.store.select('user')
  .pipe(
    filter(({user}) => user != null && user != undefined)
    ).subscribe(
    ({user})=>{ 
              this.staff = user;  
              this.getAllUsers()}
  )

    this.debouncer
  .pipe(debounceTime(100))
  .subscribe( valor => {
    this.onDebounce.emit( valor );
    
  });
}

askEditAction() {
    this.dialog.open(AskUserComponent, {
      data: {ask: this.askAction , user: `${this.user.firstName} ${this.user.lastName}`},
      panelClass:"custom-modalbox-message",
  });
}

successUser(){
    this.dialog.open(SuccessUserComponent, {
      data: {action: this.action},
      panelClass:"custom-modalbox-message",
  });
}

deleteItem( user : User){

    this.user = user;
    if(this.staff.role === "STAFF_ROLE"  ){
      this.openDialogAdmins();
      return
    }
    
    this.askAction = 'eliminar';
    this.askEditAction();

    this.authService.cancelOrNextUser.pipe(
      take(1)
    ).subscribe( (res)=> { // el ask-edit dispara ui boolean si se elige CONTINUAR con la acción
      
      if(res === "eliminar"){
      this.authService.deleteUser( user._id).subscribe(
        ({success})=>{
          
            if(success){
              this.action = 'eliminado';
              this.successUser();
              this.getAllUsers();
                      } }
        )}
    })
  
}

pausePlayItem( user : User){

    this.user = user;
    this.askAction = 'habilitar';
    this.askEditAction();
  
    this.authService.cancelOrNextUser
    .pipe(
      take(1)
    ).subscribe( (res:string)=> { // el ask-edit dispara ui boolean si se elige CONTINUAR con la acción
      
      if(res === "habilitar" ){
      this.authService.activeUserAccount( user).subscribe(
        ({success})=>{
            if(success){
              // this.isLoading = false;
              this.action = 'habilitado';
              this.successUser();
              this.getAllUsers();
                       }}
        )}
      })
}

navigateToHistory(user : User){

  // Supongamos que este es tu ID de MongoDB
  let mongoId = user._id;
    
  // Obtenemos las tres partes del ID
  let firstPart = mongoId.substring(0, 2);
  let addPart = "1"
  let secondPart = mongoId.substring(2, 24);
  let newMongoId = firstPart + addPart + secondPart;
  this.router.navigateByUrl(`/dashboard/user-history-purchase/${newMongoId}`)
}
  
ngOnDestroy(): void {
    if(this.userSubscription != undefined){
      this.userSubscription.unsubscribe()
    }
}

// start search
close(){
  this.mostrarSugerencias = false;
  this.itemSearch= "";
  this.itemArray = [];
}

teclaPresionada(){

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

buscar(){
this.onEnter.emit( this.itemSearch );
}

sugerencias(value : string){

this.itemSearch = value;
this.mostrarSugerencias = true;  
const valueSearch = value; 
this.authService.searchUser( valueSearch  )
.subscribe ( 
  ({users}) => {
    if(users){
      this.suggested = users.splice(0,10);
      this.spinner = false;
    }

});
}
 
Search( valueSearch : string ){

this.alert = false;
this.spinner = true;
this.fade = false;
this.itemSearch = valueSearch;
const value= valueSearch.toUpperCase();
this.authService.searchUser(value ).subscribe (
   ({users})=>{
        this.userArray = users;
        console.log(users);
        this.spinner = false;
})
}

showSearchInFront(item : any){
  this.itemArray = [];
  this.itemArray.push(item) 
  console.log(this.itemArray);
}
   
searchSuggested( termino: string ) {
this.Search( termino );
}
// end search

openDialogAdmins() {
  this.dialog.open(AdminsMessageComponent, {
    disableClose: true,
    panelClass:"custom-modalbox-message", // no se toman pedidos
  });
}

}
