
import { useState, useMemo } from 'react';
import { toast } from "sonner";
import { AuctionItem } from './types';

export const useAuctionTable = (data: AuctionItem[]) => {
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

  return {
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    sortField,
    sortDirection,
    isLoading,
    highlightedRow,
    lastSortedField,
    selectedRows,
    showFilters,
    setShowFilters,
    expandedRow,
    searchTerm,
    setSearchTerm,
    filteredData,
    currentItems,
    indexOfFirstItem,
    indexOfLastItem,
    totalPages,
    handleSort,
    toggleRowSelection,
    toggleSelectAll,
    toggleRowExpansion,
    handleBulkAction,
    loadMore,
    refreshData,
    exportData,
    paginate,
    nextPage,
    prevPage
  };
};
