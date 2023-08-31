import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import * as authActions from 'src/app/auth.actions';
import * as articleActions from 'src/app/article.actions';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.models';
import { getDataLS, getDataSS } from '../../Storage';
import { CookieService } from 'ngx-cookie-service';
import { ErrorService } from '../../services/error/error.service';
import { OrderService } from '../../services/order/order.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { GenericMessageComponent } from '../../messages/generic-message/generic-message/generic-message.component';
import { MatDialog } from '@angular/material/dialog';

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
alert! : any;
showNoProcessMessage : boolean = false;
notificationsDone! : boolean;
login : boolean = false;
phone : boolean = false;
constructor(
              private store : Store <AppState>,
              private cookieService : CookieService,
              private errorService : ErrorService,
              private dialog : MatDialog,
              private router : Router,
              private authService : AuthService,
              private orderService : OrderService,
              private localStorageService : LocalStorageService
  ) { 

    
    if( getDataLS("logged") && this.cookieService.get('token') && !getDataSS('openOrders')){
      this.orderService.getOpenOrders().subscribe();
      console.log("nod eberia entrar");
    }

  (screen.width <= 600) ? this.phone = true : this.phone = false;

  }

visibility(){
    this.toogle = !this.toogle
}


ngOnInit(): void {
  this.checkSessionStorage();

  this.articleSuscription = this.store.select('article')
  .pipe(
    filter( ({tempOrder})=>  tempOrder.length !== 0 ),

  ).subscribe(({tempOrder})=>{

    if(tempOrder.length !==0){
      this.showLabelTempOrder = true;
      console.log(tempOrder.length);
      this.alert = tempOrder.length;
    }
  })

  this.userSubscription = this.store.select('auth')
  .pipe(
    filter( ({user})=>  user != null && user != undefined),
  ).subscribe(
    ({user})=>{
      this.user = user;
      this.login = true;
    })

  
}

checkSessionStorage(){
  const articles = getDataSS("arrArticles");
  const client = getDataSS("tempClient");
  if( (articles && articles.length !== 0 )|| client){
    this.openGenericMessage("Existe un pedido incompleto!!")
  }
}

openGenericMessage(msg:string){
  this.dialog.open(GenericMessageComponent, {
    data: msg,
    panelClass:"custom-modalbox-NoMoreComponent", 
  });

}


logout() {

  this.errorService.logout().subscribe(
     (res)=>{if(res)this.login = false;});
  }

ngOnDestroy(): void {

}



}