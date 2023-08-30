import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../../interfaces/order.interface';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../localStorage/local-storage.service';
import * as articleActions from 'src/app/article.actions';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  changeClientValue : EventEmitter<boolean> = new EventEmitter<boolean>; // se dispara desde el back de buscar-articulos para q volver a "Productos"

  private baseUrl = environment.baseUrl;

  constructor(  private http : HttpClient,
                private store : Store <AppState>,
                 private localStorageService: LocalStorageService,

                // private cookieService: CookieService
                // private dialog : MatDialog
              )
{ }

createOrder(order : Order){
    return this.http.post<any>(`${this.baseUrl}api/pedidos`, order)
  .pipe(
    map( res =>{ 
          console.log('desde service createOrder', res)
            return res} )
    );
  
}



updateOrderState( salePoint : any, nroOrder : any, state : string){
  const emptyBody = {}
  return this.http.put<any>(`${this.baseUrl}api/pedidos/estado/${salePoint}/${nroOrder}?e=${state}`, emptyBody)
.pipe(
  map( res =>{ 
        console.log('desde service updateOrderState', res)
          return res} )
  );

}

getSalePoint(){

  return this.http.get<any>(`${this.baseUrl}api/pedidos/pos`,)
  .pipe(
    map( res =>{ 
          console.log('desde service getSalePoint', res)
            return res} )
    );
}

getOpenOrders(){
  return this.http.get<any>(`${this.baseUrl}api/pedidos/abiertos`,)
  .pipe(
    tap( ({pedidos})=>{
              this.store.dispatch(articleActions.setTempOrder({tempOrder : pedidos}));
              this.localStorageService.saveStateToSessionStorage(pedidos, 'openOrders')
    }),
    map( res =>{ 
          console.log('desde service getOrdersOpen', res)
            return res} )
    );
}

getAllOrders( ){
  return this.http.get<any>(`${this.baseUrl}api/pedidos`)
.pipe(
  map( res =>{ 
        console.log('desde service getAllOrders', res);
          return res} )
  );
}

getOrdersByPtoVenta( id :  any ){
  return this.http.get<any>(`${this.baseUrl}api/pedidos/${id}`)
.pipe(
  map( res =>{ 
        console.log('desde service getOrdersByPtoVenta', res)
          return res} )
  );
}


getSalePointByNumOrder( salePoint :  any, nroOrder : any ){
  return this.http.get<any>(`${this.baseUrl}api/pedidos/${salePoint}/${nroOrder}`)
.pipe(
  map( res =>{ 
        console.log('desde service getSalePointByNumOrder', res)
          return res} )
  );
}

editOrderBySalePointAndNumOrder( body:any, salePoint : any, nroOrder : any){
console.log(body);
  return this.http.put<any>(`${this.baseUrl}api/pedidos/${salePoint}/${nroOrder}`, body)
.pipe(
  map( res =>{ 
              
        console.log('desde service editOrderBySalePointAndNumOrder', res)
          return res} )
  );
}


getOrdersPaginator(from : any, to : any ){

  return this.http.get<any>(`${this.baseUrl}api/pedidos?p=${from}&r=${to}`)
.pipe(
  map( res =>{ 
        console.log('desde service getOrdersPaginator', res)
          return res} )
  );
}

}
