
import { useState } from 'react';
import { Search, Filter, Clock, CheckCircle2, Star, Sparkles, Flame } from 'lucide-react';
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
import { auctionItems } from '@/data/auctionItems';

const AuctionGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');
  
  // Apply filters to auction items
  const filteredItems = auctionItems.filter(item => {
    // Search filter
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    // Price filter
    const matchesPrice = (() => {
      if (priceFilter === 'all') return true;
      if (priceFilter === '0-1000' && item.currentBid < 1000) return true;
      if (priceFilter === '1000-5000' && item.currentBid >= 1000 && item.currentBid < 5000) return true;
      if (priceFilter === '5000-10000' && item.currentBid >= 5000 && item.currentBid < 10000) return true;
      if (priceFilter === '10000+' && item.currentBid >= 10000) return true;
      return false;
    })();
    
    // Condition filter
    const matchesCondition = conditionFilter === 'all' || item.condition === conditionFilter;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesCondition;
  });
  
  const resetFilters = () => {
    setCategoryFilter('all');
    setPriceFilter('all');
    setConditionFilter('all');
  };
  
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
              variant={filterVisible ? "secondary" : "outline"}
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
            <div className="bg-secondary/60 backdrop-blur-sm p-4 rounded-lg mb-6 animate-fade-in border border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="watches">Watches</SelectItem>
                      <SelectItem value="vehicles">Vehicles</SelectItem>
                      <SelectItem value="antiquities">Antiquities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Price Range</label>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
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
                  <Select value={conditionFilter} onValueChange={setConditionFilter}>
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
                <div className="flex items-end">
                  <Button variant="outline" size="sm" className="mr-2" onClick={resetFilters}>Reset</Button>
                  <Button size="sm">Apply Filters</Button>
                </div>
              </div>
            </div>
          )}
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="ending-soon" className="flex items-center">
                <Clock className="mr-1 h-3 w-3" /> Ending Soon
              </TabsTrigger>
              <TabsTrigger value="new-arrivals" className="flex items-center">
                <Sparkles className="mr-1 h-3 w-3" /> New Arrivals
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center">
                <Flame className="mr-1 h-3 w-3" /> Trending
              </TabsTrigger>
              <TabsTrigger value="verified" className="flex items-center">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Verified Only
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((auction, index) => (
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
                {filteredItems.filter(item => 
                  item.timeLeft.includes('hours') || 
                  (item.timeLeft.includes('day') && !item.timeLeft.includes('days'))
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
                {filteredItems.slice(6, 12).map((auction, index) => (
                  <AuctionCard 
                    key={auction.id} 
                    {...auction} 
                    className={`opacity-0 animate-fade-in animate-delay-${(index % 3) + 1}00`}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.filter(item => item.bids > 20).map((auction, index) => (
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
                {filteredItems.filter((_, index) => index % 2 === 0).map((auction, index) => (
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
