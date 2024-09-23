import { Action, createReducer, on } from '@ngrx/store';
import {
  loadFilteredData,
  loadFilteredDataFailure,
  loadFilteredDataSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './root.action';

export interface StateDataType {
  arrayVal: any;
  process: boolean;
  error: boolean;
  filterData: any;
}

export const initialState: StateDataType = {
  arrayVal: null,
  process: false,
  error: false,
  filterData: null,
};

export function rootReducer(state: any, action: Action) {
  return _rootReducer(state, action);
}
export function filterReducer(state: any, action: Action) {
  return _filterReducer(state, action);
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

const _filterReducer = createReducer(
  initialState,
  on(loadFilteredData, (state) => {
    return {
      ...state,
      filterData: null,
      process: true,
      error: false,
    };
  }),
  on(loadFilteredDataSuccess, (state, { filterDataArray }) => {
    return {
      ...state,
      filterData: filterDataArray,
      process: true,
      error: false,
    };
  }),
  on(loadFilteredDataFailure, (state, { error }) => {
    return {
      ...state,
      filterData: null,
      process: false,
      error: error,
    };
  })
);
