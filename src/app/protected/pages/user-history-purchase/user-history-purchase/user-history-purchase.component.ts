import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user.models';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-user-history-purchase',
  templateUrl: './user-history-purchase.component.html',
  styleUrls: ['./user-history-purchase.component.scss']
})
export class UserHistoryPurchaseComponent implements OnInit, OnDestroy {

  user!: User;
  orders: any []=[];
  isLoading : boolean = false;
  private id : string = ''; 
  userSubscription! : Subscription;
  fullName : any;

    // accordion
    panelOpenState = false;

  constructor(
                private orderService : OrdersService,
                private activatedRoute : ActivatedRoute,
                private location : Location,
                private store : Store<AppState>
             )
{ 
  this.activatedRoute.params.subscribe(
    ( {id} ) =>{ this.getRealId(id) })

}

ngOnInit(): void {

  this.userSubscription= this.store.select('user')
  .pipe(
    filter(({user}) => user != null && user != undefined),
    // delay(500)
  ).subscribe( 
       () =>{
            this.orderService.getUserHistyoryPurchaseOrders(this.id).subscribe(
            ( res )=>{
                    if(res.success){
                      this.isLoading = true;
                      this.orders = res.purchaseOrder;
                    }
            })}
)

}

getRealId(id : string){

    let newMongoId = id;

    // Obtenemos las primeras dos partes del nuevo ID
    let firstPart = newMongoId.substring(0, 2);
    let newSecondPart = newMongoId.substring(2, 25);

    // Removemos el dígito agregado en la tercera posición
    let secondPart =  newSecondPart.substring(1);
    // Unimos las partes para obtener el ID original
    this.id = firstPart + secondPart;
}

goBack(){
  this.location.back();
}

ngOnDestroy(): void {
  if(this.userSubscription != undefined){
    this.userSubscription.unsubscribe();
  }
}
  
}
