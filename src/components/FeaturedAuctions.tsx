
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AuctionCard from './AuctionCard';
import { auctionItems } from '@/data/auctionItems';

// Filter items with high bids for the featured section
const FEATURED_AUCTIONS = auctionItems
  .filter(item => item.currentBid > 10000)
  .slice(0, 3);

const FeaturedAuctions = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-yellow-500" />
              Featured Auctions
            </h2>
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
