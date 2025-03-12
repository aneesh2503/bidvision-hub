
import React from 'react';
import { TableHead } from "@/components/ui/table";
import { ArrowDownUp } from 'lucide-react';
import DashboardTooltip from './DashboardTooltip';
import { AuctionItem } from './types';

interface TableSortHeaderProps {
  field: keyof AuctionItem;
  label: string;
  sortField: keyof AuctionItem | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof AuctionItem) => void;
  tooltipContent?: string;
}

const TableSortHeader: React.FC<TableSortHeaderProps> = ({
  field,
  label,
  sortField,
  sortDirection,
  onSort,
  tooltipContent
}) => {
  return (
    <TableHead>
      <div 
        className="flex items-center cursor-pointer transition-colors hover:text-primary" 
        onClick={() => onSort(field)}
      >
        {label}
        {sortField === field && (
          <ArrowDownUp className={`h-4 w-4 ml-1 transition-transform duration-300 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
        )}
        {tooltipContent && <DashboardTooltip content={tooltipContent} />}
      </div>
    </TableHead>
  );
};

export default TableSortHeader;
