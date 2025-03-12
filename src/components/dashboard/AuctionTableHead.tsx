
import React from 'react';
import { TableRow, TableHead } from "@/components/ui/table";
import { AuctionItem } from './types';
import TableSortHeader from './TableSortHeader';

interface AuctionTableHeadProps {
  sortField: keyof AuctionItem | null;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: keyof AuctionItem) => void;
  toggleSelectAll: () => void;
  selectedRows: string[];
  currentItems: AuctionItem[];
}

const AuctionTableHead: React.FC<AuctionTableHeadProps> = ({
  sortField,
  sortDirection,
  handleSort,
  toggleSelectAll,
  selectedRows,
  currentItems
}) => {
  return (
    <TableRow>
      <TableHead className="w-[40px]">
        <input 
          type="checkbox" 
          className="rounded border-gray-300 text-primary focus:ring-primary/30 h-4 w-4 cursor-pointer transition-all"
          checked={selectedRows.length === currentItems.length && currentItems.length > 0}
          onChange={toggleSelectAll}
        />
      </TableHead>
      
      <TableSortHeader
        field="id"
        label="ID"
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      
      <TableSortHeader
        field="title"
        label="Item"
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      
      <TableSortHeader
        field="status"
        label="Status"
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      
      <TableSortHeader
        field="currentBid"
        label="Current Bid"
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        tooltipContent="The highest current bid amount"
      />
      
      <TableSortHeader
        field="bidders"
        label="Bidders"
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        tooltipContent="Number of unique bidders"
      />
      
      <TableSortHeader
        field="endDate"
        label="End Date"
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  );
};

export default AuctionTableHead;
