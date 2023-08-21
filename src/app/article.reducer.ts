import { Action, createReducer, on } from '@ngrx/store';
import { deleteArticle, editArticle, setArticles, setSelectedArticles, unSetArticles, unSetSelectedArticles } from './article.actions';
import { Articulo } from './protected/interfaces/articulo.interface';



export interface Article {

       articlesArray : Articulo [] ;
       arrSelectedArticles : any [] ;
       article :  any
}

export const initialState: Article = {
        articlesArray : [],
        arrSelectedArticles : [],
        article : null

}

const _articleReducer = createReducer(initialState,

    on(setArticles, (state, { arrArticles }) => ({ ...state, articlesArray: arrArticles })),
    on(unSetArticles, (state) => ({ ...state, articlesArray: [] })),

    on(editArticle, (state, { article }) => ({
        ...state,
        arrSelectedArticles: state.arrSelectedArticles.map(item => {
          if (item.id === article.id) {
            // Actualiza el artículo con los cambios
            return { ...item, ...article }; // Usa el contenido completo de 'article'
          }
          return item; // Devuelve el artículo sin cambios si no coincide el ID
        })
      })),

      on(deleteArticle, (state, { articleId }) => {
        let updatedArticles = state.arrSelectedArticles.filter(item => item.id !== articleId);
        return { ...state, arrSelectedArticles: updatedArticles };
    }),


    on(setSelectedArticles, (state, { arrSelectedArticles }) => ({ ...state, arrSelectedArticles: arrSelectedArticles })),
    on(unSetSelectedArticles, (state) => ({ ...state, arrSelectedArticles: [] })),
    
);

export function articleReducer(state: Article | undefined, action: Action) {
    return _articleReducer(state, action);
}