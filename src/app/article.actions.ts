import { createAction, props } from '@ngrx/store';

/************************** SET *******************************/
export const setArticles = createAction(
    '[Articles] setArticles',
    props<{ arrArticles :  [] }>());


/************************** UNSET *******************************/
export const unSetArticles = createAction('[Articles] unSetArticles');