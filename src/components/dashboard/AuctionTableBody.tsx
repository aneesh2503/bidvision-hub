
import React from 'react';
import { TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, RotateCw, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AuctionItem } from './types';
import StatusBadge from './StatusBadge';
import TableRowActions from './TableRowActions';
import ExpandedRow from './ExpandedRow';

interface AuctionTableBodyProps {
  currentItems: AuctionItem[];
  selectedRows: string[];
  highlightedRow: string | null;
  sortField: keyof AuctionItem | null;
  lastSortedField: keyof AuctionItem | null;
  isLoading: boolean;
  expandedRow: string | null;
  toggleRowSelection: (id: string) => void;
  toggleRowExpansion: (id: string) => void;
  refreshData: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const AuctionTableBody: React.FC<AuctionTableBodyProps> = ({
  currentItems,
  selectedRows,
  highlightedRow,
  sortField,
  lastSortedField,
  isLoading,
  expandedRow,
  toggleRowSelection,
  toggleRowExpansion,
  refreshData,
  onEdit,
  onDelete,
  onView
}) => {
  if (currentItems.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8} className="h-24 text-center">
            <div className="flex flex-col items-center justify-center space-y-3 animate-fade-in">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
              <div className="text-muted-foreground">No auction data found.</div>
              <Button variant="outline" size="sm" onClick={refreshData} className="transition-all hover:shadow-md">
                <RotateCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {currentItems.map((auction, index) => (
        <React.Fragment key={auction.id}>
          <TableRow 
            className={`group transition-all duration-200
              ${highlightedRow === auction.id ? 'bg-primary/5' : 'hover:bg-muted/50'} 
              ${sortField && lastSortedField === sortField ? 'animate-fade-in' : ''}
              ${isLoading ? 'opacity-50' : 'opacity-100'}
              ${selectedRows.includes(auction.id) ? 'bg-primary/10' : ''}
              ${expandedRow === auction.id ? 'border-b-0 border-x border-t rounded-t-md border-primary/30' : ''}`}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => toggleRowExpansion(auction.id)}
            isSelected={selectedRows.includes(auction.id)}
            isExpanded={expandedRow === auction.id}
          >
            <TableCell className="w-[40px]" onClick={(e) => e.stopPropagation()}>
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer transition-all"
                checked={selectedRows.includes(auction.id)}
                onChange={() => toggleRowSelection(auction.id)}
              />
            </TableCell>
            <TableCell className="font-medium">{auction.id}</TableCell>
            <TableCell className="max-w-[200px] truncate">{auction.title}</TableCell>
            <TableCell>
              <StatusBadge status={auction.status} />
            </TableCell>
            <TableCell>
              <span className="font-medium transition-all group-hover:text-primary">
                ${auction.currentBid.toLocaleString()}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                {auction.bidders}
                {auction.bidders > 20 && (
                  <Badge 
                    variant="outline" 
                    className="ml-2 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 animate-pulse-soft"
                  >
                    Hot
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                {auction.endDate}
              </div>
            </TableCell>
            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
              <TableRowActions 
                id={auction.id} 
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </TableCell>
          </TableRow>
          
          {expandedRow === auction.id && (
            <TableRow className="bg-muted/30 border-x border-b rounded-b-md border-primary/30 animate-fade-in">
              <TableCell colSpan={8} className="p-0">
                <ExpandedRow auction={auction} onEdit={onEdit} />
              </TableCell>
            </TableRow>
          )}
        </React.Fragment>
      ))}
    </TableBody>
  );
};

export default AuctionTableBody;
