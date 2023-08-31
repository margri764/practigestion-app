import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as articleAction from 'src/app/article.actions'
import * as authAction from 'src/app/auth.actions'
import { getDataLS, getDataSS, saveDataLS, saveDataSS } from '../../Storage';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor(
              private store: Store<AppState>,
              ) {
  }

   loadInitialState() {
    // const storedState = getDataLS("arrArticles");
    const storedState = getDataSS("arrArticles");
    const openOrders = getDataSS("openOrders");
    const user = getDataLS("user");

    if (storedState) {
      this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: storedState }));
    }
    if(openOrders){
      this.store.dispatch(articleAction.setTempOrder({ tempOrder: openOrders }));
    }
    if(user){
      this.store.dispatch(authAction.setUser({ user }));
    }
    // if (tempOrder) {
    //   this.store.dispatch(articleAction.setTempOrder({ tempOrder: tempOrder }));
    // }
  }

  saveStateToLocalStorage(dataToSave: any, keyLStorage : string) {
    saveDataLS(keyLStorage, dataToSave);
  }

  saveStateToSessionStorage(dataToSave: any, keyLStorage : string) {
    saveDataSS(keyLStorage, dataToSave);
  }


}