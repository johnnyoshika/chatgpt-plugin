import { db } from '@/config/firebase';
import { Attempt } from '@/models/Attempt';
import { getCourseIdFromAssessmentId } from '@/util/getCourseIdFromAssessmentId';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/assessments/{assessmentId}/attempts:
 *   get:
 *     operationId: getStudentAttempts
 *     summary: Get student attempts for the assessment
 *     parameters:
 *       - in: path
 *         name: assessmentId
 *         required: true
 *         description: The ID of the assessment to retrieve attempts for
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
  { params }: { params: { assessmentId: string } },
) {
  const courseId = await getCourseIdFromAssessmentId(
    params.assessmentId,
  );

  const attempts = (
    await db
      .collection(
        `courses/${courseId}/rooms/${params.assessmentId}/attemptResults`,
      )
      .get()
  ).docs.map(a => Attempt.parse(a.data()));

  return NextResponse.json(attempts.map(a => a.payload()));
}
