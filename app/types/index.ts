export interface Member {
  id: string;
  name: string;
}

export interface MembersState {
  data: Member[] | undefined;
  isLoading: boolean;
  error: string | null;
  selectedMembers: Member[];
}
