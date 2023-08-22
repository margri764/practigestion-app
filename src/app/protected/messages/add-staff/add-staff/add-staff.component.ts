import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { Staff } from 'src/app/models/staff.models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';
import * as authActions from 'src/app/auth.actions';
import { SuccessStaffComponent } from '../../success-staff/success-staff/success-staff.component';


@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

  @ViewChild('price') price!: ElementRef;
  myForm! : FormGroup;
  staffSubscription! : Subscription;
  staff! : Staff;
  passwordVisible = false;
  confirmVisible = false;
  isPaused : boolean = false;
  isLoading : boolean = false;
  save : boolean = false;
  
  roles = ['STAFF_ROLE', 'ADMIN_ROLE', 'SUPER_ROLE'];

  
    constructor(
                private fb : FormBuilder,
                private store : Store <AppState>,
                private validatorService : ValidatorService,
                private dialog : MatDialog,
                private dialogRef : MatDialogRef<AddStaffComponent>,
                private authService : AuthService,
                private productService : ProductsService

              )
    { 
  
      this.myForm = this.fb.group({
        fullName:  [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(30)] ],
        email:     [ '', [Validators.required, Validators.pattern(this.validatorService.emailStaffPattern)]],
        phone:     [ '', [Validators.required, Validators.pattern(this.validatorService.phoneNumber)]],
        address:   [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(50)] ],
        password:  [ '', [Validators.required, Validators.minLength(6), Validators.maxLength(15)] ],
        confirm:   [ '', [Validators.required, Validators.minLength(6), Validators.maxLength(15)] ],
        role:      [ '', [Validators.required]],

      },{
       validators: [ this.validatorService.passwordValidator('password','confirm')],
      });           
        
    }
  
    
    ngOnInit(): void {
  
  
  
      // observable para cerrar mat dialog
      this.productService.closeMatDialog.subscribe( () => this.closeComponent())  
    
      // observable para saber cuando se hace una peticion de play/pause al back
      // this.productService.showPausedProducts.subscribe()
   
    }

    get emailErrorMsg(): string {

      const errors = this.myForm.get('email')?.errors;
      if ( errors?.['required'] ) {
        return 'Email es obligatorio';
      } else if ( errors?.['pattern'] ) {
        return 'Solo coloca un nombre, ejemplo: marcelo.griotti';
      } else if ( errors?.['existEmail'] ) {
        return 'El correo ya esta existe en nuestra base de datos';
      }
      
      return '';
    }

    get validateNumberCount() : string {
      const errors = this.myForm.get('phone')?.errors;
      if ( errors?.['required'] ) {
        return 'Teléfono es obligatorio';
      } else if ( errors?.['pattern'] ) {
        return 'Ingrese su número de teléfono móvil, sin agregar el código de área y sin guiones. Por ejemplo, si su número es 11-1234-5678, ingrese solo 112345678. Asegúrese de que su número tenga 10 dígitos y comience con el prefijo correspondiente a su provincia .'
      } 
      return '';
    }
      
  
    ngOnDestroy(): void {
  
      if( this.staffSubscription != undefined){
        this.staffSubscription.unsubscribe();
      }
      this.store.dispatch(authActions.unSetStaff())
    }
  
    validField( field: string ) {
      return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
    }
  
    succesEdit(){
      this.dialog.open(SuccessStaffComponent, {
        // disableClose: true, 
        data: {action: 'creado'},
        panelClass:"custom-modalbox-edit",
    });
    }
  

    closeComponent(){
  
      setTimeout(()=>{
  
        this.dialogRef.close();
      },500)
    }
  
    onSaveForm(){

      this.save = true;
      if ( this.myForm.invalid ) {
        this.myForm.markAllAsTouched();
        return;
      }
      this.isLoading = true
      this.authService.addStaff(this.myForm.value).subscribe(
        ({success})=>{
                      if(success){
                        this.isLoading = false;
                        this.succesEdit();
                      }
        } )
    }
    
  
  togglePasswordVisibility(value : string) : void {
    (value == "password") ? this.passwordVisible = !this.passwordVisible : '';
    (value == "confirm") ? this.confirmVisible = !this.confirmVisible : '';
  }
    
    

 
  
  }
  