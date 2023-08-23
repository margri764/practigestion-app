import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { articlePrice } from 'src/app/protected/interfaces/list.interface';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { ErrorService } from 'src/app/protected/services/error/error.service';


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
             private errorService : ErrorService
             
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
close(){
  this.errorService.close$.next(true);
  this.errorService.close$.next(false);
}
}
