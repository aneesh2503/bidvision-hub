
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter, Download, RefreshCw } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from 'lucide-react';
import { TableHeaderProps } from './types';

const AuctionTableHeader: React.FC<TableHeaderProps> = ({
  refreshData,
  isLoading,
  showFilters,
  setShowFilters,
  exportData,
  selectedRows,
  handleBulkAction,
  itemsPerPage,
  setItemsPerPage,
  indexOfFirstItem,
  indexOfLastItem,
  totalItems,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={refreshData}
          disabled={isLoading}
          className="flex items-center transition-all hover:shadow-md"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button 
          variant={showFilters ? "default" : "outline"}
          size="sm" 
          className="flex items-center transition-all hover:shadow-md"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center transition-all hover:shadow-md hover:bg-secondary" 
          onClick={exportData}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        
        {selectedRows.length > 0 && (
          <div className="ml-2 flex items-center animate-fade-in">
            <span className="text-sm font-medium mr-2">{selectedRows.length} selected</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Bulk Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="animate-scale-in">
                <DropdownMenuItem onClick={() => handleBulkAction('export')}>
                  <Download className="h-4 w-4 mr-2" />Export Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction('print')}>
                  <Search className="h-4 w-4 mr-2" />Print Selected
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => handleBulkAction('delete')}
                  className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                >
                  <Search className="h-4 w-4 mr-2" />Delete Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {setSearchTerm && (
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-9 w-40 md:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        <span className="text-sm text-muted-foreground animate-fade-in">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}
        </span>
        <select
          className="text-sm border rounded px-2 py-1 bg-background transition-all hover:shadow-sm focus:ring-2 focus:ring-primary/20"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>
    </div>
  );
};

export default AuctionTableHeader;
