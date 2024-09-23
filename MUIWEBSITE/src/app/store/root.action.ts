import { createAction, props } from '@ngrx/store';

// Load Product Actions
export const loadProducts = createAction('[Product Page] Load Products');
export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: any }>()
);
export const loadProductsFailure = createAction(
  '[Product API] Load Products Failure',
  props<{ error: boolean }>()
);

// Filtered Data Actions
export const loadFilteredData = createAction(
  '[Product Page] Load FilteredData'
);
export const loadFilteredDataSuccess = createAction(
  '[Product Page] Load FilteredData Success',
  props<{ filterDataArray: any }>()
);
export const loadFilteredDataFailure = createAction(
  '[Product Page] Load FilteredData Failure',
  props<{ error: boolean }>()
);
