import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';

@Component({
  selector: 'app-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss']
})
export class GeneralListComponent implements OnInit {

  isLoading : boolean = false;
  constructor(
              private articleService : ArticlesService
  ) { }

  ngOnInit(): void {

    this.getAllTruePriceList();
  }

  getAllTruePriceList(){
    this.isLoading = true;
    this.articleService.getAllTruePriceList().subscribe(
      (res)=>{
        console.log(res);
        this.isLoading = false;
        
      })
  }


}
