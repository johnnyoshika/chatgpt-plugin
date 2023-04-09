import { db } from '@/config/firebase';

export const getInstructorIdFromEmail = async (email: string) => {
  const instructors = await db
    .collection('instructors')
    .where('email', '==', email)
    .get();

  if (instructors.empty) throw new Error('Instructor not found');

  return instructors.docs[0].id;
};
