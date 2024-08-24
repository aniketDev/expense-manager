import { createAppAsyncThunk } from '@/app/types/withTypes';
import { addMemberService, getMembersService } from 'services/memberServices';

export const addMember = createAppAsyncThunk('members/addMember', addMemberService);

export const getMembers = createAppAsyncThunk('members/getMembers', getMembersService);
