import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { log } from 'console';
import { articlePrice } from 'src/app/protected/interfaces/list.interface';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';

@Component({
  selector: 'app-list-by-id',
  templateUrl: './list-by-id.component.html',
  styleUrls: ['./list-by-id.component.scss']
})
export class ListByIdComponent implements OnInit {

  arrArticles : articlePrice []=[];
  isLoading : boolean = false;

  constructor(
             @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
             private artcicleService : ArticlesService,
             
  ) { }

  ngOnInit(): void {
    this.getListById(this.data);
  }

  getListById( id : any){

    this.isLoading = true;
    this.artcicleService.getPriceListById(id).subscribe(
      ({precios})=>{
        if(precios.length !== 0){
              console.log(precios);
              this.arrArticles = precios;
              this.isLoading = false;
        }
              
      }
    )
  };

  styleObject(stock : number) : object {
 
    if(stock == 0 || stock < 0){
      return {'color':'red'};
    }else{
      return {'color':'blue'};

    }
    
}
como cerrar este _bottomSheet
close(){
  this.artcicleService.closeBottom
}

}
