import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { LocalStorageService } from 'src/app/protected/services/localStorage/local-storage.service';
import { OrderService } from 'src/app/protected/services/order/order.service';
import * as articleAction from 'src/app/article.actions'
import { ErrorService } from 'src/app/protected/services/error/error.service';
import { MatDialog } from '@angular/material/dialog';
import { AskTempOrderComponent } from 'src/app/protected/messages/ask-temp-order/ask-temp-order/ask-temp-order.component';

@Component({
  selector: 'app-temp-order',
  templateUrl: './temp-order.component.html',
  styleUrls: ['./temp-order.component.scss']
})
export class TempOrderComponent implements OnInit {

  authSuscription! : Subscription;
  articleSuscription! : Subscription;
  tempOrder : any []=[];
  confirmed : boolean = false;

  constructor(
                private dialog : MatDialog,
                private store : Store <AppState>,
                private localStorageService: LocalStorageService,
                private errorService: ErrorService,
  ) { }

  ngOnInit(): void {

    this.errorService.close$.subscribe( ()=>{})
    this.articleSuscription = this.store.select('article')
    .pipe(

    ).subscribe(({tempOrder})=>{
      this.tempOrder = tempOrder;
    })
  }

  deleteItem(id:any){

    this.dialog.open(AskTempOrderComponent, {
      panelClass:"custom-modalbox-messsage",
    });

    this.errorService.authDelTempOrder$.pipe(
      take(1)
    ).subscribe( (auth)=> { // el ask-edit dispara ui boolean si se elige CONTINUAR con la acción
      
      if(auth){
        this.store.dispatch(articleAction.deleteTempOrder({tempOrderId: id}));
        setTimeout(()=>{
          this.localStorageService.saveStateToLocalStorage( this.tempOrder, "tempOrder");
          console.log(this.tempOrder);
        },500);
      }
    })
  }

}
