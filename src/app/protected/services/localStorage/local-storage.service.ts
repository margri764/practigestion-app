import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as articleAction from 'src/app/article.actions'
import { getDataLS, getDataSS, saveDataLS, saveDataSS } from '../../Storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor(private store: Store<AppState>) {
  }

   loadInitialState() {
    // const storedState = getDataLS("arrArticles");
    const storedState = getDataSS("arrArticles");
    const tempOrder = getDataLS("tempOrder");
    if (storedState) {
      this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: storedState }));
    }
    if (tempOrder) {
      this.store.dispatch(articleAction.setTempOrder({ tempOrder: tempOrder }));
    }
  }

  saveStateToLocalStorage(dataToSave: any, keyLStorage : string) {
    saveDataLS(keyLStorage, dataToSave);
  }

  saveStateToSessionStorage(dataToSave: any, keyLStorage : string) {
    saveDataSS(keyLStorage, dataToSave);
  }


}