import { configureStore } from "@reduxjs/toolkit";
import countersReducer from "./reducers/counterReducer";

export const store = configureStore({
  reducer: {
    counter: countersReducer,
  },
});
