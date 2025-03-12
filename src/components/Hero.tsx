
import { ArrowRight, Award, ShieldCheck, Clock } from 'lucide-react';
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
              <Button size="lg" variant="outline" asChild>
                <Link to="/how-it-works">
                  How It Works
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
