import { createAppAsyncThunk } from '@/app/types/withTypes';
import { addMemberService, deleteMemberService, getMembersService } from 'services/memberServices';

export const addMember = createAppAsyncThunk('members/addMember', addMemberService);

export const getMembers = createAppAsyncThunk('members/getMembers', getMembersService);

export const deleteMember = createAppAsyncThunk('members/deleteMember', deleteMemberService);
