import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { membersSlice } from './slices';

const rootReducer = combineSlices(membersSlice);

export const store = configureStore({
  reducer: rootReducer,
});
