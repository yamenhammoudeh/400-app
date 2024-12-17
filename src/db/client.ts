import { createClient } from '@libsql/client';
import { SCHEMA, INDEXES } from './schema';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL || 'file:local.db';
const DATABASE_AUTH_TOKEN = import.meta.env.VITE_DATABASE_AUTH_TOKEN;

export const db = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

let initialized = false;

export async function initializeDatabase() {
  if (initialized) return;
  
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