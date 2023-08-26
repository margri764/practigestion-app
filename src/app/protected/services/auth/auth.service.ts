import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { environment } from 'src/environments/environment';
import * as authActions from 'src/app/auth.actions'
import * as articleActions from 'src/app/article.actions'
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user.models';
import { ErrorService } from '../error/error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token : string = '';
  // user : User | undefined;
  private baseUrl = environment.baseUrl;

  constructor(  
                private http : HttpClient,
                private store : Store <AppState>,
                private cookieService: CookieService,
                private errorService : ErrorService,
                private router : Router
                // private dialog : MatDialog
              )
{ }


login(username: string, password : string){

const base64Credentials = btoa(`${username}:${password}`);

  const headers = {
    Authorization: `Basic ${base64Credentials}`
  };

  return this.http.get<any>(`${this.baseUrl}api/login`, {headers}) 
  
  .pipe(
    tap( token =>{
                    if(token){
                        this.token = token.token;
                        const user = { username, password} 
                        this.store.dispatch(authActions.setUser({user}));
                        this.cookieService.set('token', token.token);
                        // saveDataLS("token", this.token)
                    }           
                  console.log("desde login Service: ",token);
              }  
    ),            
    map( res => res )
  )
}



getToken(){
  return this.token
}

getCookieToken() {
  return this.cookieService.get('token');
}


getAllClients( ){
  return this.http.get<any>(`${this.baseUrl}api/agenda`)
.pipe(
  map( res =>{ 
        console.log('desde service getAllClients', res)
          return res} )
  );
}

updateClientById( body : User, id:any){
                                        
  return this.http.put<any>(`${this.baseUrl}api/agenda/edit/${id}`, body)
.pipe(
  map( res =>{ 
        console.log('desde service updateClientById', res)
          return res} )
  );
}

deleteClientById( id:any){
                   id = "2737";                   
  return this.http.delete<any>(`${this.baseUrl}api/delete/${id}`)
.pipe(
  map( res =>{ 
        console.log('desde service deleteClientById', res)
          return res} )
  );
}

addNewClient( body : User){

  //no cuales son obligatorias
  const bodys = {
    "archivarComo": "Ruloso Zarpaso",
    "nombre": "Rulo",
    "apellido": "Zarpaso",
    "domicilio": "pehues 22",
    "localidad": "carilo",
    "codigoPostal": "8407",
    "provincia": "buenos aires",
    "pais": "argentina",
    "telefonoCodigoPais": "54",
    "telefonoCodigoArea": "294",
    "esMovil": 1,
    "numeroLocal": "4569787",
    "email1": "mailejemplo@gmail.com",
    "organizacion": "arcor",
    "razonSocial": "arcor sa",
    "cuit": "20206665085",
    "esCliente": 1,
    "esProveedor": 0
  }
  console.log(body);
return this.http.post<any>(`${this.baseUrl}api/agenda`, bodys)
.pipe(
  map( res =>{ 
         console.log('desde service addNewClient', res)
  return res} )
  );
}

searchClientByName( query :  string ){
  return this.http.get<any>(`${this.baseUrl}api/agenda/busqueda/${query}`)
.pipe(
  map( res =>{ 
        console.log('desde service searchClientByName', res)
          return res} )
  );
}

getClientById( id : any ){
  return this.http.get<any>(`${this.baseUrl}api/agenda/${id}`)
.pipe(
  map( res =>{ 
        console.log('desde service getClientById', res)
          return res} )
  );
}

}