
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { auctionItems } from '@/data/auctionItems';
import AuctionCard from '@/components/AuctionCard';
import { Badge } from '@/components/ui/badge';

const ExploreAuctions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [...new Set(auctionItems.map(item => item.category))];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredItems = auctionItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = item.currentBid >= priceRange[0] && item.currentBid <= priceRange[1];
    
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(item.category);
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-muted/30 py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Explore Our Auctions
              </h1>
              <p className="text-muted-foreground">
                Discover a wide range of exclusive items available for bidding right now
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search by keywords..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto w-full"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <div className="flex gap-2">
                <Button
                  variant={view === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setView('grid')}
                  className="h-10 w-10"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setView('list')}
                  className="h-10 w-10"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {showFilters && (
              <div className="bg-card rounded-lg p-6 mb-6 border animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Filter Options</h3>
                  <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Price Range</h4>
                    <Slider
                      defaultValue={[0, 200000]}
                      max={200000}
                      step={1000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <Badge 
                          key={category}
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          className="cursor-pointer capitalize"
                          onClick={() => toggleCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-muted-foreground">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
            </p>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No auctions found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 200000]);
                setSelectedCategories([]);
              }}>
                Reset Filters
              </Button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
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
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg transition-all hover:shadow-md">
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
                      <Button size="sm" className="mt-2 w-full md:w-auto">Place Bid</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreAuctions;
