
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { ClipboardList, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-10">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo variant="default" />
        
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/logs" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1.5">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Logs</span>
          </Link>
          <Link to="/admin">
            <Button variant="secondary" size="sm" className="flex items-center gap-1.5">
              <LayoutDashboard className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Button>
          </Link>
          <Button size="sm">Sign In</Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
