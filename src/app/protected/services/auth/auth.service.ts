import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { environment } from 'src/environments/environment';
import * as authActions from 'src/app/auth.actions'
import { saveDataLS } from '../../Storage';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token : string = '';
  // user : User | undefined;
  private baseUrl = environment.baseUrl;

  constructor(  private http : HttpClient,
                private store : Store <AppState>,
                private cookieService: CookieService
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
        console.log('desde service searchProducts', res)
          return res} )
  );
}


}