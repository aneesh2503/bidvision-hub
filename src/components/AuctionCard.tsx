
import { useState } from 'react';
import { Heart, Clock, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";
import PaymentModal from './PaymentModal';

interface AuctionCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  currentBid: number;
  timeLeft: string;
  bids: number;
  className?: string;
}

const AuctionCard = ({
  id,
  title,
  description,
  image,
  currentBid,
  timeLeft,
  bids,
  className = '',
}: AuctionCardProps) => {
  const [liked, setLiked] = useState(false);
  const [bidAmount, setBidAmount] = useState(currentBid + 50);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      toast.success("Added to favorites");
    } else {
      toast("Removed from favorites");
    }
  };
  
  const handleBid = () => {
    setShowPaymentModal(true);
  };
  
  const handlePaymentComplete = () => {
    toast.success(`Bid placed: $${bidAmount}`);
    setBidAmount(bidAmount + 50);
  };
  
  return (
    <>
      <Card className={`overflow-hidden auction-card-scale ${className}`}>
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="h-52 w-full object-cover transition-transform hover:scale-105 duration-700"
          />
          <button 
            onClick={handleLike}
            className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm
              ${liked ? 'text-red-500' : 'text-gray-600'} 
              transition-colors hover:bg-white`}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-red-500' : ''}`} />
          </button>
          
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {timeLeft}
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Current Bid</p>
              <p className="text-xl font-bold">${currentBid.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Bids</p>
              <p className="text-base font-medium">{bids}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center text-xs text-muted-foreground">
            <AlertCircle className="h-3 w-3 mr-1" />
            <span>Bid at least ${(currentBid + 50).toLocaleString()}</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button className="w-full" onClick={handleBid}>
            Place Bid (${bidAmount.toLocaleString()})
          </Button>
        </CardFooter>
      </Card>
      
      <PaymentModal 
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        bidAmount={bidAmount}
        auctionTitle={title}
        onConfirm={handlePaymentComplete}
      />
    </>
  );
};

export default AuctionCard;
