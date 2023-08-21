import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  changeClientValue : EventEmitter<boolean> = new EventEmitter<boolean>; // se dispara desde el back de buscar-articulos para q volver a "Productos"

  private baseUrl = environment.baseUrl;

  constructor(  private http : HttpClient,
                // private store : Store <AppState>,
                // private cookieService: CookieService
                // private dialog : MatDialog
              )
{ }

createOrder(order : Order){
    return this.http.post<any>(`${this.baseUrl}api/pedidos`, order)
  .pipe(
    map( res =>{ 
          console.log('desde service searchProducts', res)
            return res} )
    );
  
}

}
