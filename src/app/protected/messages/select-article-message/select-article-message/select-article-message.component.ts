import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Articulo } from 'src/app/protected/interfaces/articulo.interface';
import { DetalleItem } from 'src/app/protected/interfaces/order.interface';
import * as articleAction from 'src/app/article.actions'
import { Subscription, take } from 'rxjs';
import { GenericSuccessComponent } from '../../generic-success/generic-success/generic-success.component';
import { getDataLS, saveDataLS } from 'src/app/protected/Storage';
import { LocalStorageService } from 'src/app/protected/services/localStorage/local-storage.service';
import { updateLocale } from 'moment';

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
               private dialogRef : MatDialogRef<SelectArticleMessageComponent>,
               private dialog : MatDialog,
               private localStorageService: LocalStorageService
  ) { }

  ngOnDestroy(): void {
    if (this.articleSuscription) {
      this.articleSuscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.article = this.data;
    console.log(this.article);
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

  
// saco los datos siempre del redux, el localstorage es para poder recuperare el redux en los reloads
  const articleToSave = {
                      descripcionLarga : this.article.descripcionLarga,
                      precioCostoConIva: this.article.precioCostoConIva,
                      cantidad: this.productQuantity,
                      codigoInterno : this.article.codigoArticulo,
                      id : this.article.idArticulo,
                      bonificacionPorciento: this.inputValue || 0,
                      ventaTotal: this.total 
  }


  // obtengo el arrSelectedArticles y hago el update con el nuevo producto
  this.articleSuscription = this.store.select('article')
  .pipe( take(1))
  .subscribe(({arrSelectedArticles}) => {
    const updatedArr = [...arrSelectedArticles, articleToSave]; //update
    this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: updatedArr }));
     
    // guardo en sessin storage la data temporal, solo guardo en el LS los pedidos  
    this.localStorageService.saveStateToSessionStorage(updatedArr, "arrArticles");

  });


  setTimeout(()=>{
    this.dialogRef.close();
  },400)

  setTimeout(()=>{
    this.openGenericSuccess('Producto añadido con éxito');
  },800)

}

styleObject(status : boolean) : object {
 
  if(!status){
    return {'color':'red'};
  }else{
    return {'color':'blue'};
  }
}



openGenericSuccess(msg : string){

  this.dialog.open(GenericSuccessComponent, {
    data: msg,
    disableClose: true,
    panelClass:"custom-modalbox-NoMoreComponent", 
  });

}

}
