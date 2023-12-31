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
login : boolean = false;
phone : boolean = false;
constructor(
              private store : Store <AppState>,
              private cookieService : CookieService,
              private errorService : ErrorService,
              private router : Router,
              private authService : AuthService
  ) { 

    
  if(getDataSS("logged") === true || getDataLS("logged") == true){
    this.cookieService.get('token');
    this.login = true;
  }
  (screen.width <= 600) ? this.phone = true : this.phone = false;

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

  this.errorService.logout().subscribe(
     (res)=>{if(res)this.login = false;});
  }

ngOnDestroy(): void {

}



}