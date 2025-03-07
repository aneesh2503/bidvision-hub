
import { useParams, useNavigate } from 'react-router-dom';
import { HandCoins } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PaymentModal from '@/components/PaymentModal';
import { useState } from 'react';
import { toast } from "sonner";

// This would typically come from an API
const AUCTION_ITEMS = {
  '1': {
    id: '1',
    title: 'Vintage Rolex Submariner',
    description: 'Authentic 1970 Rolex Submariner in excellent condition with original box and papers. This timepiece features a classic black dial with luminous hour markers, a rotatable bezel, and is powered by an automatic movement. The watch has been professionally serviced and maintains excellent timekeeping accuracy. Includes original documentation, box, and service history.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    currentBid: 8500,
    timeLeft: '2d 5h 20m',
    bids: 23,
    condition: 'Excellent',
    startingPrice: 5000,
    seller: 'Luxury Timepieces Ltd',
    location: 'Geneva, Switzerland',
    history: '3 previous owners, Full service history'
  },
  // ... Add other items as needed
};

const AuctionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  
  const item = AUCTION_ITEMS[id as keyof typeof AUCTION_ITEMS];
  
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
