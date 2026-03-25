import { notFound } from 'next/navigation';
import { API_URL } from '@/src/config';
import { Room } from '@/src/types';
import { Metadata } from 'next';

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-8">
        <div className="flex-1">
          <img 
            src={room.heroUrl} 
            alt={room.title} 
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{room.title}</h1>
            
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {room.description}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Added on {new Date(room.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <img src={room.owner.portraitUrl} alt={room.owner.firstName} className="w-7 h-7 rounded-full object-cover" />
              <span>{room.owner.firstName} {room.owner.lastName}</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold text-cyan-600">
              ${room.pricePerNight.amount}
              <span className="text-lg font-normal text-gray-600">/day</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}