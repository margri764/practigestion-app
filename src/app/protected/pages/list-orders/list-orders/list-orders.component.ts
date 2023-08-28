import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
      // this.loadOrders();
    }
 }

    panelOpenState = false;

    arrOrders : Pedido [] = [];
    isLoading : boolean = false;
    currentPage: number = 1;
    itemsPerPage: number = 10; // Cambia según tus necesidades
    phone : boolean = false;

    // table
    displayedColumns: string[] = ['id','socialName','items'];
    dataTableActive : any = new MatTableDataSource<any>();
    // paginator
    length = 50;
    pageSize = 10;
    pageIndex = 1;
    pageSizeOptions = [5, 10, 25];
    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;
    pageEvent!: PageEvent;

    // paginator
    

  constructor(
              private articleService : ArticlesService,
              private workerService: WorkerService
  ) { 
    (screen.width <= 800) ? this.phone = true : this.phone = false;

  }

  ngOnInit(): void {

    this.getInitialOrders();
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

  getInitialOrders(){
    this.isLoading = true;
    // this.dataTableActive = this.articleService.getOrdersPaginator(this.pageIndex, this.pageSize,)

    this.articleService.getOrdersPaginator(this.pageIndex, this.pageSize).subscribe(
      ({Pedidos})=>{
        this.arrOrders = Pedidos;
        this.dataTableActive = Pedidos;
        this.isLoading = false
      })
  }

  // loadOrders() {
  //   console.log('Cargando más pedidos...');
  //   this.isLoading = true;
  //   this.articleService.getAllOrders().subscribe(({ Pedidos }) => {
  //     if (Pedidos.length !== 0) {
  //       this.arrOrders = [...this.arrOrders, ...Pedidos];
  //       this.isLoading = false;
  //       this.currentPage++;
  //     }
  //   });
  // }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  
      this.length,
      this.pageSize, 
      this.pageIndex;
      this.isLoading= true;
      // this.dataTableActive = this.articleService.getOrdersPaginator(this.pageIndex, this.pageSize,)
      
      this.articleService.getOrdersPaginator(this.pageIndex, this.pageSize,).subscribe(
        ({Pedidos})=>{
          this.arrOrders = Pedidos;
          this.dataTableActive = Pedidos;
          this.isLoading = false
        })
  }
  
  

  editOrder(order:any){

  }

  deleteOrder(order:any){

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
