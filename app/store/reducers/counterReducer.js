import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {count: 0},
  reducers: {
    increaseCounter(state, action) {
      state.count += 1;
    },
    decreaseCounter(state, action) {
      state.count -= 1;
    }
  }
});

export const { increaseCounter, decreaseCounter } = counterSlice.actions;
export default counterSlice.reducer;
