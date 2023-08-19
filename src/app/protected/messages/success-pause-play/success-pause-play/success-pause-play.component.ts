import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-success-pause-play',
  templateUrl: './success-pause-play.component.html',
  styleUrls: ['./success-pause-play.component.scss']
})
export class SuccessPausePlayComponent implements OnInit {

value : string = '';

  constructor(
                private dialogRef: MatDialogRef<SuccessPausePlayComponent>,
                private productService : ProductsService,
                private store : Store <AppState>
             )
{ 

}

closeComponent(){
  this.dialogRef.close();
  this.productService.closeMatDialog.emit()
}


ngOnInit(): void {

  this.store.select('product').subscribe(
    ({stringMsg}) => {
              if(stringMsg != ''){
                this.value = stringMsg
              }

    }
  )

}

}
