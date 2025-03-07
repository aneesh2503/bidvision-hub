
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuctionCard from '@/components/AuctionCard';
import { Heart } from 'lucide-react';

// This would come from an API in a real application
const ALL_AUCTIONS = [
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
  },
  {
    id: '4',
    title: 'Designer Handbag',
    description: 'Limited edition designer handbag from the latest collection, never used with tags.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 2800,
    timeLeft: '3d 8h',
    bids: 19,
  },
  {
    id: '5',
    title: 'Rare Coin Collection',
    description: 'Collection of rare ancient coins from various civilizations with authentication certificates.',
    image: 'https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 6700,
    timeLeft: '12h 30m',
    bids: 31,
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteAuctions, setFavoriteAuctions] = useState<any[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    setFavorites(parsedFavorites);
    
    // Filter auctions to only include favorites
    const filteredAuctions = ALL_AUCTIONS.filter(auction => 
      parsedFavorites.includes(auction.id)
    );
    setFavoriteAuctions(filteredAuctions);
  }, []);

  const handleRemoveFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter(itemId => itemId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    // Update the displayed auctions
    const updatedAuctions = favoriteAuctions.filter(auction => auction.id !== id);
    setFavoriteAuctions(updatedAuctions);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex items-center mb-10">
            <Heart className="mr-3 text-primary h-6 w-6 fill-primary" />
            <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
          </div>
          
          {favoriteAuctions.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Browse our auctions and click the heart icon on items you're interested in to add them to your favorites.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteAuctions.map((auction) => (
                <AuctionCard 
                  key={auction.id} 
                  {...auction}
                  className="opacity-0 animate-fade-in"
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
