
import { AfterViewChecked, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SuccessHoursComponent } from '../../success-hours/success-hours/success-hours.component';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-edit-hours.component.html',
  styleUrls: ['./opening-edit-hours.component.scss']
})

export class OpeningEditHoursComponent implements OnInit, AfterViewChecked {

 @ViewChild ('top', {static: false} ) top! : ElementRef;

// ripplespopen
  centered = false;
  disabled = false;
  unbounded = false;
  radius!: number;
  color: string = '';
  element : any;

  hours = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  min = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
  
// start var clock
  beforeH : number = 23; 
  hour : number= 0;
  afterH : number = 1;  

  counterB! : number; 
  counter! : number;
  counterA! : number;  

  beforeM : number = 59; 
  minute : number = 0;
  afterM : number = 1;
// end var clock

// var para mostrar el DESDE
 hourBeginning! : number;
 minuteBeginning! : number;

 // para saber a quien esta decrementando el incrementando el reloj
 isTimeOpenFrom : boolean = false;
 isTimeTo       : boolean = false;

  counterBM! : number; 
  counterM! : number;
  counterAM! : number;  

  beforeHEnd! : number; 
  hourEnd! : number;
  afterHEnd! : number;  

  counterBEnd! : number; 
  counterEnd! : number;
  counterAEnd! : number;  

  beforeMEnd! : number; 
  minuteEnd! : number;
  afterMEnd! : number;  

  counterBMEnd! : number; 
  counterMend! : number;
  counterAMEnd! : number;  
  counterMEnd! : number;

  sunday : boolean = false;
  monday : boolean = false;
  tuesday : boolean = false;
  wednesday : boolean = false;
  thursday : boolean = false;
  friday : boolean = false;
  saturday : boolean = false;
  day: any []= [];
  confirm : boolean = false;
  hourId : string = '';

  timeOpenFrom : string = ''; // muestro o no el DONE
  timeTo : string = '';

  typeHour : string = ''; // muestro q tipo de hora es 
  timeFromBack : string = '';
  
  constructor(
               private authService : AuthService,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private dialog : MatDialog,
               private dialogRef : MatDialogRef<OpeningEditHoursComponent>

  ) {
    
   }
   ngAfterViewChecked(): void {
      this.goToTop();
   }
 
 decrementM(){

   // para q no se pueda hacer nada en el reloj hasta q no se seleccione DESDE o HASTA
   if( this.isTimeOpenFrom === false && this.isTimeTo === false){
      return
   }

   if(this.counterBM == 0 && this.counterM == 1 && this.counterAM == 2){
      this.counterBM = 60
   }

   if(this.counterBM == 59 && this.counterM == 0 && this.counterAM == 1){
      this.counterM = 60
   }

   if(this.counterBM == 58 && this.counterM == 59 && this.counterAM == 0){
      this.counterAM = 60
   }

   //  inicio
   this.counterM--;
   this.counterBM--;
   this.counterAM--;
   this.beforeM = this.min[this.counterBM];
   this.minute = this.min[this.counterM]; // para q el reloj se actualice
   this.afterM = this.min[this.counterAM];
   
   // para bindear con min DESDE cuando decremento min en el reloj
   (this.isTimeOpenFrom) ?  this.minuteBeginning = this.min[this.counterM] : this.minuteEnd = this.min[this.counterM]

   // son los minutos seleccionados despues de la edicion
   console.log(this.minuteBeginning);
   console.log(this.minuteEnd);

 }

 incrementM(){

      // para q no se pueda hacer nada en el reloj hasta q no se seleccione DESDE o HASTA
      if( this.isTimeOpenFrom === false && this.isTimeTo === false){
         return
      }

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
      this.beforeM = this.min[this.counterBM];
      this.minute = this.min[this.counterM];
      this.afterM = this.min[this.counterAM];
      // para bindear los increment y decrement del reloj con DESDE o HASTA
      (this.isTimeOpenFrom) ?   this.minuteBeginning = this.min[this.counterM] : this.minuteEnd = this.min[this.counterM]

 }

 decrement(){
   
     // para q no se pueda hacer nada en el reloj hasta q no se seleccione DESDE o HASTA
   if( this.isTimeOpenFrom === false && this.isTimeTo === false){
      return
   }
 
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

   // para bindear los increment y decrement del reloj con DESDE o HASTA
  (this.isTimeOpenFrom) ? this.hourBeginning = this.hours[this.counter] : this.hourEnd = this.hours[this.counter]
 }

 increment(){

   // para q no se pueda hacer nada en el reloj hasta q no se seleccione DESDE o HASTA
   if( this.isTimeOpenFrom === false && this.isTimeTo === false){
      return
   }

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
   // para bindear los increment y decrement del reloj con DESDE o HASTA
   (this.isTimeOpenFrom) ? this.hourBeginning = this.hours[this.counter] : this.hourEnd = this.hours[this.counter]
 }

 setInitOpenEndHours(data : any){

   if (typeof data.hour === 'string' && data.hour.includes('-')) {

         //  el reloj obtiene sus valores iniciales desde el init de las var
         let beginning;
         let end;
         let tempRate;

         // horas y min q aparecen en DESDE
         tempRate = data.hour.split('-')
         beginning = tempRate[0];
         beginning = beginning.split(":")
         this.hourBeginning = parseInt(beginning[0]);
         this.minuteBeginning = parseInt(beginning[1]);
         
            //esta es la hora de fin "  - 12:00"
         end = tempRate[1];
         end = end.split(":")
         this.hourEnd = parseInt(end[0]);
         this.minuteEnd = parseInt(end[1]);
   }else{
      console.error('Error: data.hour debe tener el formato "horaInicio-horaFin".');
   }
}

ngOnInit(): void {
      this.setInitOpenEndHours(this.data);
      setTimeout(()=>{
         this.day = this.data.days;
      }, 100)

      if (this.day.length > 0) {
         this.setInitialDays();
       }
      this.hourId = this.data._id;
      this.authService.closeEditHour.subscribe(()=> this.closeComponent())

}

setInitialDays() {
   if (Array.isArray(this.day)) {
     const dayNames = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
     this.day.forEach(day => {
       const dayName = dayNames[day];
       this.selectedDay(dayName);
     });
   } else {
     console.error('Error: this.day debe ser una matriz.');
     // Manejar el error o asignar un valor predeterminado según corresponda
   }
 }

setTimeTo(){

   let end;
   let tempRate;
 
   // esta es la hora  HASTA " -16:00" (to)
   tempRate = this.data.hour.split('-')
   end = tempRate[1];
   end = end.split(":")
   let endHour = parseInt(end[0]);
   let endMin  = parseInt(end[1]);

  // hora para el reloj cuando selecciono HASTA
  (endHour === 0 ) ?  this.beforeH = 23 : this.beforeH = this.hours[endHour - 1];
  this.hour = this.hours[endHour];
  (endHour === 23 ) ?  this.afterH = 0 : this.afterH = this.hours[endHour + 1];

  // set para horas contadores del reloj
  (endHour === 0 ) ?  this.counterB = 23 : this.counterB = this.hours[endHour - 1];
  this.counter  = this.hours[endHour];
  (endHour === 23 ) ?  this.counterA = 0 : this.counterA = this.hours[endHour + 1];

   // min para el reloj cuando selecciono HASTA
  (endMin === 0 ) ?  this.beforeM = 59 : this.beforeM  = this.min[endMin - 1];
  this.minute   = this.min[endMin];
  (endMin === 59 ) ?  this.afterM = 0 : this.afterM = this.min[endMin + 1];
  
  // set para minutos contadores del reloj
  (endMin === 0 ) ?  this.counterBM = 59 : this.counterBM  = this.min[endMin - 1];
  this.counterM  = this.min[endMin];
  (endMin === 59 ) ?  this.counterAM = 0 : this.counterAM = this.min[endMin + 1];

}

setTimeOpenFrom(){
  
   /* los valores iniciales para "Desde: " son los q vienen del edit-hour, la idea seria q cuando se apriete el icono de edit, el reloj obtenga esos valores */

   let beginning;
   let tempRate;
 
   //esta es la hora  DESDE "10:00 -" (timeOpenFrom)
   tempRate = this.data.hour.split('-')
   beginning = tempRate[0];
   beginning = beginning.split(":")
   let beginningHour = parseInt(beginning[0]);
   let beginningMin = parseInt(beginning[1]);

  // hora para el reloj cuando selecciono DESDE
  (beginningHour === 0 ) ?  this.beforeH = 23 : this.beforeH = this.hours[beginningHour - 1];
  this.hour = this.hours[beginningHour];
  (beginningHour === 23 ) ?  this.afterH = 0 : this.afterH = this.hours[beginningHour + 1];

  // set para horas contadores del reloj
  (beginningHour === 0 ) ?  this.counterB = 23 : this.counterB = this.hours[beginningHour - 1];
  this.counter = this.hours[beginningHour];
  (beginningHour === 23 ) ?  this.counterA = 0 : this.counterA = this.hours[beginningHour + 1];

   // min para el reloj cuando selecciono DESDE
  (beginningMin === 0 ) ?  this.beforeM = 59 : this.beforeM  = this.min[beginningMin - 1];
  this.minute = this.min[beginningMin];
  (beginningMin === 59 ) ?  this.afterM = 0 : this.afterM = this.min[beginningMin + 1];
  
  // set para minutos contadores del reloj
  (beginningMin === 0 ) ?  this.counterBM = 59 : this.counterBM  = this.min[beginningMin - 1];
  this.counterM = this.min[beginningMin];
  (beginningMin === 59 ) ?  this.counterAM = 0 : this.counterAM = this.min[beginningMin + 1];
   
}

pickUpTime( type : string){

   switch (type) {
      case 'openFrom':
                      this.isTimeOpenFrom = !this.isTimeOpenFrom;
                      this.isTimeTo = false;
                      this.setTimeOpenFrom()
         break;
      case 'to':
                      this.isTimeTo = !this.isTimeTo;
                      this.isTimeOpenFrom = false;
                      this.setTimeTo();
         break;

      default:
         break;
   }
}

convertNumberToHour(){

   let stringHourBeginning;
   let stringMinBeginning;
   let stringHourEnd;
   let stringMinEnd;

   (this.hourBeginning < 10 ) ? stringHourBeginning = `0${this.hourBeginning.toString()}` : stringHourBeginning = this.hourBeginning;
   (this.minuteBeginning < 10 ) ? stringMinBeginning = `0${this.minuteBeginning.toString()}` : stringMinBeginning = this.minuteBeginning;
   this.timeOpenFrom = `${stringHourBeginning}:${stringMinBeginning}`; 

   
   (this.hourEnd < 10 ) ? stringHourEnd = `0${this.hourEnd.toString()}` : stringHourEnd = this.hourEnd;
   (this.minuteEnd < 10 ) ? stringMinEnd = `0${this.minuteEnd.toString()}` : stringMinEnd = this.minuteEnd;
   this.timeTo = `${stringHourEnd}:${stringMinEnd}`; 
}

onSave(){

   if( this.day.length == 0 ){
      return;
   }

   this.confirm = true;
   this.convertNumberToHour();

      const body = {
                     id : this.hourId,
                     hour : `${this.timeOpenFrom} - ${this.timeTo}`,
                     status : true,
                     days: this.day
                   }
      this.authService.updateHourlyRateById (body).subscribe( 
        (res)=>{
                 if(res.success){
                  this.authService.editHourfired.emit(); 
                  this.openDialogSuccesHour();
                 }
        });



}

deleteDay( day : number){

   let tempIndex;
   tempIndex = this.day.findIndex( item => item == day );
   if(tempIndex != -1) {
      this.day.splice(tempIndex, 1)
   }
}

closeComponent(){
   setTimeout(()=>{
     this.dialogRef.close();
   },500)
}

selectedDay(day : string){

   console.log(day);
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

openDialogSuccesHour() {
   this.dialog.open(SuccessHoursComponent, {
     data: {msg: "Hora editada "},
     panelClass:"custom-modalbox-NoMoreComponent", 
   });
}

goToTop(){
   this.element = this.top.nativeElement;
   this.element.scrollIntoView(
     { alignToTop: true,
       block: "center",
     });
 } 


}
