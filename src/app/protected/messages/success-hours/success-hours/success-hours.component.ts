import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-success-hours',
  templateUrl: './success-hours.component.html',
  styleUrls: ['./success-hours.component.scss']
})
export class SuccessHoursComponent implements OnInit {

  msg : string = ''
  selection : boolean = false;

  constructor(
               private dialogRef: MatDialogRef<SuccessHoursComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.msg = this.data.msg;
  }

  action(){
      setTimeout(()=>{
        this.authService.closeEditHour.emit();
        this.dialogRef.close();
      }, 1000)
  }

}
