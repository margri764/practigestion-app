import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../interfaces/articulo.interface'
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  arrArticles : Articulo[]=[]
  constructor(
              private articleService : ArticlesService
  ) { }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(
      ({articulos})=>{

            if(articulos.length !== 0){

              this.arrArticles = articulos;
              console.log(articulos);

            }
      }
    );
  }


}
