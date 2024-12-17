import { generateSlug } from 'random-word-slugs';

export function generateGameId(): string {
  // Generate a 4-character random ID using uppercase letters and numbers
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 4 }, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
}

export function getGameUrl(gameId: string): string {
  // Use the current hostname for the game URL
  const baseUrl = window.location.origin;
  return `${baseUrl}/${gameId}`;
}