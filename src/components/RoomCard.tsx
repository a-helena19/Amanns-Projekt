'use client';

import Link from 'next/link';
import { Room } from '@/src/types';
import Image from 'next/image';
import { toggleStarredAction } from '@/src/app/rooms/_actions/toggleStarredAction';
import { useState } from 'react';

type Props = {
  room: Room;
};

export default function RoomCard({ room }: Props) {
  const [isStarred, setIsStarred] = useState(room.isStarred);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleStar = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await toggleStarredAction(room.id);
      setIsStarred(!isStarred);
    } catch (error) {
      console.error('Failed to toggle star:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link href={`/rooms/${room.id}`} className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
      <div className="relative">
        <Image src={room.heroUrl} alt={room.title} width={400} height={200} className="w-full h-48 object-cover" />
        <button
          onClick={handleToggleStar}
          disabled={isLoading}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-500 hover:bg-gray-600 transition flex items-center justify-center disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          aria-label="Toggle star"
        >
          <span className={`text-lg transition ${isStarred ? 'text-cyan-500' : 'text-gray-300'}`}>
            {isStarred ? '★' : '☆'}
          </span>
        </button>
      </div>
      <div className="p-4">
        <h2 className="font-semibold truncate">{room.title}</h2>
        <p className="text-sm text-gray-500 mt-1 truncate">{room.description}</p>
        <p className="text-sm text-gray-400 mt-1">
          Added on {new Date(room.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <div className="flex justify-between items-center mt-3 border-t-1 border-gray-200 pt-3">
          <p className="text-cyan-600 font-semibold">
            ${room.pricePerNight.amount}<span className="text-gray-400 font-normal">/day</span>
          </p>
          <div className="flex items-center gap-2">
            <Image src={room.owner.portraitUrl} alt={room.owner.firstName} width={28} height={28} className="w-7 h-7 rounded-full object-cover" />
            <span className="text-sm text-gray-500">{room.owner.firstName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}