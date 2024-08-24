import { MembersState, Members } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addMember, getMembers } from 'store/actions/memberActions';

const initialState: MembersState = {
  data: [],
  isLoading: false,
  error: null,
};

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action: PayloadAction<Members[] | undefined>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown Error';
      })
      .addCase(addMember?.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});
export default membersSlice.reducer;
