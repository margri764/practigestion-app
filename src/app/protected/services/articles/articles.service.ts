import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {


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

searchProducts( value : string){
  return this.http.get<any>(`${this.baseUrl}api/agenda/busqueda/${value}`)
.pipe(
  map( res =>{ 
        console.log('desde service searchProducts', res)
          return res} )
  );
}

searchProductById( codigo_interno : string){
  return this.http.get<any>(`${this.baseUrl}api/articulos/busqueda?f=codigo_interno&q=${codigo_interno}`)
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
getPriceListById( id:any ){
  return this.http.get<any>(`${this.baseUrl}api/precios/${id}`)
.pipe(
  map( res =>{ 
        console.log('desde service getPriceListById', res)
          return res} )
  );
}


}