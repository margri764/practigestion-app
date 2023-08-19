import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-ask-staff',
  templateUrl: './ask-staff.component.html',
  styleUrls: ['./ask-staff.component.scss']
})
export class AskStaffComponent implements OnInit {


  confirm : boolean = false;
  actionName : string = '';
  name : string = '';
  msg : string = 'Esta acción se puede revertir';
  userSubscription! : Subscription;
  user : any;
  
    constructor(
                 @Inject(MAT_DIALOG_DATA) public data: any,
                 private dialogRef: MatDialogRef<AskStaffComponent>,
                 private productService : ProductsService,
                 private store : Store <AppState>,
               
    ) { }
  
  closeComponent(){
    setTimeout(()=>{ 
      this.dialogRef.close();
    },500)
  }
  
  continue(){
    this.confirm = true; // es para clase en el button
    setTimeout(()=>{ 

        if(this.actionName === "editar"){
          this.productService.cancelOrNextStaff.emit("editar");
        }else if(this.actionName === "eliminar"){
          this.productService.cancelOrNextStaff.emit("eliminar");
        }
        else{
          this.productService.cancelOrNextStaff.emit("pauseOrPlay");
        }
        this.dialogRef.close();
          
    },500)
  }
  
  ngOnInit(): void {



    this.userSubscription = this.store.select('user')
    .pipe(
      filter( ({user})=>  user != null && user != undefined)
      ).subscribe(
        ({user})=>{
            this.user = user;
          })
          
    this.actionName = this.data.ask;
    this.name = this.data?.staff?.fullName;
    (this.actionName === "habilitar" || this.actionName === "pausar") ? this.msg ="Esta acción se puede revertir" : this.msg = "CUIDADO!! esta acción es irreversible."
  }


  
  }
  