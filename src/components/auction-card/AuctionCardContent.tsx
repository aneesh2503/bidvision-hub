
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { getCategoryColor, getConditionStyle, getCategoryIcon, isHighValueAuction } from '@/utils/auctionCardUtils';

interface AuctionCardContentProps {
  currentBid: number;
  bids: number;
  category?: string;
  condition?: string;
}

const AuctionCardContent = ({
  currentBid,
  bids,
  category,
  condition
}: AuctionCardContentProps) => {
  const isHighValue = isHighValueAuction(currentBid);
  
  return (
    <CardContent className="pb-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Current Bid</p>
          <p className={`text-xl font-bold ${isHighValue ? 'text-amber-600' : ''}`}>
            ${currentBid.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Bids</p>
          <p className="text-base font-medium">{bids}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {category && (
          <Badge className={`${getCategoryColor(category)} text-white flex items-center`}>
            {getCategoryIcon(category)}
            {category}
          </Badge>
        )}
        {condition && (
          <Badge className={`${getConditionStyle(condition)} text-white`}>
            {condition}
          </Badge>
        )}
      </div>
      
      <div className="mt-4 flex items-center text-xs text-muted-foreground">
        <AlertCircle className="h-3 w-3 mr-1" />
        <span>Bid at least ${(currentBid + 50).toLocaleString()}</span>
      </div>
    </CardContent>
  );
};

export default AuctionCardContent;
