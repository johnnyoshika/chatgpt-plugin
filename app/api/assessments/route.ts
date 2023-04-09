import { db } from '@/config/firebase';
import { Assessment } from '@/models/Assessment';
import { getInstructorIdFromEmail } from '@/util/getInstructorIdFromEmail';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/assessments:
 *   get:
 *     operationId: getActiveAssessments
 *     summary: Get active assessments by instructor email
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: The email address of instructor to retrieve assessments for
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
 *                 $ref: '#/components/schemas/Assessment'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     Assessment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Assesment ID
 *         title:
 *           type: string
 *           description: Assesment title
 *         course:
 *           type: string
 *           description: The course in which the assessment belongs
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) throw new Error('Email is required');

  const instructorId = await getInstructorIdFromEmail(email);

  const courses = await db
    .collection('courses')
    .where(`instructors.${instructorId}.exists`, '==', true)
    .get();

  const assessments: Assessment[] = [];

  for (const course of courses.docs) {
    assessments.push(
      ...(
        await db.collection(`courses/${course.id}/assessments`).get()
      ).docs
        .map(a =>
          Assessment.parse({
            ...a.data(),
            course: course.data().name,
          }),
        )
        .filter(
          a =>
            dayjs(a.availableFrom).isBefore(dayjs()) &&
            dayjs(a.availableUntil).isAfter(dayjs()),
        ),
    );
  }

  return NextResponse.json(assessments.map(a => a.payload()));
}
