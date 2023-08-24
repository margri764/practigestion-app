import { EventEmitter, Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { LoginMessageComponent } from '../../messages/login-message/login-message/login-message.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { getDataLS } from '../../Storage';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  close$ = new BehaviorSubject<boolean>(false) //quiero a ce cierren todos los modals cuando se produce un error de servidor 

  isLoading$ = new BehaviorSubject<boolean>(false) //quiero a ce cierren todos los modals cuando se produce un error de servidor 
  authDelTempOrder$ : EventEmitter<boolean> = new EventEmitter<boolean>; 
  authDelClient$ : EventEmitter<boolean> = new EventEmitter<boolean>; 
  
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
      this.logout();
      
    }
     
  }

  logout(){
    sessionStorage.removeItem("token");
    this.close$.next(true);
    this.close$.next(false);
    localStorage.removeItem("logged")
  }

  openDialogLogin() {
    this.dialog.open(LoginMessageComponent);
  }

}
