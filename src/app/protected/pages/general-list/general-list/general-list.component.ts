import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PriceList } from 'src/app/protected/interfaces/list.interface';
import { LoadingComponent } from 'src/app/protected/messages/loading/loading/loading.component';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';
import { ErrorService } from 'src/app/protected/services/error/error.service';

@Component({
  selector: 'app-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss']
})
export class GeneralListComponent implements OnInit {

  isLoading : boolean = false;
  arrList : PriceList [] = [];
  constructor(
              private articleService : ArticlesService,
              private errorService : ErrorService,
              private dialog : MatDialog,
  ) { }

  ngOnInit(): void {

    // this.errorService.isLoading$.subscribe(  (emitted)=>{if(emitted)this.openDialogLoading()})
    this.getAllTruePriceList();
  }

  getAllTruePriceList(){
    // this.isLoading = true;
    this.openDialogLoading();
    this.articleService.getAllTruePriceList().subscribe(
      ({listas})=>{
        console.log(listas);
        this.arrList = listas;
        this.isLoading = false;
        this.errorService.isLoading$.next(true);
        
        
      })
  }
openDialogLoading(){
  this.dialog.open(LoadingComponent,{
    disableClose: true,
    panelClass:"custom-modalbox-transparent",
    })
}

}
