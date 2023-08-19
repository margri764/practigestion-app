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

  

}