import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { EditClientComponent } from '../../edit-client/edit-client/edit-client.component';
import { NewClientComponent } from '../../new-client/new-client/new-client.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  contactos : any []=[];
  constructor(
              private authService : AuthService,
              private dialog : MatDialog
  ) { }

  ngOnInit(): void {
      this.getAllClients()
   
  }

getAllClients(){
  this.authService.getAllClients().subscribe(
    ({contactos})=>{
      this.contactos = contactos;
    })
}

  deleteClient(id : any){
    //LLAMAR ELMETODO DE ELIMINAR Y ACTUALIZAR
      this.authService.deleteClientById("2739").subscribe(
        (res)=>{
          console.log(res);
        })
  
   
    this.getAllClients();
  }

  editClient(client: any){


  this.dialog.open(EditClientComponent, {
    data: client,
    // disableClose: client,
    panelClass:"custom-modalbox-NoMoreComponent", 
  });

  }

  addClient(){
    this.dialog.open(NewClientComponent, {
      // data: client,
      // disableClose: client,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  }

}
