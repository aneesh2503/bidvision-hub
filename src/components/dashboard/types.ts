
export interface AuctionItem {
  id: string;
  title: string;
  status: string;
  currentBid: number;
  bidders: number;
  endDate: string;
}

export interface AuctionTableProps {
  data: AuctionItem[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export interface TableHeaderProps {
  refreshData: () => void;
  isLoading: boolean;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  exportData: () => void;
  selectedRows: string[];
  handleBulkAction: (action: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalItems: number;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}
