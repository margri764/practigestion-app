import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './protected/pages/login/login/login.component';
import { ClientComponent } from './protected/pages/client/client/client.component';
import { DashboardComponent } from './protected/pages/dashboard/dashboard.component';
import { OrderComponent } from './protected/pages/order/order/order.component';
import { ArticlesComponent } from './protected/pages/articles/articles/articles.component';
import { ViewMoreArticleComponent } from './protected/pages/view-more-article/view-more-article/view-more-article.component';
import { WrongActionMessageComponent } from './protected/messages/wrong-action-message/wrong-action-message/wrong-action-message.component';
import { GenericSuccessComponent } from './protected/messages/generic-success/generic-success/generic-success.component';
import { PickClientMessageComponent } from './protected/messages/pick-client-message/pick-client-message/pick-client-message.component';
import { SelectArticleMessageComponent } from './protected/messages/select-article-message/select-article-message/select-article-message.component';
import { SearchProductsComponent } from './protected/pages/searchProducts/search-products/search-products.component';
import { TempOrderComponent } from './protected/pages/temp-order/temp-order/temp-order.component';
import { EditClientComponent } from './protected/pages/edit-client/edit-client/edit-client.component';
import { NewClientComponent } from './protected/pages/new-client/new-client/new-client.component';
import { EditArticleComponent } from './protected/pages/edit-article/edit-article/edit-article.component';
import { ListPriceHomeComponent } from './protected/pages/list-price-home/list-price-home/list-price-home.component';
import { GeneralListComponent } from './protected/pages/general-list/general-list/general-list.component';
import { LoginMessageComponent } from './protected/messages/login-message/login-message/login-message.component';
import { LoadingComponent } from './protected/messages/loading/loading/loading.component';


// services
import { InterceptorService } from './protected/services/interceptor/interceptor.service';
import { LocalStorageService } from './protected/services/localStorage/local-storage.service';


//ngrx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effect';

// pipes
import { CapitalizeFirstLetterPipe } from './protected/pipes/CapitalizeFirstLetterPipe';
import { ProductStatusPipe } from './protected/pipes/productStatus.pipe';

//idioma de la app
import localeEs from '@angular/common/locales/es-AR'; //nombre inventado el AR es por Argentina
import { registerLocaleData } from '@angular/common';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrderComponent,
    ClientComponent,
    LoginComponent,
    ArticlesComponent,
    ViewMoreArticleComponent,
    PickClientMessageComponent,
    CapitalizeFirstLetterPipe,
    SelectArticleMessageComponent,
    ProductStatusPipe,
    WrongActionMessageComponent,
    GenericSuccessComponent,
    SearchProductsComponent,
    TempOrderComponent,
    EditClientComponent,
    NewClientComponent,
    EditArticleComponent,
    ListPriceHomeComponent,
    GeneralListComponent,
    LoginMessageComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    environment.imports,
    EffectsModule.forRoot([AuthEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
  
      },
      LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
