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

  }


ngOnInit() {

        this.myForm = this.fb.group({
          // user:     [ 'marcelo', [Validators.required] ],
          // password:  [ '123', [Validators.required]], 
          // user:     [ 'administrador', [Validators.required] ],
          // password:  [ 'admin1234', [Validators.required]], 
          // user:     [ 'julian', [Validators.required] ],
          // password:  [ 'qwe', [Validators.required]], 
          user:     [ '', [Validators.required] ],
          password:  [ '', [Validators.required]],
          toLStorage: [ true ], 
        });
  
      }

      onSaveForm(){

        if ( this.myForm.invalid ) {
          this.myForm.markAllAsTouched();
          return;
        }
        this.isLoading = true;
        this.confirm = true;
        const username = this.myForm.get('user')?.value;
        const password = this.myForm.get('password')?.value;
        this.authservice.login(username, password).subscribe(
          (res)=>{
              if(res){
                      
                      if(this.myForm.get('toLStorage')?.value === true){
                        saveDataLS('logged', true);
                      }
                      // si el login es exitoso trae los datos del usuario
                      this.getUser();
                    
                     }
                }
         );   

    }  


validField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}

getUser(){
  this.authservice.getUser().subscribe((res)=>{if(res){this.isLoading=false;this.router.navigateByUrl('/home');}});
                      
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