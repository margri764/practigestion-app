import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { filter} from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { EditMenuComponent } from '../../messages/edit-menu/edit-menu/edit-menu.component';


@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.component.html',
  styleUrls: ['./edit-offers.component.scss']
})
export class EditOffersComponent implements OnInit {

  displayedColumns: string[] = ['img','name','price', 'stock', 'comment','ingredients'];
  dataTable : any = new MatTableDataSource<any>();
  showLabel : boolean = false;
  isLoading : boolean = true;

  constructor(
              private dialog : MatDialog,
              private store : Store <AppState>,

  ) { }

getStaffProduct(){
  
     this.store.select('product')
     .subscribe(
      ({ burger, pizza, drink, offer, healthy }) => {
        if (offer.length > 0) {
          // si el array de offer contiene datos, se asigna el valor a dataTable
          this.dataTable = offer;
          this.isLoading = false;
        } else if (burger.length > 0 || pizza.length > 0 || drink.length > 0 || healthy.length > 0) {
          this.isLoading = false;
          this.showLabel = true;

       
        } 
      }
    );
}


ngOnInit(): void {

    this.store.select('user')
    .pipe(
      filter(({user}) => user != null) 
         )
         .subscribe(
         ( ) =>{
                  this.getStaffProduct(); // estas las necesito xq solo se disparan aca x primera vez
                  setTimeout(()=>{}, )
  });
}

editItem( item : any ){
    this.dialog.open(EditMenuComponent, {
        data: {item},
        panelClass:"custom-modalbox-edit",
  });
}

}
