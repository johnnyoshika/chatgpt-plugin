import { initializeDb } from '@/config/database';

export default async function Home() {
  const db = await initializeDb();
  const todos = await db.all<
    {
      id: number;
      username: string;
      todo: string;
    }[]
  >('SELECT * FROM todos');

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.id} {todo.username}: {todo.todo}
        </li>
      ))}
    </ul>
  );
}
