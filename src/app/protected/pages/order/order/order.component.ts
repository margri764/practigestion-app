import { ChangeDetectorRef, Component,  OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Articulo } from 'src/app/protected/interfaces/articulo.interface';
import { Order, DetalleItem } from 'src/app/protected/interfaces/order.interface';
import { PickClientMessageComponent } from 'src/app/protected/messages/pick-client-message/pick-client-message/pick-client-message.component';
import { SelectArticleMessageComponent } from 'src/app/protected/messages/select-article-message/select-article-message/select-article-message.component';
import { WrongActionMessageComponent } from 'src/app/protected/messages/wrong-action-message/wrong-action-message/wrong-action-message.component';
import { User } from 'src/app/protected/models/user.models';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { OrderService } from 'src/app/protected/services/order/order.service';
import { NgZone } from '@angular/core';
import * as articleAction from 'src/app/article.actions'
import { GenericSuccessComponent } from 'src/app/protected/messages/generic-success/generic-success/generic-success.component';
import { getDataLS, saveDataLS } from 'src/app/protected/Storage';
import { LocalStorageService } from 'src/app/protected/services/localStorage/local-storage.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {


  user : User []=[];
  arrArticles : any []=[];
  arrItemSelected : DetalleItem []=[];
  private itemFastSelect! : DetalleItem;
  myForm!: FormGroup;
  date: Date = new Date();
  onlyDate: string = this.date.toLocaleDateString(); // Muestra solo la fecha
  authSuscription! : Subscription;
  articleSuscription! : Subscription;
  client : any;
  showClient : boolean = true;
  showProduct : boolean = false;
  // labelNoArticles : boolean = false;
  // isLoading : boolean = false;
  confirm : boolean = false;

  saleOption : string[] =['Contado, Cuenta Corriente']



  constructor(
              private fb: FormBuilder,
              private dialog : MatDialog,
              private store : Store <AppState>,
              private orderService : OrderService,
              private cdRef: ChangeDetectorRef,
              private localStorageService: LocalStorageService

  ) {
    

  }

  ngOnDestroy(): void {
     if (this.authSuscription) {
      this.authSuscription.unsubscribe();
    }
    // if (this.articleSuscription) {
    //   this.articleSuscription.unsubscribe();
    // }
  }

  ngOnInit(): void {
   

    // this.updateArticlesFromLS()
    this.getTotal();

    this.orderService.changeClientValue.subscribe(
      (emitted) => {
        if (emitted === true) {
            this.showProduct = true;
            this.showClient = false;
            this.cdRef.detectChanges(); // Agrega esta línea
        }
      }
    );
  

    this.myForm = this.fb.group({
      date:     [ this.onlyDate],
      client:  [ '', [Validators.required]], 
      comercialName:  [''], 
      phone:  [ ''], 
      cuit:  [ ''], 
      discount:  [ ''], 
      ptoVenta:  [ ''], 
    });
    

    this.authSuscription = this.store.select("auth")
    .pipe(
      filter( ({tempClient})=>  tempClient != null && tempClient != undefined)
      ).subscribe(
      ({tempClient})=>{
          this.client = tempClient;
          const fullName = `${tempClient.nombre} ${tempClient.apellido}`
          const phone = `${tempClient.telefonoCodigoArea} ${tempClient.numeroLocal}`
          const comercialName = `${tempClient.razonSocial}`
          this.myForm.controls['client']?.setValue(fullName);
          this.myForm.controls['comercialName']?.setValue(comercialName);
          this.myForm.controls['phone']?.setValue(phone);
          this.myForm.controls['cuit']?.setValue(tempClient.cuit);
          this.myForm.controls['ptoVenta']?.setValue(tempClient.ptoVenta);
          console.log(this.client);
      })
      
      this.articleSuscription = this.store.select('article')
      .pipe(

      ).subscribe(({arrSelectedArticles})=>{
        this.arrItemSelected = arrSelectedArticles; //este es el pedido q se envia a BD
        this.arrArticles = arrSelectedArticles; // este se muestra en el front con otras propiedades
      
      })
 
  }

  // updateArticlesFromLS(){
  //   const tempArrayLS = getDataLS("arrArticles");
  //   if(tempArrayLS){
  //     this.arrArticles = tempArrayLS;
  //   }else{
  //     // si no se guarda en LS por algo del telefono siempre voy a tener la opcion del refux
  //     this.arrArticles = this.arrItemSelected;
  //   }
  // }

  getTotal(): number {
    if (!this.arrArticles || this.arrArticles.length === 0) {
      return 0;
    }
    return this.arrArticles.reduce((total, article) => total + article.ventaTotal, 0);
  
  }

  getClient(){
    this.dialog.open(PickClientMessageComponent, {
      // data: {msg: error},
      // disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  }

  deleteItem(id:any){

      this.store.dispatch(articleAction.deleteArticle({ articleId: id}));
      // let tempArray=getDataLS("arrArticles");
      // if(tempArray){
      //   let temp = tempArray.filter((item: { id: any; }) => item.id !== id)
      //   console.log(temp);
        this.localStorageService.saveStateToLocalStorage(this.arrItemSelected, "arrArticles");
        // this.updateArticlesFromLS();
      // }
    }

  saveTempOrder(){

  }
 
  selectOption(option : string){
    switch (option) {
      case "client":
        this.showClient = true;
        this.showProduct = false;
        break;
        
        case "product":
          this.showProduct = true;
          this.showClient = false;
          console.log('e');
                    // this.getProducts();
        break;
    
      default:
        break;
    }
  }

  createItemsOrder(){

    // armo el objeto q necesito para crear el pedido
   const tempOrder: any  = [];
   this.arrItemSelected.forEach((item)=>{
    tempOrder.push({codigoInterno: item.codigoInterno, cantidad: item.cantidad, bonificacionPorciento: item.bonificacionPorciento } )
   })
   return tempOrder
  }

  createOrder(){
     this.confirm = true;
    if ( this.myForm.invalid  ) {
      this.myForm.markAllAsTouched();
     this.confirm = false;

      return;
    }
    if(this.arrItemSelected.length === 0 ){
        this.openGenericMsgAlert('Elegí productos para generar el pedido');
        this.confirm = false;
        return;
    }

    const detalleItems = this.createItemsOrder();
    const body : Order ={
        idAgenda : this.client.id,
        estado :  this.client.estado,
        ptoVenta: this.client.ptoVenta,
        descuentoPorcentaje: this.myForm.get('discount')?.value,
        detalleItems 

    }
    console.log(body);

    // this.orderService.createOrder(body).subscribe((res)=>{console.log(res);})
  }
 

      
validField( field: string ) {
  return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}


openGenericMsgAlert(msg : string){
  this.dialog.open(WrongActionMessageComponent, {
    data: msg,
    // disableClose: true,
    panelClass:"custom-modalbox-NoMoreComponent", 
  });

}

// openDialogArticle(article : any){

//   this.dialog.open(SelectArticleMessageComponent, {
//     data: article,
//     // disableClose: true,
//     panelClass:"custom-modalbox-NoMoreComponent", 
//   });

// }

// openGenericSuccess(msg : string){

//   this.dialog.open(GenericSuccessComponent, {
//     data: msg,
//     disableClose: true,
//     panelClass:"custom-modalbox-NoMoreComponent", 
//   });

// }
    

}
