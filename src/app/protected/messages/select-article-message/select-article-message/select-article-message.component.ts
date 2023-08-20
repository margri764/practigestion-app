import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Articulo } from 'src/app/protected/interfaces/articulo.interface';
import { DetalleItem } from 'src/app/protected/interfaces/order.interface';
import * as articleAction from 'src/app/article.actions'
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-select-article-message',
  templateUrl: './select-article-message.component.html',
  styleUrls: ['./select-article-message.component.scss']
})
export class SelectArticleMessageComponent implements OnInit, OnDestroy {

  article! :  Articulo;
  productQuantity : number = 1;
  total : number = 0;
  inputValue: number = 0;
  articleSuscription! : Subscription;

  constructor(
               @Inject(MAT_DIALOG_DATA) public data: any,
               private store : Store <AppState>,
               private dialogRef : MatDialogRef<SelectArticleMessageComponent>
  ) { }

  ngOnDestroy(): void {
    if (this.articleSuscription) {
      this.articleSuscription.unsubscribe();
    }
  }

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

  const arrSelectedArticles = [];
  const detalleItemSelected: DetalleItem = {
    codigoInterno: this.article.codigoInterno,
    cantidad: this.productQuantity,
    bonificacionPorciento: this.inputValue || 0
  };

  this.articleSuscription = this.store.select('article')
  .pipe( take(1))
  .subscribe(({arrSelectedArticles}) => {
    const updatedArr = [...arrSelectedArticles, detalleItemSelected];
    this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: updatedArr }));
  });


  setTimeout(()=>{
    this.dialogRef.close();
  },1000)

}


}
