import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { StatusOrderComponent } from '../../status-order/status-order/status-order.component';
import * as orderActions from 'src/app/order.actions';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { finished } from 'stream';

@Component({
  selector: 'app-order-managment',
  templateUrl: './order-managment.component.html',
  styleUrls: ['./order-managment.component.scss']
})
export class OrderManagmentComponent implements OnInit, OnDestroy {


  orderSubscription! : Subscription;
  closeSubscription! : Subscription;
  userSubscription! : Subscription;
  total : number = 0;
  height:string ='300';
  orders : any [] = [];
  toggle : string = '';
  orderBy: string = '';
  isLoading = false;
  labelOder24hs : boolean = true;

  // order by
  date = false;
  noProcess = false;
  inProcess = false;
  ready = false;
  delivery = false;
  local = false;
  complete = false;
  delete = false;
  showNoOrdersMessage: boolean = false;

  // search
  itemSearch : string = '';
  mostrarSugerencias: boolean = false;
  sugested : string= "";
  suggested : any[] = [];
  spinner : boolean = false;
  alert:boolean = false;
  fade : boolean = false;
  search : boolean = true;
  product  : any[] = [];

  // accordion
  panelOpenState = false;

  constructor(
              private store: Store<AppState>,
              private _bottomSheet : MatBottomSheet,
              private orderService : OrdersService
             ) 
 { }
  

ngOnInit(): void {

  this.changeHeightModal();


  this.orderService.showNoOrdersMessage$.subscribe(value => {
    setTimeout(() => {
      this.showNoOrdersMessage = value;
    });

    setTimeout(() => {
      this.showNoOrdersMessage = false;
    },1000);
  });

  // cuando inicia el componente mando a llamar a las ordenes q todavia no estan procesadas, cada vez q pasa un imtervalo de tiempo de 15 o 30 min se vuelve a disparar para ir sabiendo cuando ordenes van quedando
 
  this.orderSubscription = this.store.select('order')
  .pipe(
    filter(({staffOrders}) => staffOrders != null)
  )
  .subscribe(
     ({ staffOrders })=>{
       if(staffOrders != null){
        this.isLoading = true; 
        this.orders = staffOrders;
        }
      })
}

// start order by
changeOrder( value: string ) {
  this.orderBy = value;
}
// la orden q se elimina deberia poner en true el finished
// deberia hacer un reload cada 5min de las ordenes en las notificaciones y hacer una alerta cada vez q entra una

styleObject(text : string) {
 
    
    switch (text) {
      case "SIN PROCESAR":
                      return {'color':'red'};
      case "EN PROCESO":
                      return {'color':'orange'};
      case "ORDEN LISTA":
                      return {'color':'yellowgreen'};
      case "ENTREGA DELIVERY":
                      return {'color':'brown'};
      case "ENTREGA EN LOCAL":
                      return {'color':'blue'};   
      case "COMPLETADO":
                       return {'color':'green'};                   
      case "ELIMINADO":
                       return {'color':'black'}; 
      default:    return {};
      }
    
}
  
toggleStatus(order : any){
    
    this.toggle = order;
}
  
menuClicked(menu : string){

    switch (menu){

       case "POR FECHA" :
                          this.date = true;
                          this.noProcess = false;
                          this.inProcess = false;
                          this.ready = false;
                          this.delivery = false;
                          this.local = false;
                          this.complete = false;
                          this.delete = false;
       break;

      case "SIN PROCESAR" :
                          this.noProcess = true;
                          this.date = false;
                          this.inProcess = false;
                          this.ready = false;
                          this.delivery = false;
                          this.local = false;
                          this.complete = false;
                          this.delete = false;
      break;
      
      case "EN PROCESO" :
                          this.inProcess = true;
                          this.date = false;
                          
                          this.noProcess = false;
                          this.ready = false;
                          this.delivery = false;
                          this.local = false;
                          this.complete = false;
                          this.delete = false;
      break;
  
      case "ORDEN LISTA" :
                          this.ready = true;
                          this.date = false;
                          this.inProcess = false;
                          this.delivery = false;
                          this.local = false;
                          this.complete = false;
                          this.delete = false;
                          this.noProcess = false;
      break;

      case "ENTREGA DELIVERY" :
                          this.delivery = true;
                          this.date = false;
                          this.inProcess = false;
                          this.ready = false;
                          this.local = false;
                          this.complete = false;
                          this.delete = false;
                          this.noProcess = false;
      break;

      case "ENTREGA EN LOCAL" :
                          this.local = true;
                          this.date = false;
                          this.inProcess = false;
                          this.ready = false;
                          this.delivery = false;
                          this.complete = false;
                          this.delete = false;
                          this.noProcess = false;
      break;

      case "COMPLETADO" :
                          this.complete = true;
                          this.date = false;
                          this.ready = false;
                          this.delivery = false;
                          this.local = false;
                          this.inProcess = false;
                          this.delete = false;
                          this.noProcess = false;
      break;

      case "ELIMINADO" :
                          this.delete = true;
                          this.date = false;
                          this.inProcess = false;
                          this.ready = false;
                          this.delivery = false;
                          this.local = false;
                          this.complete = false;
                          this.noProcess = false;
      break;

    }



}

ngOnDestroy(): void {

    if(this.userSubscription != undefined){
      this.userSubscription.unsubscribe();
    }

    if(this.orderSubscription != undefined){
      this.orderSubscription.unsubscribe();
    }
    
}

changeHeightModal(){
  const size= screen.width;
  this.height= size.toString();  //altura igual al ancho
}

statusManagment(order : any, event : MouseEvent ) {

  const target = event.target as HTMLElement; // obtenemos el elemento HTML que disparó el evento
  target.classList.add('statusSelected'); 

  this.store.dispatch(orderActions.setStaffOrderStatus( {order}));
  setTimeout(()=>{
    this._bottomSheet.open( StatusOrderComponent);
  },500)
}

closeLabelOrders(){
  this.labelOder24hs = false;
}

  
}


