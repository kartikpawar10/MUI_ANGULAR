import { Action, createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './root.action';

export interface StateDataType {
  arrayVal: any;
  process: boolean;
  error: boolean;
}

export const initialState: StateDataType = {
  arrayVal: null,
  process: false,
  error: false,
};

export function rootReducer(state: any, action: Action) {
  return _rootReducer(state, action);
}

const _rootReducer = createReducer(
  initialState,
  on(loadProducts, (state) => {
    return {
      ...state,
      process: true,
      arrayVal: null,
      error: false,
    };
  }),
  on(loadProductsSuccess, (state, { products }) => {
    return {
      ...state,
      process: true,
      arrayVal: products,
      error: false,
    };
  }),
  on(loadProductsFailure, (state, { error }) => {
    return {
      ...state,
      process: false,
      arrayVal: null,
      error: error,
    };
  })
);
