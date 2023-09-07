
import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SuccessHoursComponent } from '../../success-hours/success-hours/success-hours.component';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.scss']
})

export class OpeningHoursComponent implements OnInit {

// ripples
  centered = false;
  disabled = false;
  unbounded = false;
  radius!: number;
  color: string = '';
//   ripples

  hours = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  min = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
  
  beforeH : number = this.hours[9]; 
  hour : number = this.hours[10]
  afterH : number = this.hours[11]  

  counterB : number = this.hours[9]; 
  counter : number = this.hours[10]
  counterA : number = this.hours[11]  

  beforeM : number = this.min[59]; 
  minute : number = this.min[0]
  afterM : number = this.min[1]  

  counterBM : number = this.min[59]; 
  counterM : number = this.min[0]
  counterAM : number = this.min[1]  

  sunday : boolean = false;
  monday : boolean = false;
  tuesday : boolean = false;
  wednesday : boolean = false;
  thursday : boolean = false;
  friday : boolean = false;
  saturday : boolean = false;
  day: any []= [];
  openFrom! : number;
  to! : number ;
  showOpenFrom : boolean = false;
  showTo : boolean = false;
  noDays : boolean = false; 

  timeOpenFrom : string = ''; // muestro o no el DONE
  timeTo : string = '';
 
  openSelected : boolean = false;
  toSelected : boolean = false;
  typeHour : string = ''; // muestro q tipo de hora es 
  timeFromBack : string = '';
  showDayLabel : boolean = false;
  showTimeLabel : boolean = false;
  confirm : boolean = false;
  constructor(
               private authService : AuthService,
               private dialogRef : MatDialogRef<OpeningHoursComponent>,
               private dialog : MatDialog,

  ) { }

 decrementM(){
   this.showOpenFrom = true; //muestra la hora bindeada antes de ser seleccionada
   //muestra la hora bindeada antes de ser seleccionada pero ANTES 
   (this.openSelected) ? this.showTo = true : ''

   if(this.counterBM == 0 && this.counterM == 1 && this.counterAM == 2){
      this.counterBM = 60
   }
   if(this.counterBM == 59 && this.counterM == 0 && this.counterAM == 1){
      this.counterM = 60
   }
   if(this.counterBM == 58 && this.counterM == 59 && this.counterAM == 0){
      this.counterAM = 60
   }
   this.counterM--;
   this.counterBM--;
   this.counterAM--;
   this.minute = this.min[this.counterM];
   this.beforeM = this.min[this.counterBM];
   this.afterM = this.min[this.counterAM];
 }

 incrementM(){
   this.showOpenFrom = true; //muestra la hora bindeada antes de ser seleccionada
   //muestra la hora bindeada antes de ser seleccionada pero ANTES 
   (this.openSelected) ? this.showTo = true : ''

      if(this.counterBM == 57 && this.counterM == 58 && this.counterAM == 59){
         this.counterAM = -1
      }
      if(this.counterBM == 58 && this.counterM == 59 && this.counterAM == 0){
         this.counterM = -1
      }
      if(this.counterBM == 59 && this.counterM == 0 && this.counterAM == 1){
         this.counterBM = -1
      }

      this.counterM++;
      this.counterBM++;
      this.counterAM++;
      this.minute = this.min[this.counterM];
      this.beforeM = this.min[this.counterBM];
      this.afterM = this.min[this.counterAM];
      

 }

 decrement(){
   
   this.showOpenFrom = true; //muestra la hora bindeada antes de ser seleccionada
   //muestra la hora bindeada antes de ser seleccionada pero ANTES 
   (this.openSelected) ? this.showTo = true : ''
 
   if(this.counterB == 0 && this.counter == 1 && this.counterA == 2){
      this.counterB = 24
   }
   if(this.counterB == 23 && this.counter == 0 && this.counterA == 1){
      this.counter = 24
   }
   if(this.counterB == 22 && this.counter == 23 && this.counterA == 0){
      this.counterA = 24
   }
   this.counter--;
   this.counterB--;
   this.counterA--;
   this.hour = this.hours[this.counter];
   this.beforeH = this.hours[this.counterB];
   this.afterH = this.hours[this.counterA];
 }

 increment(){

   this.showOpenFrom = true; //muestra la hora bindeada antes de ser seleccionada
   //muestra la hora bindeada antes de ser seleccionada pero ANTES 
   (this.openSelected) ? this.showTo = true : ''

      if(this.counterB == 21 && this.counter == 22 && this.counterA == 23){
         this.counterA = -1
      }
      if(this.counterB == 22 && this.counter == 23 && this.counterA == 0){
         this.counter = -1
      }
      if(this.counterB == 23 && this.counter == 0 && this.counterA == 1){
         this.counterB = -1
      }
      this.counter++;
      this.counterB++;
      this.counterA++;
      this.hour = this.hours[this.counter];
      this.beforeH = this.hours[this.counterB];
      this.afterH = this.hours[this.counterA];
 }

 ngOnInit(): void {


   this.typeHour = this.authService.typeHour; // le paso al dialog del openingHour el tipo de edicion de hora de atencion
   this.authService.closeEditHour.subscribe(()=> this.closeComponent())

}

pickUpTime(hour: any, minute: any, type : string){

   let stringHour;
   let stringMin;
   (hour < 10 ) ? stringHour = `0${hour.toString()}` : stringHour = hour;
   (minute < 10 ) ? stringMin = `0${minute.toString()}` : stringMin = minute;
   this.showTimeLabel = false;

   switch (type) {
      case 'openFrom':
                      if(!this.openSelected){ // esa var muestra la hora seleccionada con el DONE
                         this.openSelected = true; // muestra la hora q se selecciono, en vez de la otra bindeada. si esta en TRUE puedo sacar el icono del DONE y queda solo borrar
                         this.timeOpenFrom = `${stringHour}:${stringMin}`; 
                         this.showTo = true
                         this.toSelected = false; // vuelve a mostrar la hora antes de q se seleccione
                      }
         break;
      case 'to':
                     if(!this.toSelected){ // esa var muestra la hora seleccionada con el DONE
                        this.toSelected = true;
                        this.timeTo = `${stringHour}:${stringMin}`; 
                     }
         break;

      default:
         break;
   }
}

deleteTime( type : string ){

   this.beforeH = this.hours[23]; 
   this.hour = this.hours[0]
   this.afterH = this.hours[1]  
   this.counterB = this.hours[23]; 
   this.counter = this.hours[0]
   this.counterA = this.hours[1]

   switch (type) {
      case 'openFrom':
                     (this.showTo) ? [ this.showOpenFrom = false , this.showTo= false ,  this.timeTo = '' ] : this.showOpenFrom = false; // si elimino la primer hora quiero q se borren las dos xq sino queda "hasta", "desde"
                     this.timeOpenFrom = '';
                     this.openSelected = false; // vuelve a mostrar la hor antes de q se seleccione
         break;
      case 'to':
                     this.showTo = false;
                     this.timeTo = ''
                     this.toSelected = false; // vuelve a mostrar la hor antes de q se seleccione
         break;

      default:
         break;
   }
  
} 

onSave(){
  if(this.timeOpenFrom == '' || this.timeTo == '' || this.day.length == 0 ){
   this.showDayLabel = true;
   this.showTimeLabel = true;
   this.noDays = true;
   return;
 }
 this.confirm = true;
 this.noDays = false;
 this.openDialogSuccesHour();
   // // this.authService.typeHourSelected.emit('noonHour');
   this.authService.selectedHour.emit({ timeOpenFrom : this.timeOpenFrom , timeTo : this.timeTo , days: this.day} );

}

closeComponent(){
   setTimeout(()=>{
     this.dialogRef.close();
   },500)
}

openDialogSuccesHour() {
   this.dialog.open(SuccessHoursComponent, {
     data: {msg: "Hora creada "},
     panelClass:"custom-modalbox-NoMoreComponent", 
   });
}

deleteDay( day : number){

   let tempIndex;
   tempIndex = this.day.findIndex( item => item == day );
   if(tempIndex != -1) {
      this.day.splice(tempIndex, 1)
   }
}

selectedDay(day : string){

   this.noDays = false;
   let isDay: any = [];
   switch (day) {
      case 'Dom':
                     this.sunday = !this.sunday;
                     isDay = this.day.indexOf(0);
                     (isDay == -1) ? this.day.push(0) : '';
                     (!this.sunday) ? this.deleteDay(0) : '' 
         break;

      case 'Lun':
                     this.monday = !this.monday;
                     isDay = this.day.indexOf(1);
                     (isDay == -1) ? this.day.push(1) : '';
                     (!this.monday) ? this.deleteDay(1) : '' 
         break;

      case 'Mar':
                     this.tuesday = !this.tuesday;
                     isDay = this.day.indexOf(2);
                     (isDay == -1) ? this.day.push(2) : '';
                     (!this.tuesday) ? this.deleteDay(2) : '' 
         break;

      case 'Mie':
                     this.wednesday = !this.wednesday;
                     isDay = this.day.indexOf(3);
                     (isDay == -1) ? this.day.push(3) : '';
                     (!this.wednesday) ? this.deleteDay(3) : '' 
         break;

      case 'Jue':
                     this.thursday = !this.thursday;
                     isDay = this.day.indexOf(4);
                     (isDay == -1) ? this.day.push(4) : '';
                     (!this.thursday) ? this.deleteDay(4) : '' 
         break;

      case 'Vie':
                     this.friday = !this.friday;
                     isDay = this.day.indexOf(5);
                     (isDay == -1) ? this.day.push(5) : '';
                     (!this.friday) ? this.deleteDay(5) : '' 
         break;

      case 'Sab':
                     this.saturday = !this.saturday;
                     isDay = this.day.indexOf(6);
                     (isDay == -1) ? this.day.push(6) : '';
                     (!this.saturday) ? this.deleteDay(6) : '' 
            break;

      default:
         break;
   }

}

}
