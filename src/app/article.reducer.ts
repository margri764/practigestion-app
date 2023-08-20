import { Action, createReducer, on } from '@ngrx/store';
import { setArticles, setSelectedArticles, unSetArticles, unSetSelectedArticles } from './article.actions';
import { Articulo } from './protected/interfaces/articulo.interface';
import { DetalleItem } from './protected/interfaces/order.interface';



export interface Article {

       articlesArray : Articulo [] ;
       arrSelectedArticles : DetalleItem [] ;
}

export const initialState: Article = {
    articlesArray : [],
    arrSelectedArticles : [] 

}

const _articleReducer = createReducer(initialState,

    on(setArticles, (state, { arrArticles }) => ({ ...state, articlesArray: arrArticles })),
    on(unSetArticles, (state) => ({ ...state, articlesArray: [] })),
    on(setSelectedArticles, (state, { arrSelectedArticles }) => ({ ...state, arrSelectedArticles: arrSelectedArticles })),
    on(unSetSelectedArticles, (state) => ({ ...state, arrSelectedArticles: [] }))
    
    
);

export function articleReducer(state: Article | undefined, action: Action) {
    return _articleReducer(state, action);
}