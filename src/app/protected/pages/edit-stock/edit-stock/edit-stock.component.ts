import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Stock } from 'src/app/models/stock.models';
import { ProductsService } from 'src/app/services/products/products.service';
import { AskCategoryComponent } from 'src/app/protected/messages/ask-category/ask-category/ask-category.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessCategoryComponent } from 'src/app/protected/messages/success-category/success-category/success-category.component';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.scss']
})
export class EditStockComponent implements OnInit, OnDestroy {

 show = false;
 productSubscription! : Subscription;
 displayedColumns: string[] = ['categoria','estado','stock'];
 dataSource : any = new MatTableDataSource<any>();
 burgerArray : any []=[]; 
 drinkArray : any []=[];
 friesArray : any []=[];
 healthyArray :any []=[];
 pizzaArray : any []=[];
 offerArray : any []=[];
 veganArray : any []=[];
 showLabel : boolean = false;
 isLoading : boolean = false;
 action : string = '';
 name : string = '';
 actionName : string = '';

  constructor(
              private productService : ProductsService,
              private store : Store <AppState>,
              private dialog : MatDialog
             ) 
  { }


ngOnDestroy(): void {
    if( this.productSubscription != undefined){
      this.productSubscription.unsubscribe();
    }
}

ngOnInit(): void {

    // me suscribo a lo q se emita desde el menu de edit-food, pongo el "else" para q se cierre cuando no esta seleccionado. 
    this.productService.price.subscribe((option)=>{ 
      if(option === "stock"){
        this.show = true
      }else{
        this.show = false
      }
    })

    this.productSubscription = this.store.select('product').subscribe(
         ({ burger, drink, fries, healthy, pizza, vegan, offer}) =>{
               this.burgerArray  = burger;
               this.drinkArray   = drink;
               this.friesArray   = fries;
               this.healthyArray = healthy;
               this.pizzaArray   = pizza;
               this.veganArray   = vegan;
               this.offerArray   = offer;
               this.getColectionStock();
  });

}

getColectionStock(){

    let stockArray : Stock [] = [];

// por cada categoria creo un nuevo array para poder mostrarlo en la tabla
    if( this.friesArray.length != 0){
      let fries = this.friesArray[0]; 
      const name = fries.category.name; 
      const paused = fries.category.paused;
      const stock = this.friesArray.length; 
      const _id = fries.category._id
      const dataFries = { name, paused, stock, _id } 
      stockArray.push(dataFries);
    }
    if( this.burgerArray.length != 0){
      let burger = this.burgerArray[0]; 
      const name = burger.category.name; 
      const paused = burger.category.paused;
      const stock = this.burgerArray.length; 
      const _id = burger.category._id
      const dataBurger = { name, paused, stock, _id } 
      stockArray.push(dataBurger);
    }
    if( this.offerArray.length != 0){
      let offer = this.offerArray[0]; 
      const name = offer.category.name; 
      const paused = offer.category.paused;
      const stock = this.offerArray.length; 
      const _id = offer.category._id
      const dataOffer = { name, paused, stock, _id } 
      stockArray.push(dataOffer);
    }
    this.dataSource =  stockArray; 
    (stockArray.length == 0) ? setTimeout(()=>{this.showLabel = true},1500) : this.showLabel = false ;
}

pausePlayItem(element : Stock, playOrPause : string ){
    
    const body = {
      _id : element._id,
      playOrPause,
      name : element.name
    };
    
    (playOrPause == "true") ? this.action = "pausar" : this.action= "activar";
    this.name = body.name; 

    this.openDialogAskCategory( );
    
    this.productService.playOrPauseCategory.pipe(
      take(1)
      ).subscribe(()=>{
        
        this.isLoading = true;
      this.productService.pausePlayCategory(body).subscribe(
        (res)=>{ 
                if(res.success){
                    (playOrPause == "true") ? this.actionName= "pausada" : this.actionName= "activada";
                    this.openDialogSuccessCategory();
                    this.productService.getProductToEditCategory().subscribe((res)=>{ if(res){this.isLoading = false}} )
                }
              }
      )
    })


}

openDialogAskCategory( ) {
    this.dialog.open(AskCategoryComponent, {
      data: {action: this.action, name: this.name},
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
}

openDialogSuccessCategory( ) {
    this.dialog.open(SuccessCategoryComponent, {
      data: {actionName: this.actionName},
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
}

reset(){
    this.show = false;
}

}
