import { Component, OnInit } from '@angular/core';
import { AuthService } from './protected/services/auth/auth.service';
import { Router } from '@angular/router';
import { AppState } from './app.reducer';
import { OrderService } from './protected/services/order/order.service';
import { Store } from '@ngrx/store';
import * as articleActions from './article.actions';
import { LocalStorageService } from './protected/services/localStorage/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'practigestion-app';

  constructor(
              private localStorageService: LocalStorageService
  ){

  }

  ngOnInit(): void {
    this.localStorageService.loadInitialState()
  }


}
