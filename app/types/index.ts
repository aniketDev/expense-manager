export interface Members {
  id: string;
  name: string;
}

export interface MembersState {
  data: Members[] | undefined;
  isLoading: boolean;
  error: string | null;
}
