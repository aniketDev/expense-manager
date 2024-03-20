import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from './slices';

const rootReducer = combineSlices(counterSlice);

export const store = configureStore({
  reducer: rootReducer,
});
