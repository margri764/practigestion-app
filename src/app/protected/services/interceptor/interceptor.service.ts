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


let authToken;


  if(this.authService.getToken()) {
   authToken = this.authService.getToken();
 }else{
  authToken = this.authService.getCookieToken()
 }

 console.log(authToken);

  const authRequest = !authToken ? req : req.clone({
    setHeaders: { Authorization: `Bearer ${authToken}` }
    
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

