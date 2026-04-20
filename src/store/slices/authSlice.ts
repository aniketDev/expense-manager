import { StateCreator } from 'zustand';

type State = {
  session: any | null;
  user: any | null;
}

type Action = {
  setAuth: (session: any, user: any) => void;
  signOut: () => void;
}

export type AuthSlice = State & Action;

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  session: null,
  user: null,
  setAuth: (session, user) => set({ session, user }),
  signOut: () => set({ session: null, user: null }),
});
