import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { PickClientMessageComponent } from 'src/app/protected/messages/pick-client-message/pick-client-message/pick-client-message.component';
import { User } from 'src/app/protected/models/user.models';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {



  user : User []=[];
  myForm!: FormGroup;
  date: Date = new Date();
  onlyDate: string = this.date.toLocaleDateString(); // Muestra solo la fecha
  authSuscription! : Subscription;
  client : string = '';




  constructor(
              private articleService :ArticlesService,
              private fb: FormBuilder,
              private dialog : MatDialog,
              private store : Store <AppState>,
  ) {
    

  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      date:     [ this.onlyDate, [Validators.required] ],
      client:  [ this.client, [Validators.required]], 
      toLStorage:  [ true ], 
    });
    

    this.authSuscription = this.store.select("auth")
    .pipe(
      filter( ({tempClient})=>  tempClient != null && tempClient != undefined)
      ).subscribe(
      ({tempClient})=>{
          this.client = tempClient;
          const fullName = `${tempClient.nombre} ${tempClient.apellido}`
          this.myForm.controls['client']?.setValue(fullName);
          console.log(this.client);
      })
      
 
  }

  getClient(){
    this.dialog.open(PickClientMessageComponent, {
      // data: {msg: error},
      // disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  }
 
 

      
validField( field: string ) {
  return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}
    

}
