
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  CalendarRange, 
  DollarSign, 
  ShieldAlert, 
  Bookmark, 
  ArrowUpRight, 
  Edit 
} from 'lucide-react';
import { toast } from "sonner";
import { AuctionItem } from './types';
import StatusBadge from './StatusBadge';

interface ExpandedRowProps {
  auction: AuctionItem;
  onEdit?: (id: string) => void;
}

const ExpandedRow: React.FC<ExpandedRowProps> = ({ auction, onEdit }) => {
  return (
    <div className="p-4">
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
              <StatusBadge status={auction.status} />
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
          onEdit && onEdit(auction.id);
        }}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Auction
        </Button>
      </div>
    </div>
  );
};

export default ExpandedRow;
