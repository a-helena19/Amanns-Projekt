'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-6">This page does not exist.</p>
      <Link href="/rooms" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
        Back to Rooms
      </Link>
    </div>
  );
}