
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-accent/5 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">How Our Auction Platform Works</h1>
          <p className="text-muted-foreground text-center mt-3 max-w-2xl mx-auto">
            Learn everything you need to know about bidding, winning, and receiving items from our platform
          </p>
        </div>
      </div>
      <main className="flex-1">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
