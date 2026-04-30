import { devtools } from '@csark0812/zustand-expo-devtools';
import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './slices/authSlice';
import { ExpenseSlice, createExpenseSlice } from './slices/expenseSlice';

export type StoreState = AuthSlice & ExpenseSlice;

const useStore = create<StoreState>()(
  devtools(
    (...args) => ({
      ...createAuthSlice(...args),
      ...createExpenseSlice(...args),
    }),
    {
      name: 'ExpenseTracker',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);

export { useStore };
