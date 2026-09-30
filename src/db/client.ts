import { createClient, Client } from '@libsql/client';
import { SCHEMA, INDEXES } from './schema';

const DATABASE_URL: string | undefined = import.meta.env.VITE_DATABASE_URL;
const DATABASE_AUTH_TOKEN = import.meta.env.VITE_DATABASE_AUTH_TOKEN;

// The browser client only supports network URLs. Anything else (e.g. "file:local.db")
// leaves db unset, and operations fall back to localStorage.
const isRemoteUrl = /^(libsql|https?|wss?):/.test(DATABASE_URL ?? '');

export const db: Client | null = isRemoteUrl
  ? createClient({
      url: DATABASE_URL!,
      authToken: DATABASE_AUTH_TOKEN,
    })
  : null;

let initialized = false;

export async function initializeDatabase() {
  if (initialized || !db) return;

  try {
    // Create tables
    for (const createTable of Object.values(SCHEMA)) {
      await db.execute(createTable);
    }

    // Create indexes
    for (const createIndex of Object.values(INDEXES)) {
      await db.execute(createIndex);
    }

    initialized = true;
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}
