import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-success-hourly',
  templateUrl: './success-hourly.component.html',
  styleUrls: ['./success-hourly.component.scss']
})
export class SuccessHourlyComponent implements OnInit {

  confirm : boolean = false;
  actionName : string = ''
  
        constructor(
                    @Inject(MAT_DIALOG_DATA) public data: any,
                    private dialogRef: MatDialogRef<SuccessHourlyComponent>,
                    private authService : AuthService
        ) { }
  
    
    continue(){
      this.confirm = true;
      this.authService.closePauseApp.emit()
      setTimeout(()=>{ this.dialogRef.close(); }, 500)
    }
  
  
    ngOnInit(): void {
        this.actionName = this.data.action;
    }
  
  }