import { createAction, props } from '@ngrx/store';
import { DetalleItem } from './protected/interfaces/order.interface';
import { Articulo } from './protected/interfaces/articulo.interface';

/************************** SET *******************************/
export const setArticles = createAction('[Articles] setArticles',
    props<{ arrArticles :  Articulo [] }>());

export const setSelectedArticles = createAction('[Articles] setSelectedArticles',
props<{ arrSelectedArticles : DetalleItem [] }>());


/************************** UNSET *******************************/
export const unSetArticles = createAction('[Articles] unSetArticles');
export const unSetSelectedArticles = createAction('[Articles] unSetSelectedArticles');