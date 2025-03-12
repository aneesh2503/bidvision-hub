
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, Clock, DollarSign, Gavel, Package, ShieldCheck, Trophy } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">How Our Auctions Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our auction platform makes it easy to discover and bid on exclusive items. Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-l-4 border-l-primary bg-card/50 animate-fade-in">
            <CardHeader>
              <div className="mb-2 bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>1. Create an Account</CardTitle>
              <CardDescription>Sign up to participate in auctions and track your bids</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Registration is quick and free. Once verified, you can browse all available auctions and set up your bidding preferences.</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary bg-card/50 animate-fade-in animate-delay-100">
            <CardHeader>
              <div className="mb-2 bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                <Gavel className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>2. Place Your Bids</CardTitle>
              <CardDescription>Set your maximum bid and let our system handle the rest</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Enter the maximum amount you're willing to pay, and our automatic bidding system will incrementally increase your bid as needed, up to your limit.</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary bg-card/50 animate-fade-in animate-delay-200">
            <CardHeader>
              <div className="mb-2 bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>3. Win & Collect</CardTitle>
              <CardDescription>Complete payment and arrange delivery of your item</CardDescription>
            </CardHeader>
            <CardContent>
              <p>If you win, you'll be notified immediately. Secure payment processing and tracked shipping ensure your item arrives safely.</p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <div className="mb-4 bg-secondary/50 w-12 h-12 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Bidding</h3>
            <p className="text-muted-foreground">Watch bids update instantly and receive notifications as auctions near closing.</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="mb-4 bg-secondary/50 w-12 h-12 rounded-full flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Transactions</h3>
            <p className="text-muted-foreground">All payments are processed through our encrypted platform with buyer protection.</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="mb-4 bg-secondary/50 w-12 h-12 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Items</h3>
            <p className="text-muted-foreground">Each item is authenticated and verified before listing to ensure quality and authenticity.</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="mb-4 bg-secondary/50 w-12 h-12 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Transparent Fees</h3>
            <p className="text-muted-foreground">No hidden costs. Our fee structure is clear and competitive for both buyers and sellers.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
