import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { getDataLS, getDataSS, saveDataLS, saveDataSS } from 'src/app/protected/Storage';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from 'src/app/protected/services/order/order.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  myForm!: FormGroup;
  bannerStatus: boolean = false;
  uiSubscription!: Subscription;
  userSubscription! : Subscription;
  disabled = true;
  lstorageSelected: string = "true";
  path : string = ''
  user : any ;
  isuserValidated : boolean = false;
  passwordError: string = '';
  passwordVisible = false;
  snapshot : boolean = false;
  isLoading : boolean = false;
  confirm : boolean = false;

    constructor( 
                 private fb: FormBuilder,
                 private authservice : AuthService,
                 private router: Router,
                 private store: Store<AppState>,
                 private location : Location,
                 private dialog : MatDialog,
                 private cookieService : CookieService,
                 private orderService : OrderService
                //  private errorService : ErrorService,
                )
  {
    if( getDataLS("logged") && this.cookieService.get('token')){
      this.orderService.getOpenOrders().subscribe();
      // this.cookieService.get('token');
      // this.login = true;
      this.router.navigateByUrl('/home')
    }
    }
    


ngOnInit() {

        this.myForm = this.fb.group({
          user:     [ 'marcelo', [Validators.required] ],
          password:  [ '123', [Validators.required]], 
          toLStorage:  [ true ], 
        });
  
      }

      // user:     [ 'julian', [Validators.required] ],
      // password:  [ 'qwe', [Validators.required]], 

      // user:     [ 'administrador', [Validators.required] ],
      // password:  [ 'admin1234', [Validators.required]], 
      onSaveForm(){

        if ( this.myForm.invalid ) {
          this.myForm.markAllAsTouched();
          return;
        }
        this.isLoading = true;
        this.confirm = true;
        const username = this.myForm.get('user')?.value;
        const password = this.myForm.get('password')?.value;
        console.log(username, password);
        this.authservice.login(username, password).subscribe(
          (res:any)=>{
                console.log(res);

              if(res){
                      
                      if(this.myForm.get('toLStorage')?.value === true){
                        saveDataLS('logged', true);
                      }
                      // si el login es exitoso trae los datos del usuario
                      this.getUser();
                      this.router.navigateByUrl('/home')
                    
                     }
                }
         );   

    }  


validField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}

getUser(){
  this.authservice.getUser().subscribe( 
    (res)=>{
      if(res){
            this.getAuthorization();
      }
    });

                      
}

getAuthorization(){
    this.authservice.getAuthorization().subscribe();
}



togglePasswordVisibility(value : string) : void {
  (value == "password") ? this.passwordVisible = !this.passwordVisible : '';
}


ngOnDestroy(): void {
  
  if(this.userSubscription){ 
    this.userSubscription.unsubscribe();
  }
}
  
}