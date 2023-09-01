import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  initialStateAfterEditOrder$ : EventEmitter<boolean> = new EventEmitter<boolean>; 


  token : string = '';
  // user : User | undefined;
  private baseUrl = environment.baseUrl;

  constructor(  private http : HttpClient,
                // private store : Store <AppState>,
                // private dialog : MatDialog
              )
{ }

getAllArticles(){

    return this.http.get<any>(`${this.baseUrl}api/articulos`) 
    .pipe(
      map( res => res )
    )
}


getArticleById(id : string){
  return this.http.get<any>(`${this.baseUrl}api/articulos/${id}`) 
    
  .pipe(
    tap( res =>{
                    // if(token){
                    //     this.token = token
                    // }           
                  // console.log("desde login Service: ",res);
              }  
    ),            
    map( res => res )
  )
}

searchArticleByDescription( value : string){
  const campo = "desc_larga"
  return this.http.get<any>(`${this.baseUrl}api/articulos/busqueda?f=${campo}&q=${value}`)
  .pipe(
    map( res =>{ 
          console.log('desde service searchArticleByDescription', res)
            return res} )
    );
}

searchProductById( id : any){
  return this.http.get<any>(`${this.baseUrl}api/articulos/${id}`)
  .pipe(
    map( res =>{ 
          console.log('desde service searchProductById', res)
            return res} )
    );
}

editProductById( body: any, codigo_interno : string){
  return this.http.get<any>(`${this.baseUrl}api/articulos/${codigo_interno}`, body)
.pipe(
  map( res =>{ 
        console.log('desde service searchProductById', res)
          return res} )
  );
}

getAllTruePriceList( ){
  return this.http.get<any>(`${this.baseUrl}api/precios`)
  .pipe(
    map( res =>{ 
          console.log('desde service getAllTruePriceList', res)
            return res} )
    );
}

getPriceListById( id:any, from : any, to : any ){
  return this.http.get<any>(`${this.baseUrl}api/precios/${id}?p=${from}&r=${to}`)
.pipe(
  map( res =>{ 
        console.log('desde service getPriceListById', res)
          return res} )
  );
}




}