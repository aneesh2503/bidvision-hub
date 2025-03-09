
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ArrowUpRight,
  Clock,
  Filter,
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Download,
  EyeIcon,
  CalendarRange,
  DollarSign,
  ShieldAlert,
  Bookmark,
  AlertCircle,
  Share2,
  Printer,
  RefreshCw,
} from 'lucide-react';
import { toast } from "sonner";
import DashboardTooltip from "./DashboardTooltip";
import { Card } from "@/components/ui/card";

export interface AuctionItem {
  id: string;
  title: string;
  status: string;
  currentBid: number;
  bidders: number;
  endDate: string;
}

interface AuctionTableProps {
  data: AuctionItem[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

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

  // Get status badge style
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'active': 
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'pending': 
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300';
      case 'ended': 
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      case 'sold':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'canceled':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: 
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Sort the data
  const sortedData = React.useMemo(() => {
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

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Handle sort
  const handleSort = (field: keyof AuctionItem) => {
    setLastSortedField(sortField);
    
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
    
    // Highlight rows briefly when sorting
    currentItems.forEach(item => {
      setTimeout(() => {
        setHighlightedRow(item.id);
        setTimeout(() => setHighlightedRow(null), 300);
      }, Math.random() * 200);
    });

    // Show toast for sorting
    toast(`Sorted by ${field} ${isAsc ? 'descending' : 'ascending'}`);
  };

  // Toggle row selection
  const toggleRowSelection = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Select all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map(item => item.id));
    }
  };

  // Toggle row expansion
  const toggleRowExpansion = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  // Bulk actions
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
    
    // Clear selection after action
    setSelectedRows([]);
  };

  // Simulate loading more data with cursor
  const loadMore = () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      
      // Simulate API call with cursor
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
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Data refreshed");
    }, 800);
  };

  const exportData = () => {
    toast.success("Exporting auction data...");
    // This would typically trigger a CSV or Excel download
  };

  return (
    <div className="space-y-4">
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
                    <Printer className="h-4 w-4 mr-2" />Print Selected
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleBulkAction('delete')}
                    className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground animate-fade-in">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length}
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

      {showFilters && (
        <Card className="p-4 animate-fade-in border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="ended">Ended</option>
                <option value="sold">Sold</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Bid Range</label>
              <div className="flex space-x-2">
                <input placeholder="Min" type="number" className="w-full border rounded px-3 py-2 text-sm" />
                <input placeholder="Max" type="number" className="w-full border rounded px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">End Date</label>
              <div className="flex space-x-2">
                <select className="w-full border rounded px-3 py-2 text-sm">
                  <option value="all">Any Time</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end col-span-3 mt-2">
              <Button variant="outline" size="sm" className="mr-2">Reset</Button>
              <Button size="sm">Apply Filters</Button>
            </div>
          </div>
        </Card>
      )}

      <div className="rounded-md border overflow-hidden transition-all hover:shadow-md">
        <Table>
          <TableHeader className="bg-muted/50">
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
          </TableHeader>
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(auction.status)} transition-all group-hover:shadow-sm`}>
                        {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
                      </span>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-secondary"
                          >
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="animate-scale-in">
                          <DropdownMenuItem 
                            onClick={() => onView(auction.id)} 
                            className="transition-colors hover:text-primary"
                          >
                            <EyeIcon size={14} className="mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onEdit(auction.id)}
                            className="transition-colors hover:text-primary"
                          >
                            <Edit size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="transition-colors hover:text-primary"
                            onClick={() => {
                              toast.success(`Sharing auction ${auction.id}`);
                            }}
                          >
                            <Share2 size={14} className="mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="transition-colors hover:text-primary"
                            onClick={() => {
                              toast.success(`Auction ${auction.id} printed`);
                            }}
                          >
                            <Printer size={14} className="mr-2" />
                            Print
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-500 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-900/30" 
                            onClick={() => onDelete(auction.id)}
                          >
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  
                  {expandedRow === auction.id && (
                    <TableRow className="bg-muted/30 border-x border-b rounded-b-md border-primary/30 animate-fade-in">
                      <TableCell colSpan={8} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold flex items-center">
                              <CalendarRange className="h-4 w-4 mr-2 text-muted-foreground" />
                              Auction Timeline
                            </h4>
                            <div className="mt-2 text-sm">
                              <div className="flex justify-between py-1 border-b">
                                <span>Created:</span>
                                <span>June 12, 2023</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span>Started:</span>
                                <span>June 15, 2023</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span>Ends:</span>
                                <span className="font-medium">{auction.endDate}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold flex items-center">
                              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                              Bid History
                            </h4>
                            <div className="mt-2 text-sm">
                              <div className="flex justify-between py-1 border-b">
                                <span>Starting Price:</span>
                                <span>${(auction.currentBid * 0.6).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span>Total Bids:</span>
                                <span>{auction.bidders}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span>Current Bid:</span>
                                <span className="font-medium text-primary">${auction.currentBid.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold flex items-center">
                              <ShieldAlert className="h-4 w-4 mr-2 text-muted-foreground" />
                              Status Information
                            </h4>
                            <div className="mt-2 text-sm">
                              <div className="flex justify-between py-1 border-b">
                                <span>Current Status:</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(auction.status)}`}>
                                  {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
                                </span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span>Last Updated:</span>
                                <span>Today at 10:42 AM</span>
                              </div>
                              <div className="flex justify-between py-1 border-b">
                                <span>Visibility:</span>
                                <span>Public</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex mt-4 justify-end">
                          <Button variant="outline" size="sm" className="mr-2" onClick={(e) => {
                            e.stopPropagation();
                            toast.success(`${auction.title} added to watchlist`);
                          }}>
                            <Bookmark className="h-4 w-4 mr-2" />
                            Add to Watchlist
                          </Button>
                          <Button variant="outline" size="sm" className="mr-2" onClick={(e) => {
                            e.stopPropagation();
                            window.open(`#/auction/${auction.id}`, '_blank');
                            toast(`Opening auction ${auction.id} details`);
                          }}>
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            Open in New Tab
                          </Button>
                          <Button size="sm" onClick={(e) => {
                            e.stopPropagation();
                            onEdit(auction.id);
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Auction
                          </Button>
                        </div>
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
    </div>
  );
};

export default AuctionTable;

