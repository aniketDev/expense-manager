import { createSlice } from '@reduxjs/toolkit';
import { addMember, getMembers } from 'store/actions/memberActions';

export const membersSlice = createSlice({
  name: 'members',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addMember.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});
export default membersSlice.reducer;
