import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Product Page] Load Products');

export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: any }>()
);

export const loadProductsFailure = createAction(
  '[Product API] Load Products Failure',
  props<{ error: boolean }>()
);
