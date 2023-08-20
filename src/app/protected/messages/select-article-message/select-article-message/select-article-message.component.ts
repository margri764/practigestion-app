import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo } from 'src/app/protected/interfaces/articulo.interface';
import { DetalleItem } from 'src/app/protected/interfaces/order.interface';

@Component({
  selector: 'app-select-article-message',
  templateUrl: './select-article-message.component.html',
  styleUrls: ['./select-article-message.component.scss']
})
export class SelectArticleMessageComponent implements OnInit {

  article! :  Articulo;
  productQuantity : number = 1;
  total : number = 0;
  inputValue: number = 0;

  constructor(
               @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {

    this.article = this.data;
    this.totalPurchase();

  }


increment( ){
  this.productQuantity = this.productQuantity + 1;
  this.totalPurchase();
}

decrement( ){
  (this.productQuantity>=2) ? this.productQuantity = this.productQuantity - 1 : "";
  this.totalPurchase();

}

totalPurchase(){

  if(this.inputValue > 0){
    const priceBonus = this.article.precioCostoConIva * this.inputValue;
    const result = this.article.precioCostoConIva - priceBonus / 100;
    this.total = (this.productQuantity * result) ;
    return this.total;
  }

  this.total = (this.productQuantity * this.article.precioCostoConIva) ;
  return this.total;

}

selectItem(){

  const detalleItemSelected: DetalleItem = {
    codigoInterno: this.article.codigoInterno,
    cantidad: this.productQuantity,
    bonificacionPorciento: this.inputValue || 0
  };
  console.log(detalleItemSelected);

}


}
