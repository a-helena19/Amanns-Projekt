'use client';

import Image from 'next/image';
import { Room } from '@/src/types';
import { toggleStarredAction } from '@/src/app/rooms/_actions/toggleStarredAction';
import { useState } from 'react';

type Props = {
  room: Room;
};

export default function RoomDetail({ room }: Props) {
  const [isStarred, setIsStarred] = useState(room.isStarred);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleStar = async () => {
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-8">
        <div className="flex-1 relative">
          <Image
            src={room.heroUrl}
            alt={room.title}
            width={600}
            height={400}
            className="w-full h-96 object-cover rounded-lg"
          />
          <button
            onClick={handleToggleStar}
            disabled={isLoading}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-500 hover:bg-gray-600 transition flex items-center justify-center disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            aria-label="Toggle star"
          >
            <span className={`text-lg transition ${isStarred ? 'text-cyan-500' : 'text-gray-300'}`}>
              {isStarred ? '★' : '☆'}
            </span>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{room.title}</h1>
            <p className="text-gray-700 text-base leading-relaxed mb-6">{room.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Added on {new Date(room.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image
                src={room.owner.portraitUrl}
                alt={room.owner.firstName}
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover"
              />
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