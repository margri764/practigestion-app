import { Component, HostListener, OnInit, Output } from '@angular/core';
import { AuthService } from './protected/services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from './app.reducer';
import { OrderService } from './protected/services/order/order.service';
import { Store } from '@ngrx/store';
import * as articleActions from './article.actions';
import { LocalStorageService } from './protected/services/localStorage/local-storage.service';
import { getDataLS, getDataSS, saveDataLS } from './protected/Storage';
import { CookieService } from 'ngx-cookie-service';
import { filter, tap } from 'rxjs';
import { User } from './protected/models/user.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'practigestion-app';
  @Output () currentUrl : any = '';
  @Output () login : boolean = false;
   isLoading : boolean = false;
   user : any;

  @HostListener('window:beforeunload')
  doSomething() {
    const userToLS = this.authService.user;
    if(userToLS !== undefined && userToLS !== null){
      this.localStorageService.saveStateToLocalStorage(userToLS, 'user');
      this.isLoading = true;
    }
    else{
      this.localStorageService.saveStateToLocalStorage(this.user, 'user');
      this.isLoading = true;

    }


  }
  
  

  constructor(
              private localStorageService: LocalStorageService,
              public router : Router,
              private store : Store <AppState>,
              private orderService : OrderService,
              private cookieService : CookieService,
              private authService : AuthService

  ){

    const token = this.cookieService.get('token');
    // const openOrders = getDataSS('openOrders');


  //   if (  openOrders === undefined ) {
  //     this.login = true;
  //     this.orderService.getOpenOrders().subscribe();
  // }

  }

  ngOnInit(): void {

    setTimeout(()=>{this.localStorageService.loadInitialState()})
  
    this.store.select('auth')
    .pipe(
      // tap(()=>this.isLoading = true),
      filter( ({user})=>  user != null && user != undefined),
    ).subscribe(
      ({user})=>{
        this.user = user;
        this.isLoading = false;
      })
  

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
   
      }
    });


  }




}
