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
// orderSubscription!:Subscription;
user: any | undefined;
toogle : boolean = false;
hidden : boolean = false;
// show : boolean = true;
// orders : any [] = [];
alert! : string | null;
showNoProcessMessage : boolean = false;
notificationsDone! : boolean;
// staffOrders : any []= [];

constructor(
              private store : Store <AppState>,
              private cookieService : CookieService,
              private router : Router,
              private _bottomSheet: MatBottomSheet,
              private authService : AuthService,
  ) { 

    
  if(getDataSS("logged") === true || getDataLS("logged") == true){
    this.cookieService.get('token');
     
  }
  }



visibility(){
    this.toogle = !this.toogle
}


ngOnInit(): void {


//   const interval = setInterval(()=>{
//     console.log(this.user);
//     if(this.user !== undefined ){
//       this.store.dispatch(orderActions.launchSetStaffOrder())
//     }else{
//       clearInterval(interval);
//     }
//   }, 50000)


  this.userSubscription = this.store.select('auth')
  .pipe(
    filter(({user}) => user != null)
    )
    .subscribe(
      ({user})=>{ 
                  this.user = user;
                  // this.store.dispatch(orderActions.launchSetStaffOrder())
                }
          )

// this.orderSubscription = this.store.select('order')
// .pipe(
//   filter(({staffOrders}) => staffOrders != null)
//      )
//      .subscribe(
//       ({ staffOrders })=>{
//         if(staffOrders != null){
//           this.staffOrders = staffOrders;
//          this.ordersToNotifications()
//          }
//        })
}

showDashboard(){
  // this.show = false;
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
  // if(this.userSubscription != undefined){
  //   this.userSubscription.unsubscribe();
  // }
  // if(this.orderSubscription != undefined){
  //   this.orderSubscription.unsubscribe();
  // }
}

ordersToNotifications(){
  // const filteredOrders = this.staffOrders.filter((element) => element.statusOrder.length === 1);
  // let count = filteredOrders.length;
  // if( count !== 0){
  //   this.showNoProcessMessage = true;
  //   this.alert = "!";
  //   this.notificationsDone = false;
  // }else{
  //   this.alert = null;
  //   this.showNoProcessMessage = false;
  //   this.notificationsDone = true;
  // }                     
}


}