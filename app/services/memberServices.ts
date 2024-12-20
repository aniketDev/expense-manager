import { nanoid } from '@reduxjs/toolkit';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '@/firebaseConfig';
import { Member } from '@/app/types';

export const addMemberService = async (name: string) => {
  try {
    const id = nanoid();
    const membersRef = collection(FIREBASE_DB, 'members');
    await setDoc(doc(membersRef, id), {
      id,
      name,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getMembersService = async () => {
  try {
    const updatedMembers: Member[] = [];
    const membersList = await getDocs(collection(FIREBASE_DB, 'members'));
    membersList.forEach((doc) => {
      updatedMembers.push(doc.data() as Member);
    });
    return updatedMembers;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteMemberService = async (id: string) => {
  try {
    await deleteDoc(doc(FIREBASE_DB, 'members', id));
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
