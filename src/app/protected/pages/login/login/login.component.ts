import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { saveDataLS, saveDataSS } from 'src/app/protected/Storage';


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

    constructor( 
                 private fb: FormBuilder,
                 private authservice : AuthService,
                 private router: Router,
                 private store: Store<AppState>,
                 private location : Location,
                 private dialog : MatDialog,
                //  private errorService : ErrorService,
                )
  {  }
    


ngOnInit() {


    // this.userSubscription= this.store.select('user')
    // .pipe(
    //   // filter(({user}) => user != null),
    // ).subscribe( 
    //      () =>{
  
    //       console.log('1');
    //         this.authservice.login().subscribe(
    //           (res:any)=>{
    //                 console.log(res);

    //               if(res){
    //                       this.store.dispatch(authActions.LaunchUser())
    //                       this.goBack();
    //                       saveDataSS('logged', true);
    //                       if(this.myForm.get('toLStorage')?.value === true){
    //                         saveDataLS('logged', true);
    //                       }
    //                      }
    //                 }
    //          );     
    //           }
    // )
  
        this.myForm = this.fb.group({
          user:     [ 'administrador', [Validators.required] ],
          password:  [ 'admin1234', [Validators.required]], 
          toLStorage:  [ true ], 
        });
  
      }

      onSaveForm(){

        if ( this.myForm.invalid ) {
          this.myForm.markAllAsTouched();
          return;
        }

        const username = this.myForm.get('user')?.value;
        const password = this.myForm.get('password')?.value;
        console.log(username, password);
        this.authservice.login(username, password).subscribe(
          (res:any)=>{
                console.log(res);

              if(res){
                      this.goBack();
                      saveDataSS('logged', true);
                      
                      if(this.myForm.get('toLStorage')?.value === true){
                        saveDataLS('logged', true);
                      }

                      this.router.navigateByUrl('/home')
                     }
                }
         );   

    }  

goBack() {


}
  
validField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}

// get userErrorMsg(): string {

//     const errors = this.myForm.get('user')?.errors;
//     if ( errors?.['required'] ) {
//       return 'El user es obligatorio';
//     } else if ( errors?.['pattern'] ) {
//       return 'El valor ingresado no tiene formato de correo';
//     } else if ( errors?.['noExistuser'] ) {
//       return 'No existe user en nuestra base de datos';
//     }
//     return ''
// }

// get passwordErrorMsg(): string {

//   const errors = this.myForm.get('password')?.errors;
//   if ( errors?.['required'] ) {
//     return 'Completa este campo';
//   } 
//   return ''
// }

togglePasswordVisibility(value : string) : void {
  (value == "password") ? this.passwordVisible = !this.passwordVisible : '';
}

// openDialogPassword(){


//     this.dialog.open(PasswordRecoveryComponent, {
//       panelClass:"custom-modalbox-NoMoreComponent", 
//     });

// }

ngOnDestroy(): void {
  
  if(this.userSubscription){ 
    this.userSubscription.unsubscribe();
  }
}
  
}