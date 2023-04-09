import { db } from '@/config/firebase';

export const getCourseIdFromAssessmentId = async (
  assessmentid: string,
) => {
  const assessmentId = await db
    .doc(`assessmentIds/${assessmentid}`)
    .get();

  if (!assessmentId.exists) throw new Error('Assessment not found');

  return assessmentId.data()!.courseId;
};
