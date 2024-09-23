import { createSelector } from '@ngrx/store';
import { StateDataType } from './root.reducers';
export const selectArray = (state: StateDataType) => state.arrayVal;
export const selectArrayValue = createSelector(
  selectArray,
  (state: StateDataType) => state.arrayVal
);

// FilteredData
export const selectFilterDataArray = (state: StateDataType) => state.filterData;
export const selectFilterDataArrayValue = createSelector(
  selectFilterDataArray,
  (state: any) => state.filterData
);
