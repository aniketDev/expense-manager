import { nanoid } from '@reduxjs/toolkit';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '@/firebaseConfig';
import { GroupData } from '@/app/types';

export const addGroupsService = async (groupData: GroupData) => {
  try {
    const id = nanoid();
    const groupRef = collection(FIREBASE_DB, 'groups');
    await setDoc(doc(groupRef, id), { ...groupData, id });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getGroupsService = async () => {
  try {
    const groups: GroupData[] = [];
    const groupsList = await getDocs(collection(FIREBASE_DB, 'groups'));
    groupsList.forEach((doc) => {
      groups.push(doc.data());
    });
    return groups;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
