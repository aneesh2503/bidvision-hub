
import { useState } from 'react';

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

const useAuctionFilters = (auctionItems: AuctionItem[]) => {
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

  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 200000]);
    setSelectedCategories([]);
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

  return {
    searchTerm,
    setSearchTerm,
    view,
    setView,
    showFilters,
    setShowFilters,
    priceRange,
    setPriceRange,
    selectedCategories,
    categories,
    toggleCategory,
    filteredItems,
    resetFilters
  };
};

export default useAuctionFilters;
