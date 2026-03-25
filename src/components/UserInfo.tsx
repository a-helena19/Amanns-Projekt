import { Me } from '@/src/types';
import Image from 'next/image';

type Props = {
  user: Me;
};

export default function UserInfo({ user }: Props) {
  return (
    <div className="text-right">
      <div className="flex items-center gap-2 justify-end">
        <Image src={user.portraitUrl} alt={user.firstName} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
        <span className="text-sm text-gray-700">
          {user.firstName} {user.lastName}
        </span>
      </div>
      <div className="text-xs text-cyan-600 mt-1 flex items-center justify-end gap-1">
        <span>★</span>
        <span>{user.starredRoomIds.length} starred {user.starredRoomIds.length === 1 ? 'room' : 'rooms'}</span>
      </div>
    </div>
  );
}