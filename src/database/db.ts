// db.ts
import { DisplayMessage } from '@/hooks/domain/message/types';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase | null = null;

export async function getDb() {
  if (db) return db;
  // SQLite.DEBUG(true);
  db = await SQLite.openDatabase({
    name: 'messages.db',
    location: 'default',
  });

  return db;
}

export async function migrate() {
  const db = await getDb();
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      role TEXT NOT NULL,
      type TEXT NOT NULL,
      content TEXT NOT NULL,
      sent_at INTEGER NOT NULL
    );
  `);

  await db.executeSql(`
    CREATE INDEX IF NOT EXISTS idx_messages_sent_at
    ON messages(sent_at DESC);
  `);
}

export async function insertMessage(msg: DisplayMessage) {
  const db = await getDb();
  await db.executeSql(
    `INSERT INTO messages (id, role, type, content, sent_at)
     VALUES (?, ?, ?, ?, ?)`,
    [msg.id, msg.role, msg.type, msg.content, msg.sentAt],
  );
}

export async function loadMessages(limit: number, offset: number) {
  const db = await getDb();
  const [res] = await db.executeSql(
    `SELECT * FROM messages
     ORDER BY sent_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset],
  );

  return res.rows.raw().map((row) => ({
    id: row.id,
    role: row.role,
    type: row.type,
    content: row.content,
    sentAt: row.sent_at,
  }));
}
