
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Bell, Search } from 'lucide-react';
import Logo from './Logo';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search auctions..." 
                className="pl-9 w-[250px] bg-secondary border-none" 
              />
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-base font-medium hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/#auctions" className="text-base font-medium hover:text-accent transition-colors">
              Auctions
            </Link>
            <Link to="/admin" className="text-base font-medium hover:text-accent transition-colors">
              Admin
            </Link>
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
            <Button>
              Sign In
            </Button>
          </nav>
          
          <button 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 animate-fade-in">
          <div className="flex flex-col space-y-4 mb-4">
            <Link 
              to="/" 
              className="text-lg font-medium p-2 hover:bg-secondary rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/#auctions" 
              className="text-lg font-medium p-2 hover:bg-secondary rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Auctions
            </Link>
            <Link 
              to="/admin" 
              className="text-lg font-medium p-2 hover:bg-secondary rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search auctions..." 
              className="pl-9 w-full bg-secondary border-none" 
            />
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" className="w-[48%]">
              <User size={16} className="mr-2" />
              Profile
            </Button>
            <Button className="w-[48%]">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
