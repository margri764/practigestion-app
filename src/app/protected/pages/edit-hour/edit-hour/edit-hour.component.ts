import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { OpeningEditHoursComponent } from 'src/app/protected/messages/opening-edit-hours/opening-edit-hours/opening-edit-hours.component';
import { OpeningHoursComponent } from 'src/app/protected/messages/opening-hours/opening-hours/opening-hours.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-edit-hour',
  templateUrl: './edit-hour.component.html',
  styleUrls: ['./edit-hour.component.scss']
})
export class EditHourComponent implements OnInit {

 @ViewChild(MatAccordion)  accordion!: MatAccordion;
@ViewChild('hour') hour!: ElementRef;


 noonHour : String = '';
 nightHour : String = '';
 rate : any[] = [];
 checked : boolean = false;
 isLoading : boolean = false;
 isSelected: any;
 rButton : boolean = false;
 tooglePrice : boolean = false;

 // ripples
 centered = false;
 disabledNoon = false;
 disabled = false;
 unbounded = false;
 color = '';
 radius!: number;
//   ripples


  constructor(
              private productService : ProductsService,
              private authService : AuthService,
              private dialog : MatDialog
  ) { }

  ngOnInit(): void {

    // me suscribo a lo q se emita desde el menu de edit-food, pongo el "else" para q se cierre cuando no esta seleccionado
    this.productService.price.subscribe( 
      ( option ) => {
        if(option == "openingHours"){
          this.accordion.openAll();
        }else{
          this.accordion.closeAll();
        }});

        // cuando se edita la hora en el opening-edit-hour, este componente vuelve a disparar el estado
    this.authService.editHourfired.subscribe(()=>{
      this.authService.getAppState().subscribe(
        ( res ) => {
          if(res.app.hourRate.length != 0 || res.app.hourRate != undefined){
            this.getTimeFromBack(res);
           } 
            })  
    })   

    this.authService.getAppState().subscribe(
       ( res ) => {
         if(res.app.hourRate.length != 0 || res.app.hourRate != undefined){
           this.getTimeFromBack(res);
         } 
              })  
    this.authService.selectedHour.subscribe( (time)=>{this.createHourlyRate(time) } ) // viene del openingHour como la hora editada

}

editHour( value : string ){
  this.dialog.open(OpeningEditHoursComponent, {
    data: value,
    panelClass:"custom-modalbox-hour",
  });

}

addHourly(  ){
  this.dialog.open(OpeningHoursComponent, {
    // data: value,
    panelClass:"custom-modalbox-hour",
  });

}

getTimeFromBack(time : any){
  this.rate = time.app.hourRate;
}



  // este metodo toma la hora desde el dialog de edicion 
createHourlyRate(time : any){ 

   let { timeOpenFrom, timeTo, days} = time;
console.log(days);
   const body = {
            hour: `${timeOpenFrom} - ${timeTo}`,
            status :  true,
            days
          }
   console.log(body);
   this.authService.createHourlyRate(body).subscribe(
    (res)=>{
      this.rate = res.updatedApp.hourRate;
      this.isLoading = false;             

    });
}

selectCheckHour( hour : any){

      hour.status = !hour.status;
      this.rate.forEach( (h:any) => {h.isSelected = (h === hour)});
      this.isSelected = hour;

      const body = {
                      id : hour._id,
                      hour : hour.hour,
                      status : hour.status,
                      days : hour.days
                    }
      this.isLoading = true;             
      this.authService.updateHourlyRateById (body).subscribe( 
        (res)=>{
          this.rate = res.updatedApp.hourRate;
          this.isLoading = false;             

        });

}

editRate(){
    this.rButton = !this.rButton;
}

deleteRate( id : string){
    this.authService.deleteHourlyRateById(id).subscribe(
      (res)=>{
              if(res.success){
                this.rate = res.updatedApp.hourRate;
                this.rButton = false;
              }
      })

}

resets(){
   this.accordion.closeAll();
}

  

}
