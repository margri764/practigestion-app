import { createAction, props } from '@ngrx/store';
import { DetalleItem } from './protected/interfaces/order.interface';
import { Articulo } from './protected/interfaces/articulo.interface';

/************************** SET *******************************/
export const setArticles = createAction('[Articles] setArticles',
    props<{ arrArticles :  Articulo [] }>());

export const setSelectedArticles = createAction('[Articles] setSelectedArticles',
props<{ arrSelectedArticles : DetalleItem [] }>());

export const editArticle = createAction('[Articles] Edit Articles', 
props<{article: any}>());


/************************** UNSET *******************************/
export const unSetArticles = createAction('[Articles] unSetArticles');
export const unSetSelectedArticles = createAction('[Articles] unSetSelectedArticles');
export const deleteArticle = createAction(
    '[Articles] Delete Article',
    props<{ articleId: number }>()
  );