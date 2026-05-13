import type { Memory } from '../types/memory';
import { getThumbnailUrl } from './imageTransformations';

const STORAGE_KEY = 'memorywall_memories';

/**
 * Get all memories from localStorage
 */
export function getMemories(): Memory[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get memories from storage:', error);
    return [];
  }
}

/**
 * Save a new memory to localStorage
 */
export function addMemory(
  publicId: string,
  url: string,
  uploadResult: {
    format: string;
    width: number;
    height: number;
  },
  title?: string,
  description?: string
): Memory {
  const today = new Date().toISOString().split('T')[0];
  const memory: Memory = {
    id: `${publicId}-${Date.now()}`,
    publicId,
    url,
    thumbnailUrl: getThumbnailUrl(publicId),
    date: title && title.includes('-') ? title.split(' ')[0] : today,
    title,
    description,
    createdAt: new Date().toISOString(),
    format: uploadResult.format,
    width: uploadResult.width,
    height: uploadResult.height,
  };

  const memories = getMemories();
  memories.unshift(memory);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  return memory;
}

/**
 * Delete a memory from localStorage
 */
export function deleteMemory(id: string): void {
  const memories = getMemories();
  const filtered = memories.filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * Get memories by date
 */
export function getMemoriesByDate(date: string): Memory[] {
  return getMemories().filter((m) => m.date === date);
}

/**
 * Get memories grouped by month
 */
export function getMemoriesByMonth(year: number, month: number): Memory[] {
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;
  return getMemories().filter((m) => m.date.startsWith(monthStr));
}

/**
 * Update memory metadata
 */
export function updateMemory(id: string, updates: Partial<Memory>): Memory | null {
  const memories = getMemories();
  const index = memories.findIndex((m) => m.id === id);

  if (index === -1) return null;

  memories[index] = { ...memories[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  return memories[index];
}

/**
 * Search memories by description or title
 */
export function searchMemories(query: string): Memory[] {
  const lowerQuery = query.toLowerCase();
  return getMemories().filter(
    (m) =>
      (m.title?.toLowerCase().includes(lowerQuery) || false) ||
      (m.description?.toLowerCase().includes(lowerQuery) || false)
  );
}
