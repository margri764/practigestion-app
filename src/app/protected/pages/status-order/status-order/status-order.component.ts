import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import {  Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as orderActions from 'src/app/order.actions'
import { AskOrderComponent } from 'src/app/protected/messages/ask-order/ask-order/ask-order.component';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-status-order',
  templateUrl: './status-order.component.html',
  styleUrls: ['./status-order.component.scss']
})
export class StatusOrderComponent implements OnInit, OnDestroy {


  orderSubscription! : Subscription;
  order : any;
  isClicked : boolean = false;

  constructor(
              private store : Store<AppState>,
              private _bottomSheet : MatBottomSheet,
              private dialog: MatDialog,
              private orderService : OrdersService
  ) { }


ngOnDestroy(): void {
   
    if(this.orderSubscription != undefined){
      this.orderSubscription.unsubscribe();
    }
    this.store.dispatch(orderActions.unSetStaffOrderStatus());
}



ngOnInit(): void {

  this.orderService.cancelOrNextDialog.subscribe
 
  
  this.orderSubscription = this.store.select('order').subscribe(
    ({orderStatus})=>{

          if(orderStatus != null){
            this.order = orderStatus;

          }
          
    }
    )
  }
  
  onSelect(status : string, event: MouseEvent){
  
    const target = event.target as HTMLElement; // obtenemos el elemento HTML que disparó el evento
    target.classList.add('isSelected'); 
    const id : string = this.order._id
    
    const tempOrder = {
                        id, 
                        status 
                      }
    if(status === "ELIMINADO"){
      this.openDialogDeleteOrder();
   
      this.orderService.cancelOrNextDialog.pipe(
        take(1)
      ).subscribe( (res)=> { // el ask-edit dispara ui boolean si se elige CONTINUAR con la acción
      if(res ){
              this.store.dispatch(orderActions.launchSetStaffOrderStatus( tempOrder ))
              setTimeout(()=>{ this._bottomSheet.dismiss() },800)
      }})
    }else{
      this.store.dispatch(orderActions.launchSetStaffOrderStatus( tempOrder ))
      setTimeout(()=>{ this._bottomSheet.dismiss() },800)
    } 
 }

  openDialogDeleteOrder(){
    this.dialog.open(AskOrderComponent,{
      disableClose: true,
      panelClass: "custom-modalbox-message",
    })
  }
}
