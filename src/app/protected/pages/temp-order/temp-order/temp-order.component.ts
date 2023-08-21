import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { LocalStorageService } from 'src/app/protected/services/localStorage/local-storage.service';
import { OrderService } from 'src/app/protected/services/order/order.service';
import * as articleAction from 'src/app/article.actions'

@Component({
  selector: 'app-temp-order',
  templateUrl: './temp-order.component.html',
  styleUrls: ['./temp-order.component.scss']
})
export class TempOrderComponent implements OnInit {

  authSuscription! : Subscription;
  articleSuscription! : Subscription;
  tempOrder : any []=[];

  constructor(
                // private dialog : MatDialog,
                private store : Store <AppState>,
                private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {

    this.articleSuscription = this.store.select('article')
    .pipe(

    ).subscribe(({tempOrder})=>{
      this.tempOrder = tempOrder;
    })
  }

  deleteItem(id:any){

    this.store.dispatch(articleAction.deleteTempOrder({tempOrderId: id}));
    setTimeout(()=>{
      this.localStorageService.saveStateToLocalStorage( this.tempOrder, "tempOrder");
      console.log(this.tempOrder);
    },500)
  }

}
