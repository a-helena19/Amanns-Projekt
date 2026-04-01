import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-6">This page does not exist.</p>
      <Link href="/rooms" className="px-4 py-2 ml-auto bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white font-semibold
       rounded transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500">
        Back to Rooms
      </Link>
    </div>
  );
}