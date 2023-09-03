import { AfterViewChecked, ChangeDetectorRef, Component,  OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Order, DetalleItem } from 'src/app/protected/interfaces/order.interface';
import { PickClientMessageComponent } from 'src/app/protected/messages/pick-client-message/pick-client-message/pick-client-message.component';
import { WrongActionMessageComponent } from 'src/app/protected/messages/wrong-action-message/wrong-action-message/wrong-action-message.component';
import { User } from 'src/app/protected/models/user.models';
import { OrderService } from 'src/app/protected/services/order/order.service';
import * as articleAction from 'src/app/article.actions'
import * as authAction from 'src/app/auth.actions'
import { GenericSuccessComponent } from 'src/app/protected/messages/generic-success/generic-success/generic-success.component';
import { LocalStorageService } from 'src/app/protected/services/localStorage/local-storage.service';
import { Subscription, filter } from 'rxjs';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { getDataLS, getDataSS } from 'src/app/protected/Storage';
import { GenericMessageComponent } from 'src/app/protected/messages/generic-message/generic-message/generic-message.component';
import { AskOpenOrderComponent } from 'src/app/protected/messages/ask-open-order/ask-open-order/ask-open-order.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy, AfterViewChecked {


  user : User []=[];
  arrArticles : any []=[];
  arrItemSelected : DetalleItem []=[];
  tempOrder : any[]=[];
  myForm!: FormGroup;
  date: Date = new Date();
  onlyDate: string = this.date.toLocaleDateString(); // Muestra solo la fecha
  authSuscription! : Subscription;
  articleSuscription! : Subscription;
  client : any;
  showClient : boolean = false;
  showProduct : boolean = true;


  confirm : boolean = false;
  saleOption : string[] =['Contado, Cuenta Corriente']
  salePoint : any [] =[]


  constructor(
              private fb: FormBuilder,
              private dialog : MatDialog,
              private store : Store <AppState>,
              private orderService : OrderService,
              private cdRef: ChangeDetectorRef,
              private localStorageService: LocalStorageService,
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

   this.getSalePoint();
   this.getTotal();


    // this.orderService.changeClientValue.subscribe(
    //   (emitted) => {
    //     if (emitted === true) {
    //         this.showProduct = true;
    //         this.showClient = false;
    //         this.cdRef.detectChanges(); /
    //     }
    //   }
    // );

    this.myForm = this.fb.group({
      date:     [ this.onlyDate],
      client:  [ '', [Validators.required]], 
      comercialName:  [''], 
      phone:  [ ''], 
      cuit:  [ ''], 
      discount:  [ 0], 
      ptoVenta:  [ '' ,[Validators.required]], 
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

  getSalePoint(){

    this.orderService.getSalePoint().subscribe(
      ({pos})=>{
          if(pos.length !== 0){
              this.salePoint = pos
          }
      })

  }

  getTotal(): number {
    if (!this.arrArticles || this.arrArticles.length === 0) {
      return 0;
    }
    return this.arrArticles.reduce((total, article) => total + article.ventaTotal, 0);
  
  }

  getClient(){
    let width : string = '';
    let height : string = '';

    if(screen.width >= 800) {
      width = "500px"
      height ="400px";
    }
    this.dialog.open(PickClientMessageComponent, {
      width: `${width}`|| "",
      height:`${height}`|| "",
      // data: {msg: error},
      // disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  }

  deleteItem(id:any){
    //elimino el item del array
      this.store.dispatch(articleAction.deleteArticle({ articleId: id}));
      const tempArticles = getDataSS("arrArticles");

      let updatedArticles = tempArticles.filter((item: { id: any; }) => item.id !== id);
      console.log(updatedArticles);

      //hago el update con el nuevo valor del array
      this.localStorageService.saveStateToSessionStorage(updatedArticles, "arrArticles");
    }

  generateSimpleId() {
    const timestamp = Date.now(); // Obtén el timestamp actual en milisegundos
    return `id_${timestamp}`;
  }

  ngAfterViewChecked() {
    // this.showProduct = true;
    // this.showClient = false;
    // this.cdRef.detectChanges();
  }


  selectOption(option : string){

    console.log(option);
    
    switch (option) {

      case "client":
                  this.showClient = true;
                  this.showProduct = false;
        break;
        
        case "product":
                this.showProduct = true;
                this.showClient = false;
        break;
    
      default:
        break;
    }
  }

  createItemsOrder(){

    // armo el objeto q necesito para crear el pedido, arrItemSelected viene del redux y solo
   const tempOrderItem: any  = [];
   this.arrItemSelected.forEach((item)=>{
    tempOrderItem.push({codigoInterno: item.codigoInterno, cantidad: item.cantidad, bonificacionPorciento: item.bonificacionPorciento } )
   })
   return tempOrderItem
  }
confirmE: boolean= false;
confirmA: boolean= false;

  createOrder(saveOrSend : string){


    if ( this.myForm.invalid  ) {
      this.myForm.markAllAsTouched();
       this.confirmE = false;
       this.confirmA = false;

      return;
    }
    if(this.arrItemSelected.length === 0 ){
        this.openGenericMsgAlert('Elegí productos para generar el pedido');
        this.confirmE = false;
        this.confirmA = false;
        return;
    }

    if(saveOrSend === "E"){
      this.confirmE = true;
    }else{
      this.confirmA = true;
    }

    const detalleItems = this.createItemsOrder();
    const body : Order ={
        idAgenda : this.client.id,
        estado :  saveOrSend,
        ptoVenta: this.myForm.get('ptoVenta')?.value,
        descuentoPorcentaje: this.myForm.get('discount')?.value,
        detalleItems 

    }
    
console.log(body);
    this.orderService.createOrder(body).subscribe((res)=>{
      if(res.msg === "success"){
        this.openGenericSuccess('Pedido generado con éxito!!');
        //si el pedido se guardo qu vuelva a cargar las ordenes abiertas
        if(body.estado === "A"){
            this.orderService.getOpenOrders().subscribe()
          }
          this.resetOrder();
      }
    })
  }


  resetOrder(){

    this.myForm.get('client')?.setValue('');
    this.myForm.markAsPristine();
    this.myForm.markAsUntouched();
    this.client = null,
    this.arrArticles = [];
    this.arrItemSelected = [];
    this.store.dispatch(articleAction.unSetSelectedArticles());
    this.store.dispatch(authAction.unSetTempClient());
    sessionStorage.removeItem("arrArticles");
    sessionStorage.removeItem("tempClient");


  }


 

// openGenericMessage(msg:string){
//   this.dialog.open(GenericMessageComponent, {
//     data: msg,
//     panelClass:"custom-modalbox-NoMoreComponent", 
//   });

// }

openGenericMsgAlert(msg : string){
  this.dialog.open(WrongActionMessageComponent, {
    data: msg,
    // disableClose: true,
    panelClass:"custom-modalbox-NoMoreComponent", 
  });

}



openGenericSuccess(msg : string){

  let width : string = '';
  let height : string = '';

  if(screen.width >= 800) {
    width = "400px"
    height ="450px";
  }

  this.dialog.open(GenericSuccessComponent, {
    data: msg,
    width: `${width}`|| "",
    height:`${height}`|| "",
    disableClose: true,
    panelClass:"custom-modalbox-NoMoreComponent", 
  });

}



}
