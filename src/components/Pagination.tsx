import Link from 'next/link';

type Props = {
  currentPage: number;
  totalPages: number;
  sort?: string;
};

export default function Pagination({ currentPage, totalPages, sort = 'createdAt' }: Props) {
  return (
    <div className="flex justify-center items-center gap-6 mt-8 text-gray-500">
      {currentPage > 1 ? (
        <Link href={`/rooms?page=${currentPage - 1}&sort=${sort}`} className="hover:text-black transition">
          ←
        </Link>
      ) : (
        <span className="text-gray-300 cursor-not-allowed">←</span>
      )}

      <span className="text-sm">Page {currentPage} of {totalPages}</span>

      {currentPage < totalPages ? (
        <Link href={`/rooms?page=${currentPage + 1}&sort=${sort}`} className="hover:text-black transition">
          →
        </Link>
      ) : (
        <span className="text-gray-300 cursor-not-allowed">→</span>
      )}
    </div>
  );
}