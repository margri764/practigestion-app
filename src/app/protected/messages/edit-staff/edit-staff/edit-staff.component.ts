import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as authActions from 'src/app/auth.actions';
import { ProductsService } from 'src/app/services/products/products.service';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { SuccessPausePlayComponent } from '../../success-pause-play/success-pause-play/success-pause-play.component';
import { Staff } from 'src/app/models/staff.models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SuccessStaffComponent } from '../../success-staff/success-staff/success-staff.component';
import { AskStaffComponent } from '../../ask-staff/ask-staff/ask-staff.component';
import { WrongActionMessageComponent } from '../../wrong-action-message/wrong-action-message/wrong-action-message.component';


@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {

  @ViewChild('price') price!: ElementRef;
  myForm! : FormGroup;
  staffSubscription! : Subscription;
  staff! : Staff;
  isPaused = false;
  isLoading = false;
  roles = ['STAFF_ROLE', 'ADMIN_ROLE', 'SUPER_ROLE'];
  private emailControl : string = '';
  emailSplited : string = '';
  save : boolean = false;
  action : string = '';
  askAction : string = '';
  passwordVisible = false;
  confirmVisible = false;

  progressValue: number = 0;
  isSubmitting : boolean = false;
  timer : any;

  
    constructor(
                private fb : FormBuilder,
                private store : Store <AppState>,
                private productService : ProductsService,
                private authService : AuthService,
                private dialog : MatDialog,
                private dialogRef: MatDialogRef<EditStaffComponent>,
                private validatorService : ValidatorService,
                @Inject(MAT_DIALOG_DATA) public data: any,
  
  
    ) 
{ 
      this.myForm = this.fb.group({
        fullName:  [ '' ],
        email:     [ '' ],
        phone:     [    ],
        address:   [ '' ],
        role:      [ '' ],
      });           
}
  
get validatePhone() : string {
      const errors = this.myForm.get('phone')?.errors;
      if ( errors?.['required'] ) {
        return 'Teléfono es obligatorio';
      } else if ( errors?.['pattern'] ) {
        return 'Ingresar 10 digitos. Sin +54, 0 o 9';
      } 
      
      return '';
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

ngOnInit(): void {

  this.authService.closeEditStaff.subscribe(()=> this.dialogRef.close()); // se cierra si se cancela desde delete-onself

  this.productService.closeMatDialog.subscribe( () => this.closeComponent());  


      this.staff = this.data;
      this.splitEmail( this.staff.email);

      // manejo el icono de play o pause
      if(this.staff != null && this.staff != undefined){
        this.isPaused = this.staff.status;
      }
      

      this.myForm = this.fb.group({
        _id:       [ this.staff?._id ], 
        fullName:  [ this.staff?.fullName ],
        email:     [ this.emailSplited,],
        phone:     [ this.staff?.phone, [Validators.pattern(this.validatorService.phoneNumber) ] ],
        address:   [ this.staff?.address,    [Validators.minLength(5), Validators.maxLength(50)] ],
        role:      [ this.staff?.role,       [Validators.required]],
    
      });           
      
} 

  
ngOnDestroy(): void {
  
      if( this.staffSubscription != undefined){
        this.staffSubscription.unsubscribe();
      }
      this.store.dispatch(authActions.unSetStaff())
}

splitEmail( email:string ){

      if( email != '' && email != undefined && email != null){
        let splitEmail = email.split('@');
        this.emailSplited = splitEmail[0]
      }

}

getEmailValue(e : any){
  this.emailControl=  e.target.value;
}
  
validField( field: string ) {
   return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}
  
succesEditStaff(){
    this.dialog.open(SuccessStaffComponent, {
      data: {action: this.action }, 
      panelClass:"custom-modalbox-edit",
    });
}
  
succesPausePlay(){
      this.dialog.open(SuccessPausePlayComponent, {
      panelClass:"custom-modalbox-pausePlay",
    });
}

askEditAction() {
      this.dialog.open(AskStaffComponent, {
        data: {ask: this.askAction , staff: this.staff},
        panelClass:"custom-modalbox-message",
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
    this.askAction = 'editar';
    this.askEditAction();
    this.productService.cancelOrNextStaff.pipe(
      take(1)
    ).subscribe( (res)=> { if(res === "editar"){
    this.progressBar();
    this.authService.editStaff(this.myForm.value).subscribe(
      ({success})=>{
                    if(success){
                      this.isLoading = false;
                      this.action = 'editado';
                      this.progressValue = 100;
                      setTimeout(()=>{this.isSubmitting = false; this.succesEditStaff()},1000)
                      
                    }
      })
    }})
}

deleteStaff(){
    if( this.staff!._id == undefined || this.staff!._id == null ){
      return
    }

    const staffLoged = this.authService.staffLoged;

    if(this.staff.fullName === staffLoged?.fullName ){
      this.dialog.open(WrongActionMessageComponent, {
        // data: staff,
        panelClass:"custom-modalbox-edit",
    });
      return  
    }


 
    this.askAction = 'eliminar';
    this.askEditAction();

    this.productService.cancelOrNextStaff.pipe(
      take(1)
    ).subscribe( (res)=> { // el ask-staff dispara un boolean si se elige CONTINUAR con la acción
      console.log(res);
      
      if(res === "eliminar"){
    this.authService.deleteStaffById( this.staff!._id, this.staff!).subscribe(
      ({success})=>{
        if(success){
            this.action = 'eliminado'
            this.succesEditStaff();
                  }}
       )}
      })
}
  
pausePlayStaff( value : string ){
    if( this.staff!._id == undefined || this.staff!._id == null ){
      return
    }
    // dependiendo del valor manda un query con "false" o "true" y el back sabe si hay q poner stock = false o true
    
    let isPaused: boolean;
  
    switch (value) {
      case 'pause':
                    // alert(`Esta seguro de pausar a ${this.staff!.fullName}?`)
                    isPaused = false;
        break;
        
        case 'play':
                    // alert(`Esta seguro habilitar a ${this.staff!.fullName}?`)
                    isPaused = true;
       break;
     
       default: isPaused = true;
        break;
    }
     (isPaused) ? this.askAction = 'habilitar' : this.askAction = 'pausar';
    this.askEditAction();

    this.productService.cancelOrNextStaff.pipe(
      take(1)
    ).subscribe( (res)=> { // el ask-staff dispara un boolean si se elige CONTINUAR con la acción
      
      if(res === "pauseOrPlay"){

        this.authService.pausePlayStaffById( this.staff, isPaused).subscribe(
          ({success})=>{
              if(success){
                (isPaused) ? this.action = 'habilitado' : this.action = 'pausado'
                this.succesEditStaff();
                        }
            })
      }})
}

progressBar(){
  this.isSubmitting= true; 
  this.timer = setInterval(() => {
    // Incrementar el valor de progreso en cada intervalo
    if (this.progressValue < 100) {
      this.progressValue++;
    } else 
      clearInterval(this.timer);
  }, 50); // Intervalo de actualización de progreso (ajusta esto según tus necesidades)
}

    
}
  