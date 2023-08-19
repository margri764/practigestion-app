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


// services
import { InterceptorService } from './protected/services/interceptor/interceptor.service';

//ngrx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effect';

//idioma de la app
import localeEs from '@angular/common/locales/es-AR'; //nombre inventado el AR es por Argentina
import { registerLocaleData } from '@angular/common';
import { environment } from 'src/environments/environment';
import { PickClientMessageComponent } from './protected/messages/pick-client-message/pick-client-message/pick-client-message.component';


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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
