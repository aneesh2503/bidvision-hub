
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Clock, HandCoins, Heart } from 'lucide-react';
import { toast } from "sonner";
import PaymentModal from '@/components/PaymentModal';

// Mock auction data (in a real app, this would come from an API)
import { auctionItems } from '@/data/auctionItems';

const AuctionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  
  useEffect(() => {
    // Find the auction item by id
    const item = auctionItems.find(item => item.id === id);
    
    if (item) {
      setAuction(item);
      setBidAmount(item.currentBid + 50);
      
      // Check if the item is in favorites
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        setLiked(parsedFavorites.includes(item.id));
      }
    }
    
    setLoading(false);
  }, [id]);
  
  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    
    // Update localStorage
    const savedFavorites = localStorage.getItem('favorites');
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    if (newLikedState) {
      // Add to favorites
      if (!favorites.includes(auction.id)) {
        favorites.push(auction.id);
        toast.success("Added to favorites");
      }
    } else {
      // Remove from favorites
      const updatedFavorites = favorites.filter((itemId: string) => itemId !== auction.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      toast("Removed from favorites");
      return;
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  
  const handleBid = () => {
    setShowPaymentModal(true);
  };
  
  const handlePaymentComplete = () => {
    toast.success(`Bid placed: $${bidAmount}`);
    setBidAmount(bidAmount + 50);
  };
  
  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }
  
  if (!auction) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
        <p className="mb-4">The auction item you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column: Image */}
        <div className="relative">
          <img 
            src={auction.image} 
            alt={auction.title} 
            className="w-full rounded-lg shadow-md object-cover"
            style={{ height: '400px' }}
          />
          <button 
            onClick={handleLike}
            className={`absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm
              ${liked ? 'text-red-500' : 'text-gray-600'} 
              transition-colors hover:bg-white z-10`}
          >
            <Heart className={`h-6 w-6 ${liked ? 'fill-red-500' : ''}`} />
          </button>
          
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2" />
            {auction.timeLeft}
          </div>
        </div>
        
        {/* Right column: Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{auction.title}</h1>
          <p className="text-gray-500 mb-6">{auction.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Current Bid</p>
              <p className="text-2xl font-bold">${auction.currentBid.toLocaleString()}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Bids</p>
              <p className="text-2xl font-bold">{auction.bids}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
              Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
              rhoncus ut eleifend nibh porttitor.
            </p>
          </div>
          
          <div className="mb-4 p-4 border border-yellow-200 bg-yellow-50 rounded-lg flex items-start">
            <div className="mr-2 mt-1 text-yellow-500">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-yellow-700">Auction ending soon</p>
              <p className="text-sm text-yellow-600">Place your bid now to avoid missing out on this item!</p>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="w-full py-6 text-lg"
            onClick={handleBid}
          >
            <HandCoins className="mr-2 h-5 w-5" />
            Place Bid (${bidAmount.toLocaleString()})
          </Button>
        </div>
      </div>
      
      <PaymentModal 
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        bidAmount={bidAmount}
        auctionTitle={auction.title}
        onConfirm={handlePaymentComplete}
      />
    </div>
  );
};

export default AuctionDetails;
