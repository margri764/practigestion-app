import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Articulo } from 'src/app/protected/interfaces/articulo.interface';
import { Order, DetalleItem } from 'src/app/protected/interfaces/order.interface';
import { PickClientMessageComponent } from 'src/app/protected/messages/pick-client-message/pick-client-message/pick-client-message.component';
import { SelectArticleMessageComponent } from 'src/app/protected/messages/select-article-message/select-article-message/select-article-message.component';
import { User } from 'src/app/protected/models/user.models';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { OrderService } from 'src/app/protected/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {



  user : User []=[];
  arrArticles : Articulo []=[];
  myForm!: FormGroup;
  date: Date = new Date();
  onlyDate: string = this.date.toLocaleDateString(); // Muestra solo la fecha
  authSuscription! : Subscription;
  client : any;
  showClient : boolean = true;
  showProduct : boolean = false;
  labelNoArticles : boolean = false;

  saleOption : string[] =['Contado, Cuenta Corriente']



  constructor(
              private articleService :ArticlesService,
              private fb: FormBuilder,
              private dialog : MatDialog,
              private store : Store <AppState>,
              private orderService : OrderService
  ) {
    

  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      date:     [ this.onlyDate],
      client:  [ this.client, [Validators.required]], 
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
      
 
  }

  getClient(){
    this.dialog.open(PickClientMessageComponent, {
      // data: {msg: error},
      // disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
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
                    this.getProducts();
        
        break;
    
      default:
        break;
    }
  }

  createOrder(){

    const detalleItem1: DetalleItem = {
      codigoInterno: "ww",
      cantidad: 1,
      bonificacionPorciento: 0
  };
    const body : Order ={
        idAgenda : this.client.id,
        estado :  this.client.estado,
        ptoVenta: this.client.ptoVenta,
        descuentoPorcentaje: this.myForm.get('discount')?.value,
        detalleItems : [detalleItem1]

    }
    console.log(body);

    // this.orderService.createOrder(body).subscribe((res)=>{console.log(res);})
  }
 

      
validField( field: string ) {
  return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}

getProducts(){
  this.labelNoArticles= false;
  this.articleService.getAllArticles().subscribe(
    ({articulos})=>{
      console.log(articulos);
      if(articulos.length !== 0){
          this.arrArticles = articulos;
      }else{
        this.labelNoArticles = true;

      }

    }
  )
}

selectArticle(article : any){

}

openDialogArticle(article : any){

  this.dialog.open(SelectArticleMessageComponent, {
    data: article,
    // disableClose: true,
    panelClass:"custom-modalbox-NoMoreComponent", 
  });

}
    

}
