import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admins-message',
  templateUrl: './admins-message.component.html',
  styleUrls: ['./admins-message.component.scss']
})
export class AdminsMessageComponent implements OnInit {

  selection : boolean = false;

  constructor(
              private dialogRef : MatDialogRef<AdminsMessageComponent>
  ) { }

  ngOnInit(): void {
  }

  continue(){
    this.selection = true;
    setTimeout(()=>{ this.dialogRef.close() },500)
    
  }

}
