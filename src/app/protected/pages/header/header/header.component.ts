import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/protected/services/auth/auth.service';
import { ErrorService } from 'src/app/protected/services/error/error.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked{


@Input() url : string =''

  // accordion
  panelOpenState = false;
  showLabelTempOrder : boolean = false;
  articleSuscription!: Subscription;
  alert : string = '';
  toogle : boolean = false;
  @ViewChild(MatAccordion)  accordion!: MatAccordion;
  hidden : boolean = false;
  login : boolean = false;
  // accordion
    
 labelHeader : string = '';
 path : string = '/home';

  constructor(
               private store : Store <AppState>,
               private errorService : ErrorService,
               private cdRef: ChangeDetectorRef,
               private router : Router
              //  private authService : AuthService,
              // private dialog : MatDialog,
              // private cookieService : CookieService
  ) { 
        
          
  }

  ngAfterViewChecked() {
    this.updateLabelHeader(this.url)
    this.cdRef.detectChanges();
  }


  ngOnInit(): void {

    this.articleSuscription = this.store.select('article')
    .pipe(
  
    ).subscribe(({tempOrder})=>{
  
      if(tempOrder.length !==0){
          this.showLabelTempOrder = true;
          this.alert= '!';
      }else{
          this.alert= '';
      }
    })

    
 }

 updateLabelHeader( url : string){

  switch (url) {
    case '/listado-pedidos':
          this.labelHeader = "Pedidos";
      break;
    case '/listado-articulos':
            this.labelHeader = "Artículos";
    break;  

    case '/pedidos-temporales':
         this.labelHeader = "Pedidos Temporales";
    break;  

    case '/listado-clientes':
         this.labelHeader = "Clientes";
    break;  

    case '/listado-precios':
         this.labelHeader = "Listas Precios";
    break;  

    case '/listado-precios/listado':
            this.labelHeader = "Precios";
            this.path = '/listado-precios'
            console.log(this.path);
    break;  


  
    default:  this.labelHeader = "";
    break;
  }

  this.path = url;

 }

 navigate(){

   if(this.path === '/listado-precios/listado'){
     this.router.navigateByUrl('/listado-precios')
    }else{
      this.router.navigateByUrl('/home')
    }
 }

 visibility(){
  this.toogle = !this.toogle;
}

logout(){
  alert("solucionar el logout desde el back")
  this.errorService.logout().subscribe()
}

}
