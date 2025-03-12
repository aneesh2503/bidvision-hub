
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AuctionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  currentBid: number;
  timeLeft: string;
  bids: number;
  category: string;
  condition: string;
}

interface AuctionListViewProps {
  items: AuctionItem[];
}

const AuctionListView = ({ items }: AuctionListViewProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg transition-all hover:shadow-md"
          onClick={() => navigate(`/auction/${item.id}`)}
        >
          <div className="md:w-48 h-40">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
          </div>
          <div className="flex-1 flex flex-col">
            <h3 className="text-lg font-medium mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
            <div className="mt-auto flex flex-wrap justify-between items-end gap-2">
              <div>
                <span className="text-sm text-muted-foreground block">Current Bid</span>
                <span className="text-lg font-semibold">${item.currentBid.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground block">{item.bids} bids</span>
                <span className="text-sm font-medium text-accent">{item.timeLeft}</span>
              </div>
              <Button 
                size="sm" 
                className="mt-2 w-full md:w-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/auction/${item.id}`);
                }}
              >
                Place Bid
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuctionListView;
