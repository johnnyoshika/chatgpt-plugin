import { db } from '@/config/firebase';
import { Question } from '@/models/Question';
import { getCourseIdFromAssessmentId } from '@/util/getCourseIdFromAssessmentId';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/assessments/{assessmentId}/attempts/{attemptId}/questions:
 *   get:
 *     operationId: getQuestions
 *     summary: Get question breakdown for student attempts
 *     parameters:
 *       - in: path
 *         name: assessmentId
 *         required: true
 *         description: The ID of the assessment
 *         schema:
 *           type: string
 *       - in: path
 *         name: attemptId
 *         required: true
 *         description: The ID of the student attempt to retrieve questions for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attempt'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     Attempt:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Attempt ID
 *         student:
 *           type: string
 *           description: Student name
 *         score:
 *           description: Score that the student earned on this attempt
 *           $ref: '#/components/schemas/Score'
 *
 *     Score:
 *       type: object
 *       properties:
 *         pointsGiven:
 *           type: number
 *           description: Number of points that the student earned on this attempt
 *         pointsPossible:
 *           type: number
 *           description: Total number of points that the student could have earned if s/he answered all questions correctly
 *         percentage:
 *           type: number
 *           description: The score expressed as a percentage (i.e. 0% if everything is wrong and 100% if everything is right)
 */
export async function GET(
  request: Request,
  { params }: { params: { assessmentId: string; attemptId: string } },
) {
  const courseId = await getCourseIdFromAssessmentId(
    params.assessmentId,
  );

  const resultSnap = await db
    .doc(
      `courses/${courseId}/rooms/${params.assessmentId}/attemptResults/${params.attemptId}`,
    )
    .get();

  if (!resultSnap.exists) throw new Error('Attempt not found');

  const questions = [];
  for (const question of Object.values<{ id: string }>(
    resultSnap.data()!.questions,
  )) {
    const title = (
      await db.doc(`questions/${question.id}`).get()
    ).data()?.title;

    questions.push(Question.parse({ ...question, title }));
  }

  return NextResponse.json(questions.map(a => a.payload()));
}
