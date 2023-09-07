import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-ask-category',
  templateUrl: './ask-category.component.html',
  styleUrls: ['./ask-category.component.scss']
})
export class AskCategoryComponent implements OnInit {

  action: string = '';
  name: string = '';
  msg: string = '';
  confirm : boolean = false;

  constructor(
               private dialogRef: MatDialogRef<AskCategoryComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
                private router : Router,
               private productService : ProductsService
  ) { }

  ngOnInit(): void {
    this.action = this.data.action;
    this.name = this.data.name;

    (this.action == "pausar") ? this.msg= 'Recordá que todos los productos de esta categoría se pausarán' : this.msg= 'La categoría y todos sus productos se activaran'
  }

  continue(){
      this.confirm= true
      setTimeout(()=>{
        this.productService.playOrPauseCategory.emit();
        this.dialogRef.close();
      }, 700)
  }

  closeComponent(){
    setTimeout(()=>{
      this.dialogRef.close();
    }, 700)
}


}


