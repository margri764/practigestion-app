import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { getDataLS } from '../../Storage';
import { ErrorService } from '../error/error.service';


@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor{

private baseUrl = environment.baseUrl;
user : boolean = false;
token : any;

  constructor(
              private authService : AuthService,
              private errorService : ErrorService
              // private dialog : MatDialog
            )
{ }




intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


let token;


if(req.url.includes("api/login")){
  console.log('se trata del login');
  return next.handle( req )
  .pipe(
    catchError((error : HttpErrorResponse ) => this.errorHandle(error) )
  );

}

  if(this.authService.getToken()) {
   token = this.authService.getToken();
 }else{
   token = this.authService.getCookieToken()
 }

 console.log(token);

  const authRequest = !token ? req : req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
    
  });
  return next.handle( authRequest )
  .pipe(
    catchError((error : HttpErrorResponse ) => this.errorHandle(error) )
  );
}
  
errorHandle( error: HttpErrorResponse ) {

  console.log(error);
  
  

  const errorMessage = this.errorService.getError(error)

  return throwError( () => errorMessage)
  // return throwError( () => error)
}

}

