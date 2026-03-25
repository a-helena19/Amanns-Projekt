type Props = {
    currentPage: number;
    totalPages: number;
    totalElements: number;
  };
  
  export default function PageInfo({ currentPage, totalPages, totalElements }: Props) {
    return (
      <p className="text-sm text-gray-500 mb-4">
        Page {currentPage} of {totalPages} ({totalElements} results in total)
      </p>
    );
  }