
import React from 'react';
import { Heart, Clock } from 'lucide-react';
import { isHighValueAuction } from '@/utils/auctionCardUtils';

interface AuctionCardImageProps {
  image: string;
  title: string;
  timeLeft: string;
  currentBid: number;
  liked: boolean;
  onLikeClick: (e: React.MouseEvent) => void;
}

const AuctionCardImage = ({
  image,
  title,
  timeLeft,
  currentBid,
  liked,
  onLikeClick
}: AuctionCardImageProps) => {
  const isHighValue = isHighValueAuction(currentBid);
  
  return (
    <div className="relative">
      <img 
        src={image} 
        alt={title} 
        className="h-52 w-full object-cover transition-transform hover:scale-105 duration-700"
      />
      <button 
        onClick={onLikeClick}
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
  );
};

export default AuctionCardImage;
