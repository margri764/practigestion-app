import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-play-pause',
  templateUrl: './msg-play-pause.component.html',
  styleUrls: ['./msg-play-pause.component.scss']
})
export class MsgPlayPauseComponent implements OnInit {

  actionName : string = '';
  msg : string = 'Esta acción se puede revertir';
  confirm : boolean = false;

  constructor(
              private dialogRef : MatDialogRef<MsgPlayPauseComponent>,
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
