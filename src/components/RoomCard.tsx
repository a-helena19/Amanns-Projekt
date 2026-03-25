import Link from 'next/link';
import { Room } from '@/src/types';
import Image from 'next/image';

type Props = {
  room: Room;
};

export default function RoomCard({ room }: Props) {
  return (
    <Link href={`/rooms/${room.id}`} className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
      <Image src={room.heroUrl} alt={room.title} width={400} height={200} className="w-full h-48 object-cover" />
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