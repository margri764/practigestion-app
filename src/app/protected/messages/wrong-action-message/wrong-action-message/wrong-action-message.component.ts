import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-wrong-action-message',
  templateUrl: './wrong-action-message.component.html',
  styleUrls: ['./wrong-action-message.component.scss']
})
export class WrongActionMessageComponent implements OnInit {
  confirm : boolean = false;

  constructor( private dialogRef : MatDialogRef<WrongActionMessageComponent>) { }

  ngOnInit(): void {
  }

  continue(){
    this.confirm = true;
    setTimeout(()=>{ this.dialogRef.close() },300)
    
  }

}
