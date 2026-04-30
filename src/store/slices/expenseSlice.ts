import { StateCreator } from 'zustand';

type State = {
  expenses: any[];
  isLoading: boolean;
}

type Action = {
  setExpenses: (expenses: any[]) => void;
  addExpense: (expense: any) => void;
  setLoading: (isLoading: boolean) => void;
}

export type ExpenseSlice = State & Action;

export const createExpenseSlice: StateCreator<ExpenseSlice> = (set) => ({
  expenses: [],
  isLoading: false,
  setExpenses: (expenses) => set({ expenses }),
  addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
  setLoading: (isLoading) => set({ isLoading }),
});
