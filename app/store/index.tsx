import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { membersReducer } from './slices';
import { setupListeners } from '@reduxjs/toolkit/query';
import { GroupsApi } from './apis/groupsApi';

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;
// const rootReducer = combineSlices(membersSlice);

export const store = configureStore({
  reducer: {
    members: membersReducer,
    [GroupsApi.reducerPath]: GroupsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(GroupsApi.middleware);
  },
});

setupListeners(store.dispatch);
