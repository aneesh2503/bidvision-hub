
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Clock, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for live auctions
const liveAuctions = [
  {
    id: 'live-1',
    title: "Rare Vintage Watch Collection",
    description: "A collection of rare vintage watches from the early 20th century.",
    image: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    participants: 18,
    startingBid: 5000,
    currentBid: 7250,
    endsAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    status: 'live',
  },
  {
    id: 'live-2',
    title: "Modern Art Masterpiece",
    description: "An exceptional piece from a renowned contemporary artist.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    participants: 24,
    startingBid: 12000,
    currentBid: 15750,
    endsAt: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    status: 'live',
  },
  {
    id: 'live-3',
    title: "Luxury Sports Car",
    description: "A pristine condition classic luxury sports car with full service history.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    participants: 32,
    startingBid: 85000,
    currentBid: 92500,
    endsAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    status: 'live',
  },
];

// Mock data for upcoming auctions
const upcomingAuctions = [
  {
    id: 'upcoming-1',
    title: "Antique Jewelry Collection",
    description: "A stunning collection of antique jewelry pieces from the Victorian era.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    startingBid: 8000,
    startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
    status: 'upcoming',
  },
  {
    id: 'upcoming-2',
    title: "Rare Book Collection",
    description: "First editions and signed copies from legendary authors of the 20th century.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    startingBid: 6500,
    startsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    status: 'upcoming',
  },
  {
    id: 'upcoming-3',
    title: "Premium Wine Collection",
    description: "Rare vintage wines from renowned vineyards across Europe.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    startingBid: 12000,
    startsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    status: 'upcoming',
  },
];

// Format time for display
const formatTimeLeft = (date: Date) => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

// Format date for upcoming auctions
const formatStartDate = (date: Date) => {
  return date.toLocaleDateString(undefined, { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const AvailableLiveAuctions = () => {
  const navigate = useNavigate();
  
  return (
    <Tabs defaultValue="live" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="live" className="flex items-center">
          <Flame className="h-4 w-4 mr-1" /> Live Now
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" /> Upcoming
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="live" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveAuctions.map((auction) => (
            <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={auction.image} 
                  alt={auction.title} 
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                  <Flame className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{auction.title}</CardTitle>
                <CardDescription className="line-clamp-2">{auction.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Bid</p>
                    <p className="font-semibold">${auction.currentBid.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Ends In</p>
                    <p className="font-semibold text-red-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTimeLeft(auction.endsAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{auction.participants} participants active</span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/live-auctions/${auction.id}`)}
                >
                  Join Auction Room
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="upcoming" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingAuctions.map((auction) => (
            <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={auction.image} 
                  alt={auction.title} 
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">
                  <Calendar className="h-3 w-3 mr-1" />
                  Upcoming
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{auction.title}</CardTitle>
                <CardDescription className="line-clamp-2">{auction.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Starting Bid</p>
                    <p className="font-semibold">${auction.startingBid.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Starts At</p>
                    <p className="font-semibold flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatStartDate(auction.startsAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate(`/live-auctions/${auction.id}`)}
                >
                  Set Reminder
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AvailableLiveAuctions;
