import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { EditMenuComponent } from '../../messages/edit-menu/edit-menu/edit-menu.component';
import { MatAccordion } from '@angular/material/expansion';
import { ProductsService } from 'src/app/services/products/products.service';
import { getDataSS, saveDataSS } from 'src/app/LocalStorage';


@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.scss'],
})

export class EditFoodComponent implements OnInit, OnDestroy {

@ViewChild(MatAccordion) accordion!: MatAccordion;
@ViewChild ('top', {static: false} ) top! : ElementRef;
@ViewChild ('menu', {static: false} ) menu! : ElementRef;

burger : boolean = true;
drink : boolean = false;
fries : boolean = false;
vegan : boolean = false;
pizza : boolean = false;
healthy : boolean = false;
arrBurger : any;
arrDrink : any;
arrFries : any;
arrVegan : any;
arrPizza : any;
arrHealthy : any;
element : any;
userSubscription! : Subscription;
productSubscription! : Subscription;
loading : boolean = false;
isLoading : boolean = false;
noStock : boolean = false;
panelOpenState = false;
displayedColumns: string[] = ['img','name','price','stock','comment','ingredients'];
dataTableActive : any = new MatTableDataSource<any>();

  constructor(
              private dialog : MatDialog,
              private store : Store <AppState>,
              private productService :ProductsService,
  ) { 
  }

ngOnInit(): void {

  this.isLoading = false;

  this.productService.goTotop.subscribe((emit)=>{ if(emit){this.goToTop()}})

  this.userSubscription = this.store.select('user')
  .pipe(
    filter( ({user})=>  user != null && user != undefined)
    ).subscribe(
      ()=>{ 
        setTimeout(()=>{

          this.initialData();
        },1000)
      })
}

initialData(){
  this.productService.getProduct().subscribe(
    ( res ) =>{
          this.isLoading = true;
          this.dataToTable( res );
          this.dataTableActive= this.arrBurger;

        }
  )
}
  
dataToTable( res : any){
    this.arrBurger = res.burger;
    this.arrDrink  = res.drink;
    this.arrFries  = res.fries;
    this.arrVegan  = res.vegan;
    this.arrPizza  = res.pizza
    this.arrHealthy = res.healthy;
}

editItem( item : any ){
  this.dialog.open(EditMenuComponent, {
       data: { item },
       panelClass:"custom-modalbox-edit",
});
}

menuClicked( option : string ){

  switch (option) {
    case "burger":
                (this.burger) ? '' : this.burger = true;
                this.drink = false;
                this.fries = false;
                this.vegan = false;
                this.healthy = false;
                this.pizza = false;
                this.dataTableActive= this.arrBurger;
                saveDataSS('tempCat', 'burger');
                // this.goToMenu();

    break;
    case "drink":
                (this.drink) ? '' : this.drink= true;
                this.burger = false;
                this.fries = false;
                this.vegan = false;
                this.healthy = false;
                this.pizza = false;
                this.dataTableActive = this.arrDrink;
                saveDataSS('tempCat', 'drink');
                // this.goToMenu();
    break;

    case "fries":
                console.log(this.fries);
                (this.fries) ? '': this.fries = true;
                this.drink = false;
                this.burger = false;
                this.vegan = false;
                this.healthy = false;
                this.pizza = false;
                this.dataTableActive = this.arrFries;
                saveDataSS('tempCat', 'fries');
                // this.goToMenu();
    break;

    case "vegan":
                (this.vegan) ? '' : this.vegan = true;
                this.drink = false;
                this.burger = false;
                this.fries = false;
                this.healthy = false;
                this.pizza = false;
                this.dataTableActive = this.arrVegan;
                saveDataSS('tempCat', 'vegan');
                // this.goToMenu();
    break;

    case "healthy":
                (this.healthy) ? '' : this.healthy = true;
                this.drink = false;
                this.burger = false;
                this.fries = false;
                this.vegan = false;
                this.pizza = false;
                this.dataTableActive = this.arrHealthy;
                saveDataSS('tempCat', 'healthy');
                // this.goToMenu();
   break;

   case "pizza":
                (this.pizza) ? '' : this.pizza = true;
                this.drink = false;
                this.burger = false;
                this.fries = false;
                this.vegan = false;
                this.healthy = false;
                this.dataTableActive = this.arrPizza;
                saveDataSS('tempCat', 'pizza');
                // this.goToMenu();
    break;
    default:   '';
  }

}

goToTop(){
  this.element = this.top.nativeElement;

  setTimeout( () => {

  this.element.scrollIntoView(
    { alignToTop: true,
      block: "center",
    });
    }, 0);

} 

goToMenu(){
  this.element = this.menu.nativeElement;

  setTimeout( () => {

  this.element.scrollIntoView(
    { alignToTop: true,
      behavior: "smooth",
      block: "center",
    });
    }, 0);

} 

ngOnDestroy(): void {
  if(this.userSubscription != undefined){
    this.userSubscription.unsubscribe()
  }else if(this.productSubscription != undefined){
    this.productSubscription.unsubscribe()
  }

}


}
