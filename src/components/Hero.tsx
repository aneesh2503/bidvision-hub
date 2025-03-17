
import { ArrowRight, Award, ShieldCheck, Clock, Flame, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 hero-gradient -z-10"></div>
      <div className="absolute -top-5 -right-5 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8 max-w-2xl animate-slide-down">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-2">
              <span className="animate-pulse-soft mr-2">●</span> Live Auctions Available
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Discover and Bid on <span className="text-accent">Exclusive</span> Items
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Join our premium auction platform where you can find unique items and participate in exciting bidding experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <Link to="/explore">
                  Explore Auctions
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                asChild
              >
                <Link to="/how-it-works">
                  How It Works
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600 text-white font-medium shadow-lg group"
                asChild
              >
                <Link to="/live-auctions" className="flex items-center">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgY3g9IjUwJSIgY3k9IjUwJSIgZng9IjUwJSIgZnk9IjUwJSIgcj0iNTAlIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9InBhaW50MF9yYWRpYWwiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmY0IiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjZmZmMCIgb2Zmc2V0PSIxIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9InVybCgjcGFpbnQwX3JhZGlhbCkiLz48L3N2Zz4=')] opacity-20 animate-pulse-soft"></div>
                  <div className="flex items-center relative z-10">
                    <div className="relative">
                      <Flame className="mr-2 h-5 w-5 text-yellow-200 animate-pulse-soft" />
                      <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-100 animate-pulse-soft" />
                    </div>
                    <span className="mr-2">Live Auctions</span>
                    <span className="inline-flex items-center justify-center rounded-full bg-white/20 px-1.5 py-0.5 text-xs font-semibold text-white animate-pulse-soft">HOT</span>
                  </div>
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center">
                <div className="mr-3 bg-secondary p-2 rounded-full">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Quality Verified</p>
                  <p className="text-sm text-muted-foreground">All items are authentic</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="mr-3 bg-secondary p-2 rounded-full">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Secure Bidding</p>
                  <p className="text-sm text-muted-foreground">Protected transactions</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="mr-3 bg-secondary p-2 rounded-full">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Real-time Updates</p>
                  <p className="text-sm text-muted-foreground">Live bidding notifications</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full md:w-auto animate-slide-up">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/30 to-primary/30 rounded-2xl blur-md"></div>
              <div className="glass-card rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80" 
                  alt="Premium auction items" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-accent font-medium mb-2">Featured Item</p>
                  <h3 className="text-xl font-bold mb-3">Luxury Mid-Century Modern Chair</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Bid</p>
                      <p className="text-2xl font-bold">$1,250</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Time Left</p>
                      <p className="text-base font-medium">12h 30m 15s</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Place Bid</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
