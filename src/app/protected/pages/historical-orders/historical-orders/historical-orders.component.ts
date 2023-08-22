import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-historical-orders',
  templateUrl: './historical-orders.component.html',
  styleUrls: ['./historical-orders.component.scss'],
})
export class HistoricalOrdersComponent implements OnInit {

@ViewChild ('top', {static: false} ) top! : ElementRef;

  myForm! : FormGroup
  myFormRange! : FormGroup;
  toggle : string = '';
  orders : any [] = [];
  ordersQuery : any [] = [];
  total : string = '';
  date : string = '';
  startDate : string = '';
  endDate : string = '';
  showLabel : boolean = false;
  save : boolean = false;
  singleDate : boolean = false;
  rangeDate : boolean = false;
  element : any;
  element2 : any;
  showLabelDateError : boolean = false;
  showLabelNoOrders : boolean = false;
  isLoading : boolean = false;
  spinnerDiameter : number = 50;
  progressValue: number = 0;
  timer : any;
  single : boolean = true;
  range : boolean = false;

  // accordion
  panelOpenState = false;

  constructor(
               private fb: FormBuilder,
               private orderService : OrdersService,
               private authService : AuthService

  ) { 

    this.myForm = this.fb.group({
      date:  [''], 
      searchType: ['DAY']
    });
  
    this.myFormRange = this.fb.group({
      startDate:  [''], 
      endDate:    [''], 
      searchType: ['RANGE']
    });
  }

ngOnInit(): void {
  this.scrollToTop();
}

progressBar(){
  this.timer = setInterval(() => {
    // Incrementar el valor de progreso en cada intervalo
    if (this.progressValue < 100) {
      this.progressValue++;
    } else 
      clearInterval(this.timer);
  }, 50); // Intervalo de actualización de progreso (ajusta esto según tus necesidades)
}

selectTypeDate( typeDate : string){

  switch (typeDate) {
    case "single":
                  this.single = !this.single;
                  this.range = false;
                  this.orders = [];
      break;
    
    case "range":
                  this.range = !this.range;
                  this.single = false;
                  this.orders = [];
      break;
  
    default:   this.single = true;
      break;
  }
}

submitDate(){
    
    this.date = (<FormControl>this.myForm.controls['date']).value;
    if(this.date == ''){
      return
    }
    this.orders = [];
    this.isLoading = true;
    this.progressBar();
    this.singleDate = !this.singleDate;
    this.rangeDate = false;
    this.orderService.getStaffOrdersByQuery(this.myForm.value).subscribe(
      ({staffOrders})=>{
        this.progressValue = 100;
        setTimeout(()=>{ this.showLabelNoOrders = false; this.singleDate = false; this.progressValue = 0; this.isLoading = false;}, 2000)
        if(staffOrders.length !== 0){
          this.orders = staffOrders;
          this.total = staffOrders.length;
        }else{
          this.total = staffOrders.length;
          this.showLabelNoOrders = true;
        }
          this.startDate= '';
          this.endDate= '';

      }
    )
}

submitRangeDate(){
    this.startDate = (<FormControl>this.myFormRange.controls['startDate']).value;
    this.endDate = (<FormControl>this.myFormRange.controls['endDate']).value;
    if(this.startDate == '' || this.endDate == ''){
      return
    }
    this.orders = [];
    this.isLoading = true;
    this.progressBar();
    this.rangeDate = !this.rangeDate;
    this.singleDate = false;
    this.orderService.getStaffOrdersByQuery(this.myFormRange.value).subscribe(
      ({staffOrders})=>{
        this.progressValue = 100;
        setTimeout(()=>{ this.showLabelNoOrders = false; this.singleDate = false; this.progressValue = 0; this.isLoading = false;}, 2000)
        if(staffOrders.length != 0){
            this.orders = staffOrders;
            this.total = staffOrders.length;
            this.showLabel = false;
        }else{
            this.showLabel = false;
            this.total = staffOrders.length;
        }
        this.date= '';

}
    )
}

scrollToTop(){

  setTimeout( () => {
    
    this.top.nativeElement.scrollIntoView(
    { 
      alignToTop: true,
      block: "center",
    });
    }, 0);
}

closeOrders(){
 this.orders = [];
}



}
