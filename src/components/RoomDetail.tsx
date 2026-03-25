import Image from 'next/image';
import { Room } from '@/src/types';

type Props = {
  room: Room;
};

export default function RoomDetail({ room }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-8">
        <div className="flex-1">
          <Image
            src={room.heroUrl}
            alt={room.title}
            width={600}
            height={400}
            className="w-full h-96 object-cover rounded-lg"
          />
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