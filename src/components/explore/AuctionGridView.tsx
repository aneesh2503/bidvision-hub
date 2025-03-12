
import React from 'react';
import AuctionCard from '@/components/AuctionCard';

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

interface AuctionGridViewProps {
  items: AuctionItem[];
}

const AuctionGridView = ({ items }: AuctionGridViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <AuctionCard 
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
          currentBid={item.currentBid}
          timeLeft={item.timeLeft}
          bids={item.bids}
          category={item.category}
          condition={item.condition}
        />
      ))}
    </div>
  );
};

export default AuctionGridView;
