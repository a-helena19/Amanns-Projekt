'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function Nav() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="flex gap-4">
      <Link
        href="/rooms"
        className={`text-sm px-4 py-2 rounded transition-colors ${
          segment === 'rooms'
            ? 'bg-slate-200 text-gray-900 font-bold'
            : 'text-gray-600 font-medium hover:text-gray-900'
        }`}
      >
        Cabins
      </Link>
      <Link
        href="/create"
        className={`text-sm px-4 py-2 rounded transition-colors ${
          segment === 'create'
            ? 'bg-slate-200 text-gray-900 font-bold'
            : 'text-gray-600 font-medium hover:text-gray-900'
        }`}
      >
        Add cabin
      </Link>
    </nav>
  );
}