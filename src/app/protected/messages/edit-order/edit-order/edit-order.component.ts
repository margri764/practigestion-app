import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  
  @ViewChild ("top" , {static: true} ) top! : ElementRef;

  myForm! : FormGroup;
  save : boolean = false;
  order! : any;
  orderForm!: FormGroup;
  isLoading : boolean = false;
  addItemSelected : boolean = false;
  
  constructor(
                private fb : FormBuilder,
                private store : Store <AppState>,
                private authService : AuthService,
                private orderService : OrderService,
                private articleService : ArticlesService,
                private dialog : MatDialog,
                private dialogRef: MatDialogRef<EditOrderComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private errorService : ErrorService,
                private router : Router,
                private cdr: ChangeDetectorRef
  ) { 

  }
element : any
    ngOnInit(): void {

      this.errorService.closeIsLoading$.subscribe((emitted)=>{if(emitted){this.isLoading = false;}})
      this.orderService.emitedItem$.subscribe((emitted)=>{
        if (emitted) {
          const detalleItemsArray = this.orderForm.get('detalleItems') as FormArray;
          
          // Agregar el nuevo elemento a la lista
          detalleItemsArray.push(this.fb.group({
            codigoInterno: emitted.codigoInterno,
            cantidad: emitted.cantidad,
            bonificacionPorciento: emitted.bonificacionPorciento
          }));
        }
          this.addItemSelected = false;

          this.element = this.top.nativeElement;
          setTimeout( () => {
          this.element.scrollIntoView(
            { alignToTop: true,
              behavior: "smooth",
              block: "center",
            });
            }, 0);

            this.cdr.detectChanges();
      
      })

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

    // this.isLoading = true;
    const editedData = this.orderForm.value;
    console.log(editedData);

    // const cbteNro = this.data.cbteNro;
    // const ptoVenta = this.data.ptoVenta;


    // this.orderService.editOrderBySalePointAndNumOrder(editedData, ptoVenta, cbteNro).subscribe(
    //   ()=>{
    //         this.isLoading = false;
    //         this.articleService.initialStateAfterEditOrder$.emit(true);
    //         this.orderService.getOpenOrders().subscribe(
    //           (res)=>{ 
    //             if(res){ 
    //                     this.openGenericSuccess("Pedido actualizado con exito")
    //                   }})

    //         this.close(); 
      
    //   })

  }

  deleteOrder(index: number) {
    const detalleItemsArray = this.orderForm.get('detalleItems') as FormArray;
    detalleItemsArray.removeAt(index);
  }
  
  close(){
    this.dialogRef.close();
    this.errorService.closeIsLoading$.emit(true);
  }

  addItem(){
      this.addItemSelected = true;
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
