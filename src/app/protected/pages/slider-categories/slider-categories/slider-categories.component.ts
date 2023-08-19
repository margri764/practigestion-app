import { Component, Input, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { getDataSS, saveDataSS } from 'src/app/LocalStorage';
import { EditMenuComponent } from 'src/app/protected/messages/edit-menu/edit-menu/edit-menu.component';
import { StaffArrayProduct } from 'src/app/protected/staffArrayProduct';
import * as productActions from 'src/app/product.actions'

@Component({
  selector: 'app-slider-categories',
  templateUrl: './slider-categories.component.html',
  styleUrls: ['./slider-categories.component.scss']
})
export class SliderCategoriesComponent  implements OnInit, OnDestroy {

@ViewChild(MatAccordion)  priceAccordion!: MatAccordion;
@ViewChild('toResetForm') toResetForm!: NgForm;
@Input () arrProducts: any;

changeSubscription! : Subscription;
price : boolean= true;
height : number = 250;
toogle : boolean = false;
tooglePrice : boolean= false;
myForm!: FormGroup;
operation : string = '';
isPercent : boolean = false;
stock : boolean = false

borrarEsto = false;
productSubscription! : Subscription;

tempBurger : any;
tempDrink : any;
tempFries : any;
tempVegan : any;
tempPizza : any;
tempHealthy : any;

loading : boolean = false;
isLoading : boolean = false;


burger : boolean = false;
drink : boolean = false;
fries : boolean = false;
vegan : boolean = false;
pizza : boolean = false;
healthy : boolean = false;

arrClass : any;
noStock : boolean = false;

// accordion
panelOpenState = false;
   
displayedColumns: string[] = ['img','name','price','stock','comment','ingredients'];

paused : any = new MatTableDataSource<any>();
dataTable : any = new MatTableDataSource<any>();

  constructor(
              private store : Store <AppState>,
              private dialog : MatDialog,
             )
  {   }


editItem( item : any ){

    this.store.dispatch(productActions.setEditMenu({ itemMenu: item }));
    this.dialog.open(EditMenuComponent, {
        panelClass:"custom-modalbox-edit",
  });
}

setArrProducts(){
    // como es una componente hijo obtengo del padre edit-component el array completo de productos (tengo el input aca)
    this.arrClass = new StaffArrayProduct( this.arrProducts?.burgerStaff, this.arrProducts?.drinkStaff, this.arrProducts?.friesStaff, this.arrProducts?.veganStaff, this.arrProducts?.healthyStaff, this.arrProducts?.pizzaStaff, this.arrProducts?.offerStaff);
 
    this.dataToTable();
}

ngOnInit(): void {

    this.valueToHeightCarousel();
    this.setArrProducts();
}

dataToTable(){
    // lleno los arreglos temporales q uso en el menuClicked() para asignar el array correcto para la tabla dinamica
    let tempArray = this.arrClass.getStockProduct();
    this.tempBurger= tempArray.stockTrueBurger;
    this.tempDrink = tempArray.stockTrueDrink;
    this.tempFries = tempArray.stockTrueFries;
    this.tempVegan = tempArray.stockTrueVegan;
    this.tempPizza = tempArray.stockTruePizza;
    this.tempHealthy = tempArray.stockTrueHealthy;
}
  
setCategory(){
    if(getDataSS('tempCat') != undefined || getDataSS('tempCat') != null){
      this.menuClicked(getDataSS('tempCat'))
    }
}

menuClicked( option : string ){

  switch (option) {
    case "burger":
                (this.burger) ? '' : this.burger = true;
                this.drink = false;
                this.fries = false;
                this.vegan = false;
                this.healthy = false;
                this.dataTable= this.tempBurger;
                saveDataSS('tempCat', 'burger');

    break;

    case "drink":
                (this.drink) ? '' : this.drink= true;
                this.burger = false;
                this.fries = false;
                this.vegan = false;
                this.healthy = false;
                this.dataTable= this.tempDrink;
                saveDataSS('tempCat', 'drink');
    break;
    case "fries":
                (this.fries) ? '': this.fries = true;
                this.drink = false;
                this.burger = false;
                this.vegan = false;
                this.healthy = false;
                this.dataTable= this.tempFries;
                saveDataSS('tempCat', 'fries');
    break;
    case "vegan":
                (this.vegan) ? '' : this.vegan = true;
                this.drink = false;
                this.burger = false;
                this.fries = false;
                this.healthy = false;
                this.dataTable= this.tempVegan;
                saveDataSS('tempCat', 'vegan');
    break;
    case "healthy":
                (this.healthy) ? '' : this.healthy = true;
                this.drink = false;
                this.burger = false;
                this.fries = false;
                this.vegan = false;
                this.dataTable= this.tempHealthy;
                saveDataSS('tempCat', 'healthy');
   break;
   case "pizza":
                (this.healthy) ? '' : this.healthy = true;
                this.drink = false;
                this.burger = false;
                this.fries = false;
                this.vegan = false;
                this.dataTable= this.tempPizza;
                saveDataSS('tempCat', 'pizza');
  break;
  
    default:   '';
  }

}

ngOnDestroy(): void {
  if(this.productSubscription != undefined){
      this.productSubscription.unsubscribe();
  }
}

valueToHeightCarousel(){
    if (screen.width > 300 && screen.width < 574){
      this.height = 300;
      return;
    }
    if (screen.width > 574 && screen.width < 768){
      this.height = 180;
      return;
    }
    if (screen.width > 768 && screen.width < 1300){
      this.height = 400;
      return;
    }
    if (screen.width > 1300 ){
      this.height = 220;
      return;
    }
}

}
