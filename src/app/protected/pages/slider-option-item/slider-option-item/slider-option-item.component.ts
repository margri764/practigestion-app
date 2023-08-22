import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { PauseAppComponent } from 'src/app/protected/messages/pauseApp/pause-app/pause-app.component';
import { ProductsService } from 'src/app/services/products/products.service';
import * as productActions from 'src/app/product.actions'

@Component({
  selector: 'app-slider-option-item',
  templateUrl: './slider-option-item.component.html',
  styleUrls: ['./slider-option-item.component.scss']
})
export class SliderOptionItemComponent implements OnInit {

price : boolean= true;
stock : boolean = false
pauseApp : boolean = false;
openingHours : boolean = false;

height : number = 250;
toogle : boolean = false;
tooglePrice : boolean= false;
myForm!: FormGroup;
operation : string = '';
isPercent : boolean = false;


  constructor(
              private productService : ProductsService,
              private dialog : MatDialog
             )
  {   }



ngOnInit(): void {

    this.valueToHeightCarousel();


}

menuClicked( option : string ){

  switch (option) {
    case "price":
            (this.price) ? '' : this.price = true;
            this.stock = false;
            this.pauseApp = false;
            this.openingHours = false;
            this.productService.price.emit("price") // con estos emit elijo q componente mostrar ya q estan todos en el mismo lugar
            
    break;

    case "stock":
            (this.stock) ? '' : this.stock = true;
            this.price = false;
            this.pauseApp = false;
            this.openingHours = false;
            this.productService.price.emit("stock")
    break;

    case "pauseApp":
            (this.pauseApp) ? '' : this.pauseApp = true;
            this.price = false;
            this.stock = false;
            this.openingHours = false;
            this.dialog.open(PauseAppComponent, {
              panelClass:"custom-modalbox-pauseApp",
            });
            this.productService.price.emit("pauseApp")
    break;

    case "openingHours":
           (this.openingHours) ? '' : this.openingHours = true;
           this.price = false;
           this.stock = false;
           this.pauseApp = false;
           this.productService.price.emit("openingHours")
break;
  
    default: return '';
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
