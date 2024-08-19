import { createAsyncThunk } from '@reduxjs/toolkit';
import { addMemberService, getMembersService } from 'services/memberServices';

export const addMember = createAsyncThunk('members/addMember', addMemberService);

export const getMembers = createAsyncThunk('members/getMembers', getMembersService);
