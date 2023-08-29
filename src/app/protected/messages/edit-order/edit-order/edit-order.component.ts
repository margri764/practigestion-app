import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { ErrorService } from 'src/app/protected/services/error/error.service';

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

    this.articleService.editOrderBySalePointAndNumOrder(editedData, ptoVenta, cbteNro).subscribe(
      ()=>{
            this.isLoading = false;
            alert("Pedido actualizado con exito");
            this.articleService.initialStateAfterEditOrder$.emit(true);
            this.closeComponent(); 
      
      })

  }

  closeComponent(){
    this.dialogRef.close();
  }

}
