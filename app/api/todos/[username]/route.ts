import { initializeDb } from '@/config/database';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/todos/{username}:
 *   get:
 *     operationId: getTodos
 *     summary: Get the list of todos
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The name of the user
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   username:
 *                     type: string
 *                   todo:
 *                     type: string
 *       '500':
 *         description: Internal server error
 */
export async function GET(
  request: Request,
  { params }: { params: { username: string } },
) {
  const db = await initializeDb();

  const todos = await db.all<
    {
      id: number;
      username: string;
      todo: string;
    }[]
  >('SELECT * FROM todos WHERE username = ?', [params.username]);

  return NextResponse.json(todos);
}

/**
 * @swagger
 * /api/todos/{username}:
 *   post:
 *     operationId: addTodo
 *     summary: Add a todo to the list
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The name of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The todo object to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todo:
 *                 type: string
 *                 description: The todo to add to the list
 *             required:
 *               - todo
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
export async function POST(
  request: Request,
  { params }: { params: { username: string } },
) {
  const todo = (await request.json()).todo;
  if (!todo) throw new Error('Missing todo');

  const db = await initializeDb();
  await db.run('INSERT INTO todos (username, todo) VALUES (?, ?)', [
    params.username,
    todo,
  ]);

  return NextResponse.json({});
}

/**
 * @swagger
 * /api/todos/{username}:
 *   delete:
 *     operationId: deleteTodo
 *     summary: Delete a todo from the list
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The name of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The todo object to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todo_idx:
 *                 type: number
 *                 description: The index of the todo to delete
 *             required:
 *               - todo_idx
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
export async function DELETE(
  request: Request,
  { params }: { params: { username: string } },
) {
  const id = (await request.json()).todo_idx;
  if (!id) throw new Error('Missing todo_idx');

  const db = await initializeDb();
  await db.run('DELETE FROM todos WHERE id = ? AND username = ?', [
    id,
    params.username,
  ]);

  return NextResponse.json({});
}
