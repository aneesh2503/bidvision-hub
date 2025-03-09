
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Clock, HandCoins, Heart, ArrowLeft } from 'lucide-react';
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
  const [imageLoaded, setImageLoaded] = useState(false);
  
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
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
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
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-4 min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4 animate-pulse">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 mx-auto rounded"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 mx-auto rounded"></div>
          <div className="h-64 w-full max-w-md bg-gray-200 dark:bg-gray-700 mx-auto rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (!auction) {
    return (
      <div className="container mx-auto p-4 text-center animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
        <p className="mb-4">The auction item you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')} className="transition-all hover:shadow-md">Return to Home</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      {/* Back button */}
      <div className="mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <Button 
          variant="ghost" 
          className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:translate-x-[-5px]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to listings
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column: Image */}
        <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className={`transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <img 
              src={auction.image} 
              alt={auction.title} 
              className="w-full rounded-lg shadow-md object-cover transition-transform hover:scale-[1.02] duration-700"
              style={{ height: '400px' }}
              onLoad={handleImageLoad}
            />
          </div>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" style={{ height: '400px' }}></div>
          )}
          <button 
            onClick={handleLike}
            className={`absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm
              ${liked ? 'text-red-500' : 'text-gray-600'} 
              transition-all hover:bg-white z-10 hover:shadow-md ${liked ? 'hover:scale-110' : 'hover:scale-105'}`}
          >
            <Heart className={`h-6 w-6 ${liked ? 'fill-red-500' : ''} transition-all ${liked ? 'scale-110' : 'scale-100'}`} />
          </button>
          
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center text-sm animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Clock className="h-4 w-4 mr-2" />
            {auction.timeLeft}
          </div>
        </div>
        
        {/* Right column: Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2 animate-fade-in" style={{ animationDelay: '300ms' }}>{auction.title}</h1>
          <p className="text-gray-500 mb-6 animate-fade-in" style={{ animationDelay: '400ms' }}>{auction.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg transition-all hover:shadow-md hover:bg-gray-50 animate-scale-in" style={{ animationDelay: '500ms' }}>
              <p className="text-sm text-gray-500">Current Bid</p>
              <p className="text-2xl font-bold">${auction.currentBid.toLocaleString()}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg transition-all hover:shadow-md hover:bg-gray-50 animate-scale-in" style={{ animationDelay: '600ms' }}>
              <p className="text-sm text-gray-500">Bids</p>
              <p className="text-2xl font-bold">{auction.bids}</p>
            </div>
          </div>
          
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '700ms' }}>
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <p className="text-gray-700">
              This item is available for auction and subject to our terms and conditions. 
              Shipping is available worldwide. The auction winner will be notified immediately 
              after the auction closes. Please review all details and photos carefully before bidding.
            </p>
          </div>
          
          <div className="mb-4 p-4 border border-yellow-200 bg-yellow-50 rounded-lg flex items-start animate-fade-in hover:shadow-md transition-all" style={{ animationDelay: '800ms' }}>
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
            className="w-full py-6 text-lg transition-all hover:shadow-lg animate-fade-in hover:translate-y-[-2px]"
            style={{ animationDelay: '900ms' }}
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
