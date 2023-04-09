import { db } from '@/config/firebase';
import { getCourseIdFromAssessmentId } from '@/util/getCourseIdFromAssessmentId';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/assessments/{assessmentId}/attempts/{attemptId}/questions/{questionId}:
 *   put:
 *     operationId: adjustPoints
 *     summary: Adjust points for a question that the student answered
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
 *         description: The ID of the student attempt of the assessment
 *         schema:
 *           type: string
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: The ID of the question that should be adjusted
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Ajustments to the points given to the question that the student answered
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pointsAdjusted:
 *                 oneOf:
 *                   - type: number
 *                   - type: null
 *                 description: The adjusted value of the points awarded to student for the question
 *             required:
 *               - pointsAdjusted
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: {
      assessmentId: string;
      attemptId: string;
      questionId: string;
    };
  },
) {
  const pointsAdjusted = (await request.json()).pointsAdjusted;
  if (!pointsAdjusted) throw new Error('Missing pointsAdjusted');

  const courseId = await getCourseIdFromAssessmentId(
    params.assessmentId,
  );

  const answerSnap = await db
    .doc(
      `courses/${courseId}/rooms/${params.assessmentId}/attempts/${params.attemptId}/answers/${params.questionId}`,
    )
    .get();

  if (!answerSnap.exists) throw new Error('Answer not found');

  // For now, just adjust the first prompt we find (i.e. we don't propery support multi-step)
  const promptId = Object.keys(answerSnap.data()!.prompts)[0];

  if (!promptId) throw new Error('No prompts found');

  await answerSnap.ref.set(
    {
      prompts: {
        [promptId]: {
          pointsAdjusted,
        },
      },
    },
    { merge: true },
  );

  return NextResponse.json({});
}
