
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import FeaturedAuctions from '@/components/FeaturedAuctions';
import AuctionGrid from '@/components/AuctionGrid';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedAuctions />
        <HowItWorks />
        <AuctionGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
