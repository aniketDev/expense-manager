import { Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export type AuthContextType = {
  session: Session | null;
  isInitialized: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  isInitialized: false,
});

export const useAuthContext = () => useContext(AuthContext);
