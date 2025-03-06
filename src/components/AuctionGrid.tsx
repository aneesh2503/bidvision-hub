
import { useState } from 'react';
import { Search, Filter, Clock, CheckCircle2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import AuctionCard from './AuctionCard';

const AUCTION_ITEMS = [
  {
    id: '1',
    title: 'Vintage Rolex Submariner',
    description: 'Authentic 1970 Rolex Submariner in excellent condition with original box and papers.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 8500,
    timeLeft: '2d 5h 20m',
    bids: 23,
    category: 'watches',
  },
  {
    id: '2',
    title: 'Modern Art Painting',
    description: 'Original abstract painting by contemporary artist Jane Doe, acrylic on canvas.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 3200,
    timeLeft: '6h 45m',
    bids: 15,
    category: 'art',
  },
  {
    id: '3',
    title: 'Antique Writing Desk',
    description: 'Early 19th century mahogany writing desk with inlaid leather top and brass hardware.',
    image: 'https://images.unsplash.com/photo-1517705600644-3f68b9b15627?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 4500,
    timeLeft: '1d 12h',
    bids: 8,
    category: 'furniture',
  },
  {
    id: '4',
    title: 'First Edition Book Collection',
    description: 'Set of five first edition novels by Ernest Hemingway, all in pristine condition.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 6200,
    timeLeft: '3d 8h',
    bids: 12,
    category: 'collectibles',
  },
  {
    id: '5',
    title: 'Vintage Camera Collection',
    description: 'Collection of five film cameras from the 1950s-1970s, including Leica, Rolleiflex, and Nikon.',
    image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 2800,
    timeLeft: '5h 20m',
    bids: 18,
    category: 'electronics',
  },
  {
    id: '6',
    title: 'Designer Handbag',
    description: 'Limited edition designer handbag in perfect condition, comes with authentication card.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 1950,
    timeLeft: '2d 3h',
    bids: 7,
    category: 'fashion',
  },
];

const AuctionGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  
  return (
    <section className="py-20" id="auctions">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Current Auctions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse all our available auctions and find something special to bid on today.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search auctions..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setFilterVisible(!filterVisible)}
              className="md:w-auto w-full"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Select defaultValue="newest">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filterVisible && (
            <div className="bg-secondary p-4 rounded-lg mb-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Category</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="collectibles">Collectibles</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="watches">Watches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Price Range</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="0-1000">Under $1,000</SelectItem>
                      <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000+">$10,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Item Condition</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Conditions</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Location</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="north-america">North America</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" className="mr-2">Reset</Button>
                <Button size="sm">Apply Filters</Button>
              </div>
            </div>
          )}
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="ending-soon" className="flex items-center">
                <Clock className="mr-1 h-3 w-3" /> Ending Soon
              </TabsTrigger>
              <TabsTrigger value="new-arrivals">New Arrivals</TabsTrigger>
              <TabsTrigger value="verified" className="flex items-center">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Verified Only
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AUCTION_ITEMS.filter(item => 
                  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.description.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((auction, index) => (
                  <AuctionCard 
                    key={auction.id} 
                    {...auction} 
                    className={`opacity-0 animate-fade-in animate-delay-${(index % 3) + 1}00`}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ending-soon" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AUCTION_ITEMS.filter(item => 
                  item.timeLeft.includes('h') && !item.timeLeft.includes('d')
                ).map((auction, index) => (
                  <AuctionCard 
                    key={auction.id} 
                    {...auction} 
                    className={`opacity-0 animate-fade-in animate-delay-${(index % 3) + 1}00`}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="new-arrivals" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AUCTION_ITEMS.slice(3, 6).map((auction, index) => (
                  <AuctionCard 
                    key={auction.id} 
                    {...auction} 
                    className={`opacity-0 animate-fade-in animate-delay-${(index % 3) + 1}00`}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="verified" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AUCTION_ITEMS.filter((_, index) => index % 2 === 0).map((auction, index) => (
                  <AuctionCard 
                    key={auction.id} 
                    {...auction} 
                    className={`opacity-0 animate-fade-in animate-delay-${(index % 3) + 1}00`}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">Load More</Button>
        </div>
      </div>
    </section>
  );
};

export default AuctionGrid;
