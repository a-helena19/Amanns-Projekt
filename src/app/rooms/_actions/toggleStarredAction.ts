'use server';

import { revalidatePath } from 'next/cache';
import { API_URL } from '@/src/config';
import { Room } from '@/src/types';

export async function toggleStarredAction(roomId: number): Promise<Room> {
  const res = await fetch(`${API_URL}/rooms/${roomId}/toggle-starred`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error('Failed to toggle starred room');
  }

  revalidatePath('/rooms');
  revalidatePath(`/rooms/${roomId}`);

  return res.json();
}
