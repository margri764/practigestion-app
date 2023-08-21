import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import * as authActions from 'src/app/auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.models';
import { getDataLS, getDataSS } from '../../Storage';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {


@ViewChild(MatAccordion)  accordion!: MatAccordion;

userSubscription!:Subscription;
articleSuscription!:Subscription;
user: any | undefined;
tempOrder : any []=[];
toogle : boolean = false;
hidden : boolean = false;
showLabelTempOrder : boolean = false;
// orders : any [] = [];
alert! : string | null;
showNoProcessMessage : boolean = false;
notificationsDone! : boolean;
// staffOrders : any []= [];

constructor(
              private store : Store <AppState>,
              private cookieService : CookieService,
  ) { 

    
  if(getDataSS("logged") === true || getDataLS("logged") == true){
    this.cookieService.get('token');
     
  }
  }



visibility(){
    this.toogle = !this.toogle
}


ngOnInit(): void {


  this.articleSuscription = this.store.select('article')
  .pipe(

  ).subscribe(({tempOrder})=>{

    if(tempOrder.length !==0){
        this.showLabelTempOrder = true;
        this.alert= '!';
    }else{
      this.alert= '';

    }
  })

}



logout() {

  // this.authService.logout().subscribe(
  //   ( {ok} )=>{
  //       if(ok){

  //         sessionStorage.clear();
  //           localStorage.clear();
  //           this._bottomSheet.dismiss();
  //           this.authService.closeBanner.emit(true);
  //           this.store.dispatch( authActions.setBanner());
  //           this.store.dispatch( authActions.unSetUser());
  //           this.store.dispatch( orderActions.unSetStaffOrder());
  //           this.store.dispatch( orderActions.unSetArrayNoProcessOrder());
  //           this.store.dispatch( productActions.unsetArrayProduct());
  //           this.authService.token = "";
  //           this.authService.user = undefined;
  //           this.user = undefined;
            
  //           setTimeout(()=>{
  //             console.log('logout desde el STAFF dashboard')
  //             this.router.navigateByUrl('start')
  //           },1000)
            
  //         }
  //       }

  // )
  
}

ngOnDestroy(): void {

}



}