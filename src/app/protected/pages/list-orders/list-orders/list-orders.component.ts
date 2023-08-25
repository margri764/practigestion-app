import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Pedido } from 'src/app/protected/interfaces/orders-posted';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { WorkerService } from 'src/app/protected/services/worker/worker.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: any) {
  //    console.log('d');
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {

  //     this.loadOrders();
  //   }
  // }

  @HostListener('window:scroll') onScroll(e: Event): void {
    console.log('dddd');
    const scrollPosition = window.innerHeight + window.scrollY;
    const contentHeight = document.body.offsetHeight;
    if (scrollPosition >= contentHeight - 100 && !this.isLoading) {
      this.loadOrders();
    }
    // (this.getYPosition(e) >= 5 && this.getYPosition(e) ) ? this.scroll = true : this.scroll = false;
 }

    panelOpenState = false;

    arrOrders : Pedido [] = [];
    isLoading : boolean = false;
    currentPage: number = 1;
    itemsPerPage: number = 10; // Cambia según tus necesidades

    // showDelay = new FormControl(100);
  constructor(
              private articleService : ArticlesService,
              private workerService: WorkerService
  ) { }

  ngOnInit(): void {

    this.loadOrders();
    // this.isLoading = true;
    // this.articleService.getAllOrders().subscribe(
    //   ({Pedidos})=>{
    //     if(Pedidos.length !== 0){
    //       console.log(Pedidos);
    //       this.arrOrders = Pedidos;
    //       this.isLoading = false;
    //     }
    //   })
  }

  loadOrders() {
    console.log('Cargando más pedidos...');
    this.isLoading = true;
    this.articleService.getAllOrders().subscribe(({ Pedidos }) => {
      if (Pedidos.length !== 0) {
        this.arrOrders = [...this.arrOrders, ...Pedidos];
        this.isLoading = false;
        this.currentPage++;
      }
    });
  }


  calculateTotal(detalleItems: any[]): number {
    return detalleItems.reduce((total, item) => total + item.importeNetoTotal, 0);
  }


  styleObject(status : string) : object  {
 
    if(status === "E"){
      return {'color':'green'};
    }
    if(status === "A"){
      return {'color':'red'};
    }
      return {'color':'black'};
  }
  
}
