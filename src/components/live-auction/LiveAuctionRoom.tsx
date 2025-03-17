
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  MessageSquare,
  ArrowLeft,
  Clock,
  Gavel,
  Flame,
  ShieldAlert,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { auctionItems } from '@/data/auctionItems';

// Mock data for the live auction
const mockAuction = {
  id: 'live-1',
  title: "Rare Vintage Watch Collection",
  description: "A collection of rare vintage watches from the early 20th century, including pieces from renowned watchmakers.",
  image: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  startingBid: 5000,
  currentBid: 7250,
  incrementAmount: 250,
  endsAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
  auctioneer: {
    name: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  }
};

// Mock data for auction participants
const mockParticipants = [
  { id: 'user1', name: 'Emily Chen', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', bidCount: 5 },
  { id: 'user2', name: 'Michael Johnson', avatar: 'https://randomuser.me/api/portraits/men/33.jpg', bidCount: 3 },
  { id: 'user3', name: 'Sarah Williams', avatar: 'https://randomuser.me/api/portraits/women/66.jpg', bidCount: 2 },
  { id: 'user4', name: 'Alex Thompson', avatar: 'https://randomuser.me/api/portraits/men/41.jpg', bidCount: 1 },
  { id: 'user5', name: 'Olivia Parker', avatar: 'https://randomuser.me/api/portraits/women/32.jpg', bidCount: 0 },
  { id: 'current', name: 'You', avatar: '', bidCount: 0 },
];

// Mock messages for the auction chat
const initialMessages = [
  { id: 'm1', userId: 'auctioneer', name: 'Auctioneer', message: 'Welcome everyone to our live auction! We\'ll be starting in a few moments.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  { id: 'm2', userId: 'user1', name: 'Emily Chen', message: 'Excited to be here! Those watches look amazing.', timestamp: new Date(Date.now() - 1000 * 60 * 4) },
  { id: 'm3', userId: 'system', name: 'System', message: 'The auction has started! Opening bid is $5,000.', timestamp: new Date(Date.now() - 1000 * 60 * 3) },
  { id: 'm4', userId: 'user1', name: 'Emily Chen', message: 'I\'ll open with $5,000!', timestamp: new Date(Date.now() - 1000 * 60 * 2) },
  { id: 'm5', userId: 'user2', name: 'Michael Johnson', message: '$5,250!', timestamp: new Date(Date.now() - 1000 * 60 * 1) },
  { id: 'm6', userId: 'user1', name: 'Emily Chen', message: '$5,500', timestamp: new Date(Date.now() - 1000 * 30) },
  { id: 'm7', userId: 'user3', name: 'Sarah Williams', message: '$6,000', timestamp: new Date(Date.now() - 1000 * 20) },
  { id: 'm8', userId: 'user2', name: 'Michael Johnson', message: '$6,500!', timestamp: new Date(Date.now() - 1000 * 10) },
  { id: 'm9', userId: 'user1', name: 'Emily Chen', message: '$7,000', timestamp: new Date(Date.now() - 1000 * 5) },
  { id: 'm10', userId: 'user4', name: 'Alex Thompson', message: '$7,250', timestamp: new Date() },
];

interface LiveAuctionRoomProps {
  roomId: string;
}

const LiveAuctionRoom: React.FC<LiveAuctionRoomProps> = ({ roomId }) => {
  const navigate = useNavigate();
  const [auction, setAuction] = useState(mockAuction);
  const [participants, setParticipants] = useState(mockParticipants);
  const [messages, setMessages] = useState(initialMessages);
  const [messageInput, setMessageInput] = useState('');
  const [bidAmount, setBidAmount] = useState(auction.currentBid + auction.incrementAmount);
  const [timeLeft, setTimeLeft] = useState('');
  const [isHighlightingBid, setIsHighlightingBid] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Update time left display
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = auction.endsAt.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft('Auction ended');
        clearInterval(interval);
        return;
      }
      
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes}m ${seconds}s`);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [auction.endsAt]);
  
  // Handle sending a chat message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: `m${messages.length + 1}`,
      userId: 'current',
      name: 'You',
      message: messageInput,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };
  
  // Handle placing a bid
  const handlePlaceBid = () => {
    if (bidAmount <= auction.currentBid) {
      toast.error('Your bid must be higher than the current bid');
      return;
    }
    
    // Highlight the bid amount temporarily
    setIsHighlightingBid(true);
    setTimeout(() => setIsHighlightingBid(false), 2000);
    
    // Update auction state
    setAuction({
      ...auction,
      currentBid: bidAmount
    });
    
    // Add participant's bid to the list and update their bid count
    const updatedParticipants = participants.map(p => 
      p.id === 'current' ? { ...p, bidCount: p.bidCount + 1 } : p
    );
    setParticipants(updatedParticipants);
    
    // Add system message
    const newMessage = {
      id: `m${messages.length + 1}`,
      userId: 'system',
      name: 'System',
      message: `You placed a bid of $${bidAmount.toLocaleString()}`,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    
    // Set next minimum bid
    setBidAmount(bidAmount + auction.incrementAmount);
    
    toast.success('Bid placed successfully!');
  };
  
  // Format timestamp for chat messages
  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="container mx-auto px-4 animate-fade-in">
      <div className="mb-4">
        <Button 
          variant="ghost" 
          className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:translate-x-[-5px]"
          onClick={() => navigate('/live-auctions')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Live Auctions
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Auction details */}
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <div>
                <span className="text-xl md:text-2xl">{auction.title}</span>
                <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  <Flame className="h-3 w-3 mr-1" /> Live
                </Badge>
              </div>
              <div className="flex items-center text-red-500 font-medium">
                <Clock className="h-4 w-4 mr-1" />
                <span>{timeLeft}</span>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pb-6">
            <div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
              <img 
                src={auction.image} 
                alt={auction.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{auction.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`rounded-lg p-4 transition-all ${isHighlightingBid ? 'bg-green-100 scale-105 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                <p className="text-sm text-muted-foreground">Current Bid</p>
                <p className="text-2xl font-bold">${auction.currentBid.toLocaleString()}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Minimum Increment</p>
                <p className="text-2xl font-bold">${auction.incrementAmount}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="text-lg font-medium"
                  min={auction.currentBid + auction.incrementAmount}
                  step={auction.incrementAmount}
                />
                <Button onClick={handlePlaceBid} className="whitespace-nowrap">
                  <Gavel className="h-4 w-4 mr-2" />
                  Place Bid
                </Button>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Minimum bid: ${(auction.currentBid + auction.incrementAmount).toLocaleString()}</span>
                <span>Auctioneer: {auction.auctioneer.name}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Right column: Participants and Chat */}
        <Card className="min-h-[600px] flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Button variant="ghost" className="px-2 py-1 h-8">
                  <Users className="h-4 w-4" />
                  <span className="ml-1">{participants.length}</span>
                </Button>
                <Separator orientation="vertical" className="h-6 mx-2" />
                <Button variant="ghost" className="px-2 py-1 h-8">
                  <MessageSquare className="h-4 w-4" />
                  <span className="ml-1">{messages.length}</span>
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate(`/auction/${auction.id}`)}>
                View Item
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow flex flex-col gap-4 pt-4 pb-0">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Users className="h-4 w-4 mr-1" /> Participants
              </h3>
              <div className="flex flex-wrap gap-2">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-sm">
                    <Avatar className="h-6 w-6 mr-1">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="truncate max-w-[80px]">{participant.name}</span>
                    {participant.bidCount > 0 && (
                      <Badge variant="secondary" className="ml-1 h-5 min-w-[20px]">
                        {participant.bidCount}
                      </Badge>
                    )}
                    {participant.id === 'current' && (
                      <span className="ml-1 text-xs text-blue-500">(You)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-grow flex flex-col">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" /> Auction Chat
              </h3>
              <ScrollArea className="flex-grow border rounded-lg p-3 h-[300px]">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.userId === 'current' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-2 text-sm ${
                        message.userId === 'system' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                          : message.userId === 'auctioneer'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                            : message.userId === 'current'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        <div className="flex justify-between items-baseline gap-2 mb-1">
                          <span className="font-medium">
                            {message.userId === 'auctioneer' && <Crown className="h-3 w-3 inline mr-1" />}
                            {message.userId === 'system' && <ShieldAlert className="h-3 w-3 inline mr-1" />}
                            {message.name}
                          </span>
                          <span className="text-xs opacity-70">{formatTimestamp(message.timestamp)}</span>
                        </div>
                        <p>{message.message}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </ScrollArea>
            </div>
          </CardContent>
          
          <CardFooter className="pt-4">
            <form onSubmit={handleSendMessage} className="w-full flex gap-2">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow"
              />
              <Button type="submit" variant="secondary">Send</Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LiveAuctionRoom;
