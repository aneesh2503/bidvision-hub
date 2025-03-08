
import { useState, useEffect } from 'react';
import { Heart, Clock, AlertCircle, HandCoins, Tag, Sparkles, Star, Gem } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

interface AuctionCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  currentBid: number;
  timeLeft: string;
  bids: number;
  category?: string;
  condition?: string;
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
  category,
  condition,
  className = '',
}: AuctionCardProps) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  
  // Check if the item is in favorites when component mounts
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setLiked(parsedFavorites.includes(id));
    }
  }, [id]);
  
  const handleLike = (e: React.MouseEvent) => {
    // Prevent click from propagating to the card
    e.stopPropagation();
    
    const newLikedState = !liked;
    setLiked(newLikedState);
    
    // Update localStorage
    const savedFavorites = localStorage.getItem('favorites');
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    if (newLikedState) {
      // Add to favorites
      if (!favorites.includes(id)) {
        favorites.push(id);
        toast.success("Added to favorites");
      }
    } else {
      // Remove from favorites
      const updatedFavorites = favorites.filter((itemId: string) => itemId !== id);
      toast("Removed from favorites");
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return;
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  
  const navigateToDetails = () => {
    navigate(`/auction/${id}`);
  };
  
  // Get badge color based on category
  const getCategoryColor = () => {
    switch(category) {
      case 'art': return 'bg-purple-500 hover:bg-purple-600';
      case 'collectibles': return 'bg-amber-500 hover:bg-amber-600';
      case 'electronics': return 'bg-blue-500 hover:bg-blue-600';
      case 'fashion': return 'bg-pink-500 hover:bg-pink-600';
      case 'furniture': return 'bg-emerald-500 hover:bg-emerald-600';
      case 'jewelry': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'watches': return 'bg-slate-500 hover:bg-slate-600';
      case 'vehicles': return 'bg-red-500 hover:bg-red-600';
      case 'antiquities': return 'bg-orange-500 hover:bg-orange-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  // Get condition badge style
  const getConditionStyle = () => {
    switch(condition) {
      case 'new': return 'bg-green-500 hover:bg-green-600';
      case 'like-new': return 'bg-emerald-500 hover:bg-emerald-600';
      case 'excellent': return 'bg-teal-500 hover:bg-teal-600';
      case 'good': return 'bg-blue-500 hover:bg-blue-600';
      case 'fair': return 'bg-amber-500 hover:bg-amber-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  // Get icon based on category
  const getCategoryIcon = () => {
    switch(category) {
      case 'art': return <Sparkles className="h-3 w-3 mr-1" />;
      case 'collectibles': return <Star className="h-3 w-3 mr-1" />;
      case 'jewelry': return <Gem className="h-3 w-3 mr-1" />;
      default: return <Tag className="h-3 w-3 mr-1" />;
    }
  };
  
  // Determine if item is high value (for special highlighting)
  const isHighValue = currentBid > 10000;
  
  return (
    <Card 
      className={`overflow-hidden auction-card-scale ${className} cursor-pointer transition-all 
        hover:shadow-lg ${isHighValue ? 'border-amber-300 border-2' : ''}`}
      onClick={navigateToDetails}
    >
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
            transition-colors hover:bg-white z-10`}
        >
          <Heart className={`h-5 w-5 ${liked ? 'fill-red-500' : ''}`} />
        </button>
        
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center text-xs">
          <Clock className="h-3 w-3 mr-1" />
          {timeLeft}
        </div>
        
        {isHighValue && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-300 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Premium Item
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Current Bid</p>
            <p className={`text-xl font-bold ${isHighValue ? 'text-amber-600' : ''}`}>
              ${currentBid.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Bids</p>
            <p className="text-base font-medium">{bids}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {category && (
            <Badge className={`${getCategoryColor()} text-white flex items-center`}>
              {getCategoryIcon()}
              {category}
            </Badge>
          )}
          {condition && (
            <Badge className={`${getConditionStyle()} text-white`}>
              {condition}
            </Badge>
          )}
        </div>
        
        <div className="mt-4 flex items-center text-xs text-muted-foreground">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>Bid at least ${(currentBid + 50).toLocaleString()}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          className={`w-full ${isHighValue ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700' : ''}`} 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/auction/${id}`);
          }}
        >
          <HandCoins className="mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuctionCard;
