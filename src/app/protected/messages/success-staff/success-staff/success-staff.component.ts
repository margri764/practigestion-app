import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';
import * as authActions from 'src/app/auth.actions';
import * as orderActions from 'src/app/order.actions';
import * as productActions from 'src/app/product.actions';

@Component({
  selector: 'app-success-staff',
  templateUrl: './success-staff.component.html',
  styleUrls: ['./success-staff.component.scss']
})
export class SuccessStaffComponent implements OnInit {
 
confirm : boolean = false;
actionName : string = 'editado'

   constructor(
                @Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef: MatDialogRef<SuccessStaffComponent>,
                private productService : ProductsService,
                private authService : AuthService,
           
              )
      {}

  continue(){
    this.confirm = true;
    this.productService.closeMatDialog.emit(),
    setTimeout(()=>{ this.dialogRef.close() }, 500)
  }

  ngOnInit(): void {
      this.actionName = this.data.action;
      }

  
}
