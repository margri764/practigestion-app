import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-price',
  templateUrl: './success-price.component.html',
  styleUrls: ['./success-price.component.scss']
})
export class SuccessPriceComponent implements OnInit {

  actionName : string = '';
  msg : string = 'Esta acción se puede revertir';
  confirm : boolean = false;

  constructor(
              private dialogRef : MatDialogRef<SuccessPriceComponent>,
  ) { }

  ngOnInit(): void {
 
  }

  closeComponent(){
    setTimeout(()=>{ 
      this.dialogRef.close();
    },500)
  }
  
  continue(){
    this.confirm = true; // es para clase en el button
    setTimeout(()=>{ 
            this.dialogRef.close();
    },500)
  }

}
