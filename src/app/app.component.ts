import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from './protected/services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from './app.reducer';
import { OrderService } from './protected/services/order/order.service';
import { Store } from '@ngrx/store';
import * as articleActions from './article.actions';
import { LocalStorageService } from './protected/services/localStorage/local-storage.service';
import { getDataLS, getDataSS } from './protected/Storage';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'practigestion-app';
  @Output () currentUrl : any = '';
  @Output () login : boolean = false;

  constructor(
              private localStorageService: LocalStorageService,
              public router : Router,
              private store : Store <AppState>,
              private orderService : OrderService,
              private cookieService : CookieService

  ){


    if( getDataLS("logged") && this.cookieService.get('token') && !getDataSS('openOrders')){
      this.login = true;
      this.orderService.getOpenOrders().subscribe();
      // console.log("nod eberia entrar");
  }
  console.log('1');
        

  }

  ngOnInit(): void {
    this.localStorageService.loadInitialState();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
   
      }
    });


  }




}
