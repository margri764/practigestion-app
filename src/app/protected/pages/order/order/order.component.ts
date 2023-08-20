import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Order, DetalleItem } from 'src/app/protected/interfaces/order.interface';
import { PickClientMessageComponent } from 'src/app/protected/messages/pick-client-message/pick-client-message/pick-client-message.component';
import { User } from 'src/app/protected/models/user.models';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { OrderService } from 'src/app/protected/services/order/order.service';

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
  client : any;




  constructor(
              private articleService :ArticlesService,
              private fb: FormBuilder,
              private dialog : MatDialog,
              private store : Store <AppState>,
              private orderService : OrderService
  ) {
    

  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      date:     [ this.onlyDate, [Validators.required] ],
      client:  [ this.client, [Validators.required]], 
      discount:  [ ''], 
      comercialName:  [ this.client], 
    });
    

    this.authSuscription = this.store.select("auth")
    .pipe(
      filter( ({tempClient})=>  tempClient != null && tempClient != undefined)
      ).subscribe(
      ({tempClient})=>{
          this.client = tempClient;
          const fullName = `${tempClient.nombre} ${tempClient.apellido}`
          const comercialName = `${tempClient.razonSocial}`
          this.myForm.controls['client']?.setValue(fullName);
          this.myForm.controls['comercialName']?.setValue(comercialName);
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
 
  createOrder(){

    const detalleItem1: DetalleItem = {
      codigoInterno: "ww",
      cantidad: 1,
      bonificacionPorciento: 0
  };
    const body : Order ={
        idAgenda : this.client.id,
        estado :  this.client.estado,
        ptoVenta: this.client.ptoVenta,
        descuentoPorcentaje: this.myForm.get('discount')?.value,
        detalleItems : [detalleItem1]

    }
    console.log(body);

    // this.orderService.createOrder(body).subscribe((res)=>{console.log(res);})
  }
 

      
validField( field: string ) {
  return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}
    

}
