import { MembersState, Member } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addMember, deleteMember, getMembers } from 'store/actions/memberActions';

const initialState: MembersState = {
  data: [],
  isLoading: false,
  error: null,
  selectedMembers: [],
};

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setSelectedMembersList: (state, action) => {
      console.log('action', action);
      state.selectedMembers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action: PayloadAction<Member[] | undefined>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown Error';
      })
      .addCase(addMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMember.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown Error';
      })
      .addCase(deleteMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMember.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});
export const { setSelectedMembersList } = membersSlice.actions;
export default membersSlice.reducer;
