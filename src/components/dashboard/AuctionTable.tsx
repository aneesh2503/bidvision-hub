import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader as UITableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowDownUp, 
  Clock, 
  RotateCw, 
  AlertCircle 
} from 'lucide-react';
import { toast } from "sonner";
import DashboardTooltip from "./DashboardTooltip";
import { AuctionItem, AuctionTableProps } from "./types";
import StatusBadge from "./StatusBadge";
import TableRowActions from "./TableRowActions";
import ExpandedRow from "./ExpandedRow";
import FilterPanel from "./FilterPanel";
import TablePagination from "./TablePagination";
import AuctionTableHeader from "./AuctionTableHeader";

const AuctionTable = ({ 
  data, 
  onEdit = (id) => toast(`Edit auction ${id}`),
  onDelete = (id) => toast.success(`Auction ${id} deleted`),
  onView = (id) => toast(`View auction ${id}`)
}: AuctionTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState<keyof AuctionItem | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);
  const [lastSortedField, setLastSortedField] = useState<keyof AuctionItem | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const sortedData = useMemo(() => {
    if (!sortField) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortField, sortDirection]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;
    
    return sortedData.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedData, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleSort = (field: keyof AuctionItem) => {
    setLastSortedField(sortField);
    
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
    
    currentItems.forEach(item => {
      setTimeout(() => {
        setHighlightedRow(item.id);
        setTimeout(() => setHighlightedRow(null), 300);
      }, Math.random() * 200);
    });

    toast(`Sorted by ${field} ${isAsc ? 'descending' : 'ascending'}`);
  };

  const toggleRowSelection = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map(item => item.id));
    }
  };

  const toggleRowExpansion = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedRows.length === 0) {
      toast.error("No items selected");
      return;
    }
    
    switch(action) {
      case 'delete':
        toast.success(`Deleted ${selectedRows.length} items`);
        break;
      case 'export':
        toast.success(`Exported ${selectedRows.length} items`);
        break;
      case 'print':
        toast.success(`Printing ${selectedRows.length} items`);
        break;
      default:
        toast(`${action} ${selectedRows.length} items`);
    }
    
    setSelectedRows([]);
  };

  const loadMore = () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      
      setTimeout(() => {
        const lastItem = currentItems[currentItems.length - 1];
        setCursor(lastItem.id);
        nextPage();
        setIsLoading(false);
      }, 500);
    }
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Data refreshed");
    }, 800);
  };

  const exportData = () => {
    toast.success("Exporting auction data...");
  };

  return (
    <div className="space-y-4">
      <AuctionTableHeader
        refreshData={refreshData}
        isLoading={isLoading}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        exportData={exportData}
        selectedRows={selectedRows}
        handleBulkAction={handleBulkAction}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        totalItems={filteredData.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {showFilters && <FilterPanel />}

      <div className="rounded-md border overflow-hidden transition-all hover:shadow-md">
        <Table>
          <UITableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[40px]">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-primary focus:ring-primary/30 h-4 w-4 cursor-pointer transition-all"
                  checked={selectedRows.length === currentItems.length && currentItems.length > 0}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[80px]">
                <div 
                  className="flex items-center cursor-pointer transition-colors hover:text-primary" 
                  onClick={() => handleSort('id')}
                >
                  ID
                  {sortField === 'id' && (
                    <ArrowDownUp className={`h-4 w-4 ml-1 transition-transform duration-300 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer transition-colors hover:text-primary" 
                  onClick={() => handleSort('title')}
                >
                  Item
                  {sortField === 'title' && (
                    <ArrowDownUp className={`h-4 w-4 ml-1 transition-transform duration-300 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer transition-colors hover:text-primary" 
                  onClick={() => handleSort('status')}
                >
                  Status
                  {sortField === 'status' && (
                    <ArrowDownUp className={`h-4 w-4 ml-1 transition-transform duration-300 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer transition-colors hover:text-primary" 
                  onClick={() => handleSort('currentBid')}
                >
                  Current Bid
                  {sortField === 'currentBid' && (
                    <ArrowDownUp className={`h-4 w-4 ml-1 transition-transform duration-300 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                  <DashboardTooltip content="The highest current bid amount" />
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer transition-colors hover:text-primary" 
                  onClick={() => handleSort('bidders')}
                >
                  Bidders
                  {sortField === 'bidders' && (
                    <ArrowDownUp className={`h-4 w-4 ml-1 transition-transform duration-300 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                  <DashboardTooltip content="Number of unique bidders" />
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer transition-colors hover:text-primary" 
                  onClick={() => handleSort('endDate')}
                >
                  End Date
                  {sortField === 'endDate' && (
                    <ArrowDownUp className={`h-4 w-4 ml-1 transition-transform duration-300 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </UITableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((auction, index) => (
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
              ))
            ) : (
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
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
        loadMore={loadMore}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AuctionTable;
