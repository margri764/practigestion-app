import { Component, OnInit,  } from '@angular/core';
import { Location,  } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/protected/services/error/error.service';

@Component({
  selector: 'app-login-message',
  templateUrl: './login-message.component.html',
  styleUrls: ['./login-message.component.scss']
})
export class LoginMessageComponent implements OnInit {

  selection : boolean = false;
  constructor(
               private dialogRef: MatDialogRef<LoginMessageComponent>,
               private router : Router,
              ) { }

ngOnInit(): void {

}


action(value : string){

  switch (value) {
    case 'close':
                  this.dialogRef.close();
                  this.router.navigateByUrl('/home');
                  // this.goBack();
      break;

      case 'login':
                  this.selection = true;
                  this.router.navigateByUrl('login');
                  this.dialogRef.close();
                  // setTimeout(()=>{ this.dialogRef.close(); },500)
      break;
    
      default:
      break;
  }
}
}