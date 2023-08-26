import { EventEmitter, Injectable } from '@angular/core';

import { LoginMessageComponent } from '../../messages/login-message/login-message/login-message.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, tap } from 'rxjs';
import * as authActions from 'src/app/auth.actions'
import * as articleActions from 'src/app/article.actions'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/app/app.reducer';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private baseUrl = environment.baseUrl;
  close$ = new BehaviorSubject<boolean>(false) //quiero a ce cierren todos los modals cuando se produce un error de servidor 

  isLoading$ = new BehaviorSubject<boolean>(false) //quiero a ce cierren todos los modals cuando se produce un error de servidor 
  authDelTempOrder$ : EventEmitter<boolean> = new EventEmitter<boolean>; 
  authDelClient$ : EventEmitter<boolean> = new EventEmitter<boolean>; 
  
  constructor(
              private dialog : MatDialog,
              private http : HttpClient,
              private store : Store <AppState>,
              private cookieService: CookieService,

  ) { }

  getError(error : any){
    // si se cae el back
    if (error.error instanceof ProgressEvent) {
      // this.logout();
      // this.launchMaintenance();
    }

    if (error.status === 401) {
      this.openDialogLogin();
      // this.logout().subscribe();
    }
  }

  logout(){
    return this.http.get<any>(`${this.baseUrl}api/logout`) 
    .pipe(
      tap( (res)=>{
                 console.log("desde logout",res); 
                //  sessionStorage.removeItem("token");
                //  this.close$.next(true);
                //  this.close$.next(false);
                //  localStorage.removeItem("logged");
                //  sessionStorage.removeItem("token");
                //  sessionStorage.removeItem("logged");
                //  localStorage.removeItem("logged");
                //  this.cookieService.delete('token')
                //  this.store.dispatch(articleActions.unSetArticles());
                //  this.store.dispatch(articleActions.unSetSelectedArticles());
                //  this.store.dispatch(articleActions.unSetTempOrder());
                //  this.store.dispatch(authActions.unSetTempClient());
                //  this.store.dispatch(authActions.unSetUser());
                //  this.router.navigateByUrl('/login');
               }
      ),
      map( res => res )
    )
  }
  

  openDialogLogin() {
    this.dialog.open(LoginMessageComponent);
  }

}
