import { User } from '@/src/types';

type Props = {
  user: User;
};

export default function UserInfo({ user }: Props) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={user.portraitUrl}
        alt={user.firstName}
        className="w-8 h-8 rounded-full object-cover"
      />
      <span className="text-sm text-gray-700">
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
}