
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AuctionCard from './AuctionCard';

const FEATURED_AUCTIONS = [
  {
    id: '1',
    title: 'Vintage Rolex Submariner',
    description: 'Authentic 1970 Rolex Submariner in excellent condition with original box and papers.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 8500,
    timeLeft: '2d 5h 20m',
    bids: 23,
  },
  {
    id: '2',
    title: 'Modern Art Painting',
    description: 'Original abstract painting by contemporary artist Jane Doe, acrylic on canvas.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 3200,
    timeLeft: '6h 45m',
    bids: 15,
  },
  {
    id: '3',
    title: 'Antique Writing Desk',
    description: 'Early 19th century mahogany writing desk with inlaid leather top and brass hardware.',
    image: 'https://images.unsplash.com/photo-1517705600644-3f68b9b15627?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 4500,
    timeLeft: '1d 12h',
    bids: 8,
  }
];

const FeaturedAuctions = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Auctions</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our hand-picked selection of exceptional items up for auction. 
              These premium pieces won't be available for long.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 group">
            View All
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_AUCTIONS.map((auction, index) => (
            <AuctionCard 
              key={auction.id} 
              {...auction} 
              className={`opacity-0 animate-fade-in animate-delay-${index + 1}00`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAuctions;
