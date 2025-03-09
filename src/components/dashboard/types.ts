
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
