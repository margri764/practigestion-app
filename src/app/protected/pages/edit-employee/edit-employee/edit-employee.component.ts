import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { EditStaffComponent } from 'src/app/protected/messages/edit-staff/edit-staff/edit-staff.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as authActions from 'src/app/auth.actions'
import { AddStaffComponent } from 'src/app/protected/messages/add-staff/add-staff/add-staff.component';
import { Staff } from 'src/app/models/staff.models';
import { WrongActionMessageComponent } from 'src/app/protected/messages/wrong-action-message/wrong-action-message/wrong-action-message.component';



@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'email','role','phone'];
  dataTable : any = new MatTableDataSource<any>();
  isLoading :  boolean = false;
  staff : any;
  userSubscription! : Subscription;
  
  constructor(
             private authService : AuthService,
             private store : Store <AppState>,
             private dialog : MatDialog
    ) 
  {    
  }


ngOnInit(): void {

  this.userSubscription = this.store.select("user")
  .pipe(
    filter(({user}) => user != null)
  )
  .subscribe( (user) =>{ 
                    this.getStaff();
                    this.staff = user;
                    this.isLoading = true;
   } 
  )

  this.authService.editStaffFired.subscribe(() => this.getStaff());

}

editItem( item : any){
  this.dialog.open(EditStaffComponent, {
      data: item,
      panelClass:"custom-modalbox-edit",
});
}



addStaff(){
  this.dialog.open(AddStaffComponent, {
      panelClass:"custom-modalbox-edit",
   });
}

getStaff(){
  this.authService.getStaff().subscribe( (res)=>{ this.dataTable = res.staff })
}

ngOnDestroy(): void {
  if(this.userSubscription != undefined){
    this.userSubscription.unsubscribe();
  }
}

 
}
