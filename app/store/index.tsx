import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { membersSlice } from './slices';

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;
const rootReducer = combineSlices(membersSlice);

export const store = configureStore({
  reducer: rootReducer,
});
