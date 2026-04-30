import { create } from 'zustand';
const useStore = create(() => ({ bears: 0 }));
console.log('Keys:', Object.keys(useStore));
