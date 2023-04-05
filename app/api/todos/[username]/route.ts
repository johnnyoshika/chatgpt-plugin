import { initializeDb } from '@/config/database';
import { NextResponse } from 'next/server';

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
