import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

const DBSOURCE = 'data.sqlite';

let db: Database | null = null;

export const initializeDb = async () => {
  if (db) return db;

  db = await open({
    filename: DBSOURCE,
    driver: sqlite3.Database,
  });

  await db.run(
    `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        todo TEXT
      )`,
  );

  const rowCount = await db.get(
    'SELECT COUNT(*) AS count FROM todos',
  );

  if (rowCount.count === 0) {
    await db.run('INSERT INTO todos (username, todo) VALUES (?, ?)', [
      'michael',
      'Take out the trash',
    ]);
    await db.run('INSERT INTO todos (username, todo) VALUES (?, ?)', [
      'karen',
      'Walk the dog',
    ]);
  }

  return db;
};
