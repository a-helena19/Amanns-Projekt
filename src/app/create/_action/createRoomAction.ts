'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { API_URL } from '@/src/config';
import { RoomInput } from '@/src/types';

export async function createRoomAction(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const data: RoomInput = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    heroUrl: formData.get('heroUrl') as string,
    pricePerNight: {
      amount: Number(formData.get('pricePerNight')),
      currency: 'USD',
    },
  };

  if (!data.title || !data.description || !data.heroUrl || !data.pricePerNight.amount) {
    return { error: 'Please fill in all fields.' };
  }

  const res = await fetch(`${API_URL}/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => null);
    return { error: json?.message ?? 'Invalid data received. Please verify your input.' };
  }

  revalidatePath('/rooms');
  redirect('/rooms');
}