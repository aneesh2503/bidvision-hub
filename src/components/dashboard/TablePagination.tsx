
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalItems: number;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  paginate: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  loadMore: () => void;
  isLoading: boolean;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  indexOfFirstItem,
  indexOfLastItem,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
  paginate,
  nextPage,
  prevPage,
  loadMore,
  isLoading
}) => {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={prevPage}
        disabled={currentPage === 1}
        className="flex items-center transition-all hover:shadow-md"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <div className="flex items-center space-x-2">
        {totalPages <= 5 ? (
          // Show all pages if 5 or fewer
          Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              className={`w-9 h-9 p-0 transition-all ${currentPage === i + 1 ? 'animate-pulse-soft' : 'hover:shadow-md'}`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Button>
          ))
        ) : (
          // Show pagination with ellipsis for more than 5 pages
          <>
            {[1, 2].map(num => (
              <Button
                key={num}
                variant={currentPage === num ? "default" : "outline"}
                size="sm"
                className={`w-9 h-9 p-0 transition-all ${currentPage === num ? 'animate-pulse-soft' : 'hover:shadow-md'}`}
                onClick={() => paginate(num)}
                style={{ display: num > totalPages ? 'none' : 'block' }}
              >
                {num}
              </Button>
            ))}
            
            {currentPage > 3 && (
              <span className="px-2">...</span>
            )}
            
            {currentPage > 2 && currentPage < totalPages - 1 && (
              <Button
                variant="default"
                size="sm"
                className="w-9 h-9 p-0 animate-pulse-soft"
              >
                {currentPage}
              </Button>
            )}
            
            {currentPage < totalPages - 2 && (
              <span className="px-2">...</span>
            )}
            
            {[totalPages - 1, totalPages].map(num => (
              <Button
                key={num}
                variant={currentPage === num ? "default" : "outline"}
                size="sm"
                className={`w-9 h-9 p-0 transition-all ${currentPage === num ? 'animate-pulse-soft' : 'hover:shadow-md'}`}
                onClick={() => paginate(num)}
                style={{ display: num <= 0 ? 'none' : 'block' }}
              >
                {num}
              </Button>
            ))}
          </>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={loadMore}
        disabled={currentPage === totalPages || isLoading}
        className="flex items-center transition-all hover:shadow-md"
      >
        <span>{isLoading ? 'Loading...' : 'Next'}</span>
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default TablePagination;
