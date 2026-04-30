import { StateCreator } from 'zustand';

type State = {
  session: any | null;
};

type Action = {
  setAuthSession: (session: any) => void;
  signOut: () => void;
};

export type AuthSlice = State & Action;

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  session: null,
  setAuthSession: (session) => set({ session }),
  signOut: () => set({ session: null }),
});
