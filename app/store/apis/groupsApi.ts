import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addGroupsService, getGroupsService } from 'services/groupServices';
import { GroupData } from '@/app/types';

const GroupsApi = createApi({
  reducerPath: 'groups',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Group'],
  endpoints: (builder) => ({
    getGroups: builder.query<GroupData[], void>({
      queryFn: async () => {
        const data = await getGroupsService();
        return data?.length ? { data } : { data: [] };
      },
      providesTags: ['Group'],
    }),
    addGroup: builder.mutation({
      queryFn: async ({ groupData }) => {
        await addGroupsService(groupData);
        return { data: {} };
      },
      invalidatesTags: ['Group'],
    }),
  }),
});

export const { useAddGroupMutation, useGetGroupsQuery } = GroupsApi;
export { GroupsApi };
