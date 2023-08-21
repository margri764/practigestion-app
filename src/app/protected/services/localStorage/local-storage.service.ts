import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as articleAction from 'src/app/article.actions'
import { getDataLS, saveDataLS } from '../../Storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor(private store: Store<AppState>) {
  }

   loadInitialState() {
    const storedState = getDataLS("arrArticles");
    if (storedState) {
      this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: storedState }));
    }
  }

  saveStateToLocalStorage(dataToSave: any, keyLStorage : string) {
    saveDataLS(keyLStorage, dataToSave);
  }
}