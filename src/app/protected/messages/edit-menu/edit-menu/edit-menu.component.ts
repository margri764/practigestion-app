import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { SuccessEditComponent } from 'src/app/protected/messages/success-edit/success-edit.component';
import * as productActions from 'src/app/product.actions';
import { ProductsService } from 'src/app/services/products/products.service';
import { DetailComponent } from '../../detail/detail/detail.component';
import { AskEditComponent } from '../../ask-edit/ask-edit/ask-edit.component';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { MsgPlayPauseComponent } from '../../msg-playPause/msg-play-pause/msg-play-pause.component';
import { ErrorService } from 'src/app/services/error/error.service';


@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss']
})

export class EditMenuComponent implements OnInit, OnDestroy {

@ViewChild('price') price!: ElementRef;
myForm! : FormGroup;
productSubscription! : Subscription;
item : any;
priceControl : any; //capturo el valor del input cuando edito
isPaused : boolean = false;
showLabelErrorStock : boolean = false;

// img
upImage!: File;
imgSrc : string = 'assets/no-image.jpg'
imgTemp: any = null;
imgTemplate: string='';
isLoading : boolean = false;
save : boolean = false;
action : string = 'editado';
askAction : string = '';

progressValue: number = 0;
isSubmitting : boolean = false;
timer : any;

  constructor(
              private fb : FormBuilder,
              private store : Store <AppState>,
              private productService : ProductsService,
              private dialog : MatDialog,
              private dialogRef: MatDialogRef<EditMenuComponent>,
              private validatorService : ValidatorService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private errorService : ErrorService

  ) { 

    this.myForm = this.fb.group({
      name: [ '', [ Validators.maxLength(40) ] ],
      price: [ null, [ Validators.required ] ],
      stockQuantity: [ null, [ this.validatorService.greaterThanZero() ] ],
      comment: [ '', [ Validators.maxLength(50) ] ],
      ingredients: [ '', [ Validators.maxLength(50) ] ],
      category: [ '', [ Validators.required ] ],
      id: [ '', [ Validators.required ] ]
    });

  }

ngOnInit(): void {

    // observable para cerrar mat dialog viene desde success-edit
    this.productService.closeEditMenu.subscribe( () => this.closeComponent())  
     this.errorService.change$.subscribe((res)=>{if(res){this.dialog.closeAll()}})

  
    this.item = this.data.item;
    this.imgSrc = this.item?.img;

      // manejo el icono de play o pause
      // Si isPaused esta en true significa q tengo q mostrar el icono de PLAY  
    if(this.item != null && this.item != undefined){

      if( this.item.paused || !this.item.stock){
        this.isPaused = true
      }else{
        this.isPaused = false
      }

      this.myForm = this.fb.group({
      name:         [ this.item.name , [ Validators.maxLength(40)] ],
      price:        [ this.item.price ,[ Validators.required ]],
      stockQuantity:[ this.item.stockQuantity ,[ this.validatorService.greaterThanZero() ]],
      comment:      [ this.item.comment, [ Validators.maxLength(50) ]],
      ingredients:  [ this.item.ingredients, [ Validators.maxLength(50) ]],
      category:     [ this.item.category.name ],
      id:           [ this.item._id],
             
   })
  }
}

getPriceValue(e : any){
    this.priceControl=  e.target.value;
}

ngOnDestroy(): void {
    if( this.productSubscription != undefined){
      this.productSubscription.unsubscribe();
    }
}

validField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}

succesEdit(){
    this.dialog.open(SuccessEditComponent, {
      data: {action: this.action},
      panelClass:"custom-modalbox-message",
  });
}

askEditAction() {
    this.dialog.open(AskEditComponent, {
      data: {ask: this.askAction , item: this.item.name},
      panelClass:"custom-modalbox-message",
  });
}

closeComponent(){

    setTimeout(()=>{

      this.dialogRef.close();
    },500)
}

onSaveForm(){

    this.save = !this.save;


    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.isLoading = true

    if (this.priceControl === undefined) {
      const oldPrice = (<FormControl>this.myForm.controls['price']).value;
      const parsedPrice = parseInt(oldPrice, 10);
      this.myForm.controls['price'].setValue(parsedPrice);
    } else {
      const parsedPriceControl = parseInt(this.priceControl, 10);
      this.myForm.controls['price'].setValue(parsedPriceControl);
    }
     this.progressBar();
    this.productService.editItemMenu(this.upImage, this.myForm.value).subscribe(
      ({success, product})=>{
                    if(success){
                      this.isLoading = false;
                      this.store.dispatch(productActions.editProduct( {product} ));
                      this.action = "editado";
                      this.progressValue = 100;
                      setTimeout(()=>{this.isSubmitting = false; this.succesEdit()},1000)
                    }
      } )
}

// corregir con un Observable!!!!!
deleteItem(){
  if( this.item._id == undefined || this.item._id == null ){
    return
  }

  this.askAction = 'eliminar';
  this.askEditAction();

  this.productService.cancelOrNextDialog.pipe(
    take(1)
  ).subscribe( (res)=> { // el ask-edit dispara ui boolean si se elige CONTINUAR con la acción
    
    if(res === "eliminar"){
      this.progressBar();  
    this.productService.deleteItemById( this.item).subscribe(
      ({success, product})=>{
          if(success){
            this.action = 'eliminado';
            this.progressValue = 100;
            setTimeout(()=>{this.isSubmitting = false; this.succesEdit()},1000)
            this.store.dispatch(productActions.editProduct( {product}));
          }
      }
    )
    }
  })

}

openDialogPlayPause(){
  this.dialog.open(MsgPlayPauseComponent,{
  panelClass:"custom-modalbox-message",
  })
}


pausePlayItem( value : string ){
  if( this.item._id == undefined || this.item._id == null ){
    return
  }
  if(this.item.stockQuantity == 0 && value == "play"){
    this.openDialogPlayPause();
    return
  }
  // dependiendo del valor manda un query con "false" o "true" y el back sabe si hay q poner stock = false o true
  
  let playOrPause = "true";

  switch (value) {
    case 'pause':
                 playOrPause = "false";
      break;
      
      case 'play':
                playOrPause = "true";
     break;
     default:   playOrPause = "true";
      break;

  }
  
  (playOrPause == "true") ? this.askAction = 'habilitar' : this.askAction = 'pausar';
  this.askEditAction();

  this.productService.cancelOrNextDialog
  .pipe(
    take(1)
  ).subscribe( (res:string)=> { // el ask-edit dispara ui boolean si se elige CONTINUAR con la acción
    
    if(res === "habilitar" || res === "pausar"){
     this.progressBar();
    this.productService.pausePlayItemById( this.item, playOrPause).subscribe(
      ({success, product})=>{
          if(success){
            this.isLoading = false;
            (playOrPause == "true") ? this.action = 'habilitado' : this.action = 'pausado';
            this.progressValue = 100;
            setTimeout(()=>{this.isSubmitting = false; this.succesEdit()},1000)
             // esto va para el componente q edita
            this.store.dispatch(productActions.editProduct({ product }));
          }}
        )}
      })
}
  
// si hay error por +40 caracteres en el nombre (muestra img)
launchDetails(){
  this.dialog.open( DetailComponent, {
    panelClass:"custom-modalbox-detail",
});

}
  
get valueErrorMsg(): string {
  
  const errors = this.myForm.get('price')?.errors;
  if ( errors?.['required'] ) {
    return 'Ingrese un valor';
  } else if ( errors?.['match'] ) {
    return 'No se permiten numeros negativos. Solo dos digitos despues de la coma. Si la acción es de DISMINUIR solo se aceptan 2 cifras';
  } 
  
  return '';
}

showPreview( e :any)  {

 let file = e.target.files[0];
    
 this.upImage= file;
 
  const reader = new FileReader();
  reader.readAsDataURL( file );
  this.upImage = file;
  this.imgTemplate= file.name;

  reader.onload = (e: any) => this.imgSrc = e.target.result;
  reader.onloadend = () => {
    this.imgTemp = reader.result;
  }
};

progressBar(){
  this.isSubmitting= true; 
  this.timer = setInterval(() => {
    // Incrementar el valor de progreso en cada intervalo
    if (this.progressValue < 100) {
      this.progressValue++;
    } else 
      clearInterval(this.timer);
  }, 50); // Intervalo de actualización de progreso (ajusta esto según tus necesidades)
}


}
