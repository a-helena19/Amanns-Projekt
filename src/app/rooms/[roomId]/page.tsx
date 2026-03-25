import { notFound } from 'next/navigation';
import { API_URL } from '@/src/config';
import { Room } from '@/src/types';
import { Metadata } from 'next';
import RoomDetail from '@/src/components/RoomDetail';

type Props = {
  params: Promise<{ roomId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roomId } = await params;
  const res = await fetch(`${API_URL}/rooms/${roomId}`);
  if (!res.ok) return { title: 'Room not found' };
  const room = (await res.json()) as Room;
  return { title: room.title };
}

export default async function RoomDetailPage({ params }: Props) {
  const { roomId } = await params;
  const res = await fetch(`${API_URL}/rooms/${roomId}`, { cache: 'no-store' });
  if (!res.ok) notFound();
  const room = (await res.json()) as Room;

  return <RoomDetail room={room} />;
}