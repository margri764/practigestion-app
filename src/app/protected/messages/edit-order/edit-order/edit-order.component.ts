import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { ErrorService } from 'src/app/protected/services/error/error.service';
import { OrderService } from 'src/app/protected/services/order/order.service';
import { GenericMessageComponent } from '../../generic-message/generic-message/generic-message.component';
import { GenericSuccessComponent } from '../../generic-success/generic-success/generic-success.component';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  myForm! : FormGroup;
  save : boolean = false;
  order! : any;
  orderForm!: FormGroup;
  isLoading : boolean = false;
  
  constructor(
                private fb : FormBuilder,
                private store : Store <AppState>,
                private authService : AuthService,
                private orderService : OrderService,
                private articleService : ArticlesService,
                private dialog : MatDialog,
                private dialogRef: MatDialogRef<EditOrderComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private errorService : ErrorService
  ) { 

  }

    ngOnInit(): void {

      this.errorService.closeIsLoading$.subscribe((emitted)=>{if(emitted){this.isLoading = false;}})

      console.log(this.data);
      this.orderForm = this.fb.group({
        idAgenda: new FormControl(''),
        estado: new FormControl(''),
        descuentoPorcentaje: new FormControl(''),
        detalleItems: this.fb.array([]) // Necesitarás tratar esto como un FormArray
      });
  
      this.populateForm(this.data); // Llenar el formulario con los datos existentes
    }
  
    populateForm(data: any) {

      this.orderForm.patchValue({
        idAgenda: data.idAgenda,
        estado: data.estado,
        descuentoPorcentaje: data.descuentoPorcentaje,
      });
  
      const detalleItemsArray = this.orderForm.get('detalleItems') as FormArray;
  
      data.detalleItems.forEach((detalleItem: any) => {
        detalleItemsArray.push(this.fb.group({
          codigoInterno: detalleItem.codigoInterno,
          cantidad: detalleItem.cantidad,
          bonificacionPorciento: detalleItem.bonificacionPorciento
        }));
      });
    }

    getDetalleItemsControls() {
      return (this.orderForm.get('detalleItems') as FormArray).controls;
    }

  onSaveForm(){
    // console.log(this.myForm.value);
    this.isLoading = true;
    const editedData = this.orderForm.value;
    // console.log(editedData);

    const cbteNro = this.data.cbteNro;
    const ptoVenta = this.data.ptoVenta;

    // console.log(cbteNro);

    this.orderService.editOrderBySalePointAndNumOrder(editedData, ptoVenta, cbteNro).subscribe(
      ()=>{
            this.isLoading = false;
            this.articleService.initialStateAfterEditOrder$.emit(true);
            this.orderService.getOpenOrders().subscribe(
              (res)=>{ 
                if(res){ 
                        this.openGenericSuccess("Pedido actualizado con exito")
                      }})

            this.close(); 
      
      })

  }

  close(){
    this.dialogRef.close();
    this.errorService.closeIsLoading$.emit(true);
  }

  
  openGenericSuccess(msg : string){

    let width : string = '';
    let height : string = '';

    if(screen.width >= 800) {
      width = "400px"
      height ="450px";
    }

    this.dialog.open(GenericSuccessComponent, {
      data: msg,
      width: `${width}`|| "",
      height:`${height}`|| "",
      disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  
  }



}
