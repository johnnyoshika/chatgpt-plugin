import { db } from '@/config/firebase';
import { Statistics } from '@/models/Statistics';
import { getCourseIdFromAssessmentId } from '@/util/getCourseIdFromAssessmentId';
import { roundTo } from '@/util/number';
import { NextResponse } from 'next/server';

const percentageString = (value: number | null | undefined) =>
  value ? `${roundTo(value, 2)}%` : '0%';

/**
 * @swagger
 * /api/assessments/{assessmentId}:
 *   get:
 *     operationId: getAssessmentStatistics
 *     summary: Get statistics (submissions, low score, high score, average score, standard deviation) for the assessment
 *     parameters:
 *       - in: path
 *         name: assessmentId
 *         required: true
 *         description: The ID of the assessment to retrieve statistics for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistics'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     Statistics:
 *       type: object
 *       properties:
 *         submissions:
 *           type: number
 *           nullable: true
 *           description: The number of submission (aka sample size)
 *         lowScore:
 *           type: string
 *           nullable: true
 *           description: The lowest score, expressed as a percentage (e.g. 80%)
 *         highScore:
 *           type: string
 *           nullable: true
 *           description: The highest score, expressed as a percentage (e.g. 80%)
 *         averageScore:
 *           type: string
 *           nullable: true
 *           description: The average score, expressed as a percentage (e.g. 80%)
 *         standardDeviation:
 *           type: string
 *           nullable: true
 *           description: The standard deviation of all the scores, expressed as a percentage (e.g. 80%)
 */
export async function GET(
  request: Request,
  { params }: { params: { assessmentId: string } },
) {
  const courseId = await getCourseIdFromAssessmentId(
    params.assessmentId,
  );

  const assessmentResult = await db
    .doc(
      `courses/${courseId}/rooms/${params.assessmentId}/assessmentResults/index`,
    )
    .get();

  return NextResponse.json(
    new Statistics(
      assessmentResult.data()?.scoreStatisticsSet.finalLast.sampleSize,
      percentageString(
        assessmentResult.data()?.scoreStatisticsSet.finalLast
          .minPercentage,
      ),
      percentageString(
        assessmentResult.data()?.scoreStatisticsSet.finalLast
          .maxPercentage,
      ),
      percentageString(
        assessmentResult.data()?.scoreStatisticsSet.finalLast
          .meanPercentage,
      ),
      percentageString(
        assessmentResult.data()?.scoreStatisticsSet.finalLast
          .standardDeviationPercentage,
      ),
    ),
  );
}
