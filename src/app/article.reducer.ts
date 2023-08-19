import { Action, createReducer, on } from '@ngrx/store';
import { setArticles, unSetArticles } from './article.actions';
import { Articulo } from './protected/interfaces/articulo.interface';



export interface Article {

       articlesArray : Articulo [] ;
    // staff: Staff | null; 
    // verifyAccount : boolean,
    // path : string,
    // banner : boolean,
    // userRegister: any | null,
    // body : any,
    // id : string | null,
    // address : string | null,
    // delivery : string | null,
    // favorite : boolean;
    // arrItems: [] | null,
    // isLoading: boolean,
    // appState : any


    // el body tendria q ser de tipo user o register no se

}

export const initialState: Article = {
    articlesArray : [],

    //  staff: null,
    //  verifyAccount: false,
    //  banner : true,
    //  path : '',
    //  body: null,
    //  userRegister: null,
    //  id: null,
    //  address : null,
    //  delivery : null,
    //  favorite : false,
    //  arrItems : null,
    //  isLoading: false,
    //  appState : true

}

const _articleReducer = createReducer(initialState,

    on( setArticles, (state, { arrArticles }) => ({ ...state, articlesArray: { ...arrArticles }  })),
    on( unSetArticles, (state) => ({...state, articlesArray: []}),
    
    )
    
);

export function authReducer(state: Article | undefined, action: Action) {
    return _articleReducer(state, action);
}