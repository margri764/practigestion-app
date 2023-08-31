import { EventEmitter, Injectable } from '@angular/core';

import { LoginMessageComponent } from '../../messages/login-message/login-message/login-message.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, of, tap, throwError } from 'rxjs';
import * as authActions from 'src/app/auth.actions'
import * as articleActions from 'src/app/article.actions'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/app/app.reducer';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { ErrorBackendDownComponent } from '../../messages/error-backend-down/error-backend-down/error-backend-down.component';
import { Router } from '@angular/router';
import { getDataLS, getDataSS } from '../../Storage';
import { WrongActionMessageComponent } from '../../messages/wrong-action-message/wrong-action-message/wrong-action-message.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private baseUrl = environment.baseUrl;
  phone : boolean = false;
  
  height : string = '';
  width : string = '';
  isLoading$ = new BehaviorSubject<boolean>(false) //quiero a ce cierren todos los modals cuando se produce un error de servidor 
  close$ = new BehaviorSubject<boolean>(false) //quiero a ce cierren todos los modals cuando se produce un error de servidor 
  authDelTempOrder$ : EventEmitter<boolean> = new EventEmitter<boolean>; 
  authDelClient$ : EventEmitter<boolean> = new EventEmitter<boolean>; 
  closeIsLoading$ : EventEmitter<boolean> = new EventEmitter<boolean>; 
  // closePopUps$ : EventEmitter<boolean> = new EventEmitter<boolean>;
  
  constructor(
              private dialog : MatDialog,
              private http : HttpClient,
              private store : Store <AppState>,
              private cookieService: CookieService,
              private router : Router

  ) { 
    this.checkDisplaysizes()
  }

  getError(error : any) {

    // // si se cae el back
    // if (error.error instanceof ProgressEvent) {
    //   // this.logout();
    //   // this.launchMaintenance();
    // }

    if (error.status === 401) {
      this.openDialogLogin();
      this.close$.next(true);
      this.close$.next(false);
      return of(null);
    }

    if (error.status === 500 && error.error.message === "Pedido no encontrado"){
      this.closeIsLoading$.emit(true);
      this.openGenericMsgAlert(error.error.message);
      return of(null);
    }

    if (error.status === 500 && error.error.message === "El pedido no puede ser editado, se encuentra emitido o cancelado.") {
      // alert("El pedido no puede ser editado, se encuentra emitido o cancelado.");
      this.openGenericMsgAlert(error.error.message);
      this.closeIsLoading$.emit(true);
      return of(null);
    }
    
    if (error.status === 500) {
      this.openDialogBackendDown();
      return of(null);
    }

    // Devuelve un observable que emite el error original
    return throwError(() => error);

  }

  logout(){
    return this.http.get<any>(`${this.baseUrl}api/logout`) 
    .pipe(
      tap( (res)=>{
                 sessionStorage.removeItem("token");
                 this.close$.next(true);
                 this.close$.next(false);
                 localStorage.removeItem("logged");
                 localStorage.removeItem("user");
                 sessionStorage.removeItem("token");
                 sessionStorage.removeItem("openOrders");
                 this.cookieService.delete('token');
                 this.store.dispatch(articleActions.unSetArticles());
                 this.store.dispatch(articleActions.unSetSelectedArticles());
                 this.store.dispatch(authActions.unSetTempClient());
                 this.store.dispatch(authActions.unSetUser());
                 this.router.navigateByUrl('login'); 
                 setTimeout(()=>{location.reload();},100)
            
                 
               }
      ),
      map( res => res )
    )
  }
  
  checkDisplaysizes(){

    if(screen.width >= 800) {
      this.width = "400px";
      this.height ="550px";
    }
  }


  openDialogLogin() {


    this.dialog.open(LoginMessageComponent,{
      width: `${this.width}`|| "",
      height:`${this.height}`|| "",
      panelClass:"custom-modalbox-message",
    });
  }

  openDialogBackendDown(){

    this.dialog.open(ErrorBackendDownComponent,{
      width: `${this.width}`|| "",
      height:`${this.height}`|| "",
      panelClass:"custom-modalbox-message",
    });
  }
  openGenericMsgAlert(msg : string){

    let width : string = '';
    let height : string = '';

    if(screen.width >= 800) {
      width = "350px"
      height ="400px";
    }

    this.dialog.open(WrongActionMessageComponent, {
      data: msg,
      width: `${width}`|| "",
      height:`${height}`|| "",
      // disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  
  }
  
 }
