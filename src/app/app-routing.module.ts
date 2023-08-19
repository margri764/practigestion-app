import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './protected/pages/dashboard/dashboard.component';
import { OrderComponent } from './protected/pages/order/order/order.component';
import { ClientComponent } from './protected/pages/client/client/client.component';
import { ArticlesComponent } from './protected/pages/articles/articles/articles.component';
import { LoginComponent } from './protected/pages/login/login/login.component';
import { ViewMoreArticleComponent } from './protected/pages/view-more-article/view-more-article/view-more-article.component';


const routes: Routes = [
  
  {
    path: 'armar-pedido',  component: OrderComponent
  },
  {
    path: 'listado-articulos',  component: ArticlesComponent
  },
  {
    path: 'articulo/:id',  component: ViewMoreArticleComponent
  },
  {
    path: 'clientes',  component: ClientComponent
  },
  {
    path: 'login',  component: LoginComponent
  },
  {
    path: 'home',  component: DashboardComponent
  },
 
  {
    path: "", redirectTo: "home", pathMatch: 'full'
  },
  {
    path: '**',    redirectTo: 'home'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
