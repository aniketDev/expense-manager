import { nanoid } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';

export const addMemberService = async (name) => {
  try {
    await addDoc(collection(FIREBASE_DB, 'members'), {
      id: nanoid(),
      name,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getMembersService = async () => {
  try {
    const updatedMembers = [];
    const membersList = await getDocs(collection(FIREBASE_DB, 'members'));
    membersList.forEach((doc) => {
      updatedMembers.push(doc.data());
    });
    return updatedMembers;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
