
import { useParams, useNavigate } from 'react-router-dom';
import { HandCoins } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PaymentModal from '@/components/PaymentModal';
import { useState } from 'react';
import { toast } from "sonner";

// Import the auction items data from AuctionGrid to ensure consistency
const AUCTION_ITEMS = [
  {
    id: '1',
    title: 'Vintage Rolex Submariner',
    description: 'Authentic 1970 Rolex Submariner in excellent condition with original box and papers. This timepiece features a classic black dial with luminous hour markers, a rotatable bezel, and is powered by an automatic movement. The watch has been professionally serviced and maintains excellent timekeeping accuracy. Includes original documentation, box, and service history.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 8500,
    timeLeft: '2d 5h 20m',
    bids: 23,
    category: 'watches',
    condition: 'Excellent',
    startingPrice: 5000,
    seller: 'Luxury Timepieces Ltd',
    location: 'Geneva, Switzerland',
    history: '3 previous owners, Full service history'
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
    condition: 'New',
    startingPrice: 2000,
    seller: 'Modern Art Gallery',
    location: 'New York, USA',
    history: 'Original creation, first auction'
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
    condition: 'Good',
    startingPrice: 3000,
    seller: 'Antique Treasures',
    location: 'London, UK',
    history: 'Belonged to a Victorian-era writer'
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
    condition: 'Excellent',
    startingPrice: 4000,
    seller: 'Rare Books Collector',
    location: 'Boston, USA',
    history: 'Preserved in climate-controlled environment'
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
    condition: 'Good',
    startingPrice: 1500,
    seller: 'Vintage Tech',
    location: 'Berlin, Germany',
    history: 'From a professional photographer's estate'
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
    condition: 'Like New',
    startingPrice: 1200,
    seller: 'Luxury Reseller',
    location: 'Paris, France',
    history: 'Limited edition, one of only 500 made'
  },
];

const AuctionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  
  // Find the auction item by ID
  const item = AUCTION_ITEMS.find(item => item.id === id);
  
  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const handleBid = () => {
    setBidAmount(item.currentBid + 50);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    toast.success(`Bid placed: $${bidAmount}`);
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full rounded-lg object-cover aspect-square"
          />
        </div>
        
        <div className="space-y-6">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate('/')}
          >
            ← Back to Auctions
          </Button>
          
          <h1 className="text-3xl font-bold">{item.title}</h1>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Bid</p>
              <p className="text-2xl font-bold">${item.currentBid.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Time Left</p>
              <p className="text-xl font-semibold">{item.timeLeft}</p>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Item Details</h3>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground">Condition</dt>
                <dd className="font-medium">{item.condition}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Starting Price</dt>
                <dd className="font-medium">${item.startingPrice.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Seller</dt>
                <dd className="font-medium">{item.seller}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Location</dt>
                <dd className="font-medium">{item.location}</dd>
              </div>
            </dl>
          </div>
          
          <Button 
            size="lg" 
            className="w-full mt-8" 
            onClick={handleBid}
          >
            <HandCoins className="mr-2" />
            Place Bid (${(item.currentBid + 50).toLocaleString()})
          </Button>
        </div>
      </div>

      <PaymentModal 
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        bidAmount={bidAmount}
        auctionTitle={item.title}
        onConfirm={handlePaymentComplete}
      />
    </div>
  );
};

export default AuctionDetails;
