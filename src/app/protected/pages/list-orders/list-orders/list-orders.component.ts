import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/protected/interfaces/orders-posted';
import { EditOrderComponent } from 'src/app/protected/messages/edit-order/edit-order/edit-order.component';
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
    
    myForm! : FormGroup;
    myForm2! : FormGroup;
    send :  boolean = false;
    order : any;
    salePoint : any;
    showOrderFounded : boolean = false;




  constructor(
              private fb : FormBuilder,
              private articleService : ArticlesService,
              private dialog : MatDialog,
              private workerService: WorkerService,

  ) { 
    (screen.width <= 800) ? this.phone = true : this.phone = false;

  }

  ngOnInit(): void {
   
    // despues de editar el pedido balaqueo todo 
      this.articleService.initialStateAfterEditOrder$.subscribe((emitted)=>{
          if(emitted){
                this.arrOrders = [];
                // this.isLoading = false;
                this.myForm.reset();
                this.myForm2.reset();
                this.showOrderFounded = false;
                this.order = {};
        }});

      this.myForm = this.fb.group({
        ptoVenta1:  [ '',[Validators.required]],
      });   

      this.myForm2 = this.fb.group({
        ptoVenta2:  [ '',[Validators.required]],
        nroOrder:  [ '',[Validators.required]],
      });   
  }

  getInitialOrders(){
    this.isLoading = true;
    this.showOrderFounded = false;
    this.arrOrders = [];
    // this.dataTableActive = this.articleService.getOrdersPaginator(this.pageIndex, this.pageSize,)

    this.articleService.getOrdersPaginator(this.pageIndex, this.pageSize).subscribe(
      ({Pedidos})=>{
        this.arrOrders = Pedidos;
        this.isLoading = false;
        this.myForm.reset();
        this.myForm2.reset();
      })
  }

  selectSalePoint(){

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
      this.isLoading = true;
      this.arrOrders = [];
      this.showOrderFounded = false;

      const ptoVenta = this.myForm.get('ptoVenta1')?.value;

      this.articleService.getOrdersByPtoVenta(ptoVenta).subscribe(
        ({pedidos})=>{
          if(pedidos.length !== 0){
            this.arrOrders = pedidos;
            this.isLoading = false;
            this.myForm.reset();
          }
        })
   }

   getSalePointByNumOrder(){

    if ( this.myForm2.invalid ) {
      this.myForm2.markAllAsTouched();
      return;
    }
    this.showOrderFounded = false;
    this.isLoading = true;
    this.arrOrders = [];
    const ptoVenta2 = this.myForm2.get('ptoVenta2')?.value;
    const nroOrder = this.myForm2.get('nroOrder')?.value;

    this.articleService.getSalePointByNumOrder(ptoVenta2, nroOrder).subscribe(
      ({Pedido})=>{
        if(Pedido){
          this.isLoading = false;
          this.order = Pedido;
          this.myForm2.reset();
          this.showOrderFounded = true;
        }
      })

   }
 

  loadOrders() {
    this.isLoading= true;
    this.articleService.getOrdersPaginator(this.pageIndex, this.pageSize,).subscribe(
    ({pedidos})=>{
      this.arrOrders = pedidos;
      this.isLoading = false
    })
  }

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
        ({pedidos})=>{
          this.arrOrders = pedidos;
          this.isLoading = false
        })
  }
  
  

  editOrder(order: any){

    console.log(order);
    let width : string = '';
    let height : string = '';

    if(screen.width >= 800) {
      width = "900px"
      height ="500px";
    }

    this.dialog.open(EditOrderComponent, {
      data: order,
      width: `${width}`|| "",
      height:`${height}`|| "",
      panelClass:"custom-modalbox-edit", 
    });

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
  
  close(){

  }
}
