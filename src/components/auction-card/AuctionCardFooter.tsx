
import React from 'react';
import { HandCoins } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { isHighValueAuction } from '@/utils/auctionCardUtils';

interface AuctionCardFooterProps {
  currentBid: number;
  id: string;
  onClick: (e: React.MouseEvent) => void;
}

const AuctionCardFooter = ({
  currentBid,
  id,
  onClick
}: AuctionCardFooterProps) => {
  const isHighValue = isHighValueAuction(currentBid);
  
  return (
    <CardFooter className="pt-0">
      <Button 
        className={`w-full ${isHighValue ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700' : ''}`} 
        onClick={onClick}
      >
        <HandCoins className="mr-2" />
        View Details
      </Button>
    </CardFooter>
  );
};

export default AuctionCardFooter;
