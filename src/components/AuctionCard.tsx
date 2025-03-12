
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";

import { useFavorite } from '@/hooks/useFavorite';
import { isHighValueAuction } from '@/utils/auctionCardUtils';
import AuctionCardImage from './auction-card/AuctionCardImage';
import AuctionCardContent from './auction-card/AuctionCardContent';
import AuctionCardFooter from './auction-card/AuctionCardFooter';

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
  const { liked, handleLike } = useFavorite(id);
  const navigate = useNavigate();
  
  const navigateToDetails = () => {
    navigate(`/auction/${id}`);
  };
  
  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/auction/${id}`);
  };
  
  const isHighValue = isHighValueAuction(currentBid);
  
  return (
    <Card 
      className={`overflow-hidden auction-card-scale ${className} cursor-pointer transition-all 
        hover:shadow-lg ${isHighValue ? 'border-amber-300 border-2' : ''}`}
      onClick={navigateToDetails}
    >
      <AuctionCardImage
        image={image}
        title={title}
        timeLeft={timeLeft}
        currentBid={currentBid}
        liked={liked}
        onLikeClick={handleLike}
      />
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <AuctionCardContent
        currentBid={currentBid}
        bids={bids}
        category={category}
        condition={condition}
      />
      
      <AuctionCardFooter
        currentBid={currentBid}
        id={id}
        onClick={handleDetailsClick}
      />
    </Card>
  );
};

export default AuctionCard;
