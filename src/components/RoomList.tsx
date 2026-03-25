import { Room } from '@/src/types';
import RoomCard from './RoomCard';

type Props = {
  rooms: Room[];
};

export default function RoomList({ rooms }: Props) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}