import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { LoginMessageComponent } from '../../messages/login-message/login-message/login-message.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  close$ = new BehaviorSubject<boolean>(false) //quiero a ce cierren todos los modals cuando se produce un error de servidor 

  isLoading$ = new BehaviorSubject<boolean>(false) //quiero a ce cierren todos los modals cuando se produce un error de servidor 

  constructor(
              private router : Router,
              private _bottomSheet : MatBottomSheet,
              private dialog : MatDialog
  ) { }

  getError(error : any){
    // si se cae el back
    if (error.error instanceof ProgressEvent) {
      // this.logout();
      // this.launchMaintenance();
    }

    if (error.status === 401) {
      this.close$.next(true);
      this.close$.next(false);
      this.openDialogLogin();
      
    }
     

     
  }

  logout(){
    sessionStorage.removeItem("token");
  }

  openDialogLogin() {
    this.dialog.open(LoginMessageComponent);
  }

}
