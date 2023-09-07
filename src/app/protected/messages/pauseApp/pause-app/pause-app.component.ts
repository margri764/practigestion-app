import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { delay, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SuccessHourlyComponent } from '../../success-hourly/success-hourly/success-hourly.component';

@Component({
  selector: 'app-pause-app',
  templateUrl: './pause-app.component.html',
  styleUrls: ['./pause-app.component.scss']
})
export class PauseAppComponent implements OnInit, OnDestroy {

myForm: FormGroup;
authSubscription! : Subscription;
action : string = '';
status : boolean = true;
confirm : boolean = false;
customMsg : boolean = false;
actionName : string = '';
msgAndActivate : boolean = false;
msg : string = "Momentaneamente no estamos tomando pedidos. Disculpa las molestias. Volvé pronto!!";

constructor(
              private authService : AuthService,
              private fb : FormBuilder,
              private dialogRef: MatDialogRef<PauseAppComponent>,
              private dialog : MatDialog

              ) 
{
    this.myForm = this.fb.group({
      msg: [ this.msg , [ Validators.minLength(15), Validators.maxLength(80)] ],
    })
}

ngOnDestroy(): void {
  if(this.authSubscription != undefined){
    this.authSubscription.unsubscribe();
  }
}

validField( field: string ) {
  return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}

setAction( state : boolean){
   this.status = state;
  (state) ? this.action = 'pausar' : this.action = 'activar'
}

activeApp(){

  this.confirm = true;
  console.log(this.myForm.get('msg')?.value);
  const body ={
              playOrPause: true,
              msg: this.myForm.get('msg')?.value
              }
    // me permite actualizar solo el masg
    if(this.customMsg){
      this.authService.updateCustomMsg(this.myForm.value).subscribe(
        (res)=> {
              if(res){
                 this.actionName = 'Mensaje editado'
                this.successCustomMsg(); 
              }
        })
        return
      }else{            
        this.authService.playPauseApp(body).subscribe(
          (res) => {
                    if(res.success){
                      this.actionName = 'App activada'
                      this.successCustomMsg(); 
                    }
          })
  }
}

setCustomMsg(){
  this.customMsg = !this.customMsg;
}

ngOnInit(): void {

  // se cierra desde el success-hourly
  this.authService.closePauseApp.pipe(delay(500)).subscribe(()=> this.closeComponent())

  this.authService.getAppState().subscribe(
    (res)=>{
              this.setAction(res.app.status);  

              this.myForm = this.fb.group({
                msg: [ res.app.msg, [ Validators.minLength(15), Validators.maxLength(80)] ],
              })

    }
  )
}

successCustomMsg(){

  this.dialog.open(SuccessHourlyComponent,
    {
      data : {action: this.actionName},
      panelClass:"custom-modalbox-message",
    })
}

onSelect(){

  this.confirm = true;

  if ( this.myForm.invalid  ){
    this.myForm.markAllAsTouched();
    return;
  }

  // me permite actualizar solo el masg
  if(this.customMsg){
  this.authService.updateCustomMsg(this.myForm.value).subscribe(
    (res)=> {
          if(res.success){
            this.actionName = 'Mensaje editado'
            this.successCustomMsg(); 
          }
    })
    return
  }else{

this.myForm.addControl('playOrPause', this.fb.control(false));
  this.authService.playPauseApp(this.myForm.value).subscribe(
    (res)=>{
      if(res.success){
        this.closeComponent();
        
        this.actionName ='App pausada';
        this.successCustomMsg(); 
      }
    })
  }
} 
 
closeComponent(){
  this.dialogRef.close();
}

get valueErrorMsg(): string {

  const errors = this.myForm.get('message')?.errors;
  if ( errors?.['required'] ) {
    return 'Ingrese un valor';
  } 
  return '';
}


}
