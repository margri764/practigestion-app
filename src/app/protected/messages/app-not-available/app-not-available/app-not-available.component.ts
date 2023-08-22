import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-app-not-available',
  templateUrl: './app-not-available.component.html',
  styleUrls: ['./app-not-available.component.scss']
})
export class AppNotAvailableComponent implements OnInit {

  msg : string = ''

  constructor(
               private dialogRef: MatDialogRef<AppNotAvailableComponent>,
               private authService : AuthService
  ) { }

  ngOnInit(): void {

    this.msg = this.authService.appMsg;

    setTimeout(()=>{
      this.dialogRef.close();
    },3000)
  }

}
