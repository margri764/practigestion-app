import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as productActions from 'src/app/product.actions'
import { AskPriceComponent } from 'src/app/protected/messages/ask-price/ask-price/ask-price.component';
import { SuccessPriceComponent } from 'src/app/protected/messages/success-price/success-price/success-price.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { ValidatorService } from 'src/app/services/validator/validator.service';


@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.scss']
})
export class EditPriceComponent implements OnInit {

@ViewChild(MatAccordion)  accordion!: MatAccordion;
@ViewChild ("menu" , {static: true} ) menu! : ElementRef;

  userSubscription! : Subscription;
  price : boolean= true;
  height : number = 250;
  toogle : boolean = false;
  tooglePrice : boolean= false;
  myForm!: FormGroup;
  operation : string = '';
  isPercent : boolean = false;
  optionSelected : string = '';
  step = true; 
  element : any;
  select : boolean = false;
  private selectOption : boolean = false;
  operationSelected : string ='';
  save : boolean = false;
  // ojo esto a personalizado!!!!!
  categories : string [] = [ 'Hamburguesas','Bebidas', 'Papas', 'Pizza', 'Saludable', 'Vegano' ]
  
constructor(
            private fb : FormBuilder,
            private store : Store <AppState>,
            private productService : ProductsService,
            private validatorService : ValidatorService,
            private dialog : MatDialog
            )
{ 
      
      this.myForm = this.fb.group({
        value:    [  , [Validators.required] ],
        category: [ '', Validators.required],
        operation : ['']
      },{
        validators: [ this.validatorService.changeRegularExpression('value')]
      })
  }

  
get valueErrorMsg(): string {

    const errors = this.myForm.get('value')?.errors;
    if ( errors?.['required'] ) {
      return 'Ingrese un valor';
    } else if ( errors?.['match'] ) {
      return 'No se permiten numeros negativos. Solo dos digitos despues de la coma. Si la acción es de DISMINUIR solo se aceptan 2 cifras';
    } 
    
    return '';
}

validField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}

launchOrderRequest() {
        this.store.dispatch(productActions.launchGetProduct());
}

ngOnInit(): void {

    this.valueToHeightCarousel();

    this.productService.price
    .pipe(
      take(1)
    )
    .subscribe( (res : string)=> { if(res === 'price'){this.goToMenu()} }); 

  // me suscribo a lo q se emita desde el mene de edit-food, pongo el "else" para q se cierre cuando no esta seleccionado
    this.productService.price.subscribe( (option) => {
        if(option == "price"){
          this.accordion.openAll();
        }else{
          this.accordion.closeAll();
        }});
}

visibility(){
    this.toogle = !this.toogle
}
  
toggPrice( value : string ){
  
    this.tooglePrice = !this.tooglePrice;
    switch (value) {
      case "increase":
                this.validatorService.isPercent = false;
                (<FormControl>this.myForm.controls['operation']).setValue( "INCREMENTAR %" );
                this.selectOption = true; // para obligar a seleccione una operacion
                this.select = false;
                this.operationSelected = (<FormControl>this.myForm.controls['operation']).value; // esto es para mostrar el cartel con la operacion
      break;
      
      case "decrease":
                this.validatorService.isPercent = true;
                (<FormControl>this.myForm.controls['operation']).setValue( "DECREMENTAR %" );
                this.selectOption = true;
                this.select = false;
                this.operationSelected = (<FormControl>this.myForm.controls['operation']).value;
      break;
  
      case "add":
                this.validatorService.isPercent = false;
                (<FormControl>this.myForm.controls['operation']).setValue( "SUMAR" );
                this.selectOption = true;
                this.select = false;
                this.operationSelected = (<FormControl>this.myForm.controls['operation']).value;
        break;
  
      case "substract":
                this.validatorService.isPercent = false;
                (<FormControl>this.myForm.controls['operation']).setValue( "RESTAR" );
                this.selectOption = true;
                this.select = false;
                this.operationSelected = (<FormControl>this.myForm.controls['operation']).value;

        break;
    
      default: return '';
    }
  
}

onSelect(){
  
    this.save = true;
    if ( this.myForm.invalid  ){
        this.myForm.markAllAsTouched();
        return;
    }

    if(this.selectOption != true){
      this.select = true;
      return
    }

    // para cambiar el nombre de la categoria 
    const colection = this.myForm.controls['category'].value;
    
    this.convertCategory( colection );
    
    this.askPriceAction();

    this.productService.cancelOrNextDialog
    .pipe(
      take(1)
    ).subscribe( ()=> {
      this.productService.editManyPrice( this.myForm.value ).subscribe(
        ( res )=>{
                  if(res.success){
                      this.launchOrderRequest();
                      this.success();
                      this.resets();
                      this.productService.goTotop.emit(true)
                                 }
                  })
                })
}

askPriceAction(){
    this.dialog.open(AskPriceComponent, {
      data: this.operationSelected,
     panelClass:"custom-modalbox-edit",
    });
}

success(){
  this.dialog.open(SuccessPriceComponent, {
    panelClass:"custom-modalbox-message",
  });
}


goToMenu(){
  this.element = this.menu.nativeElement;

  setTimeout( () => {

  this.element.scrollIntoView(
    { alignToTop: true,
      behavior: "smooth",
      block: "center",
    });
    }, 100);

}  
  
resets(){
    this.myForm.reset();
    this.myForm.markAsUntouched();
    this.accordion.closeAll();
    this.operationSelected= '';
    this.selectOption = false;
}
  
// esto es personalizable!!!
convertCategory( category : string){
  
    switch (category) {
      case "Hamburguesas":
              return (<FormControl>this.myForm.controls['category']).setValue( "BURGER" );
      case "Bebidas":
              return (<FormControl>this.myForm.controls['category']).setValue( "DRINK" );
      case "Papas":
              return (<FormControl>this.myForm.controls['category']).setValue( "FRIES" );
      case "Pizza":
              return (<FormControl>this.myForm.controls['category']).setValue( "PIZZA" );
      case "Saludable":
              return (<FormControl>this.myForm.controls['category']).setValue( "HEALTHY" );
      case "Vegano":
              return (<FormControl>this.myForm.controls['category']).setValue( "VEGAN" );
      default:  return ''
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
  