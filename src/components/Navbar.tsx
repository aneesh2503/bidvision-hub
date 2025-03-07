
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { ClipboardList, LayoutDashboard, Heart, User } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authService } from '@/services/authService';
import { toast } from "sonner";

const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check if user is already signed in
    setIsSignedIn(authService.isAuthenticated());
  }, []);

  const handleSignIn = (provider: string) => {
    try {
      const user = authService.signIn(provider);
      setIsSignedIn(true);
      toast.success(`Signed in successfully as ${user.name}`);
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
    }
  };

  const handleSignOut = () => {
    authService.signOut();
    setIsSignedIn(false);
    toast.info("Signed out successfully");
  };

  return (
    <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-10">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo variant="default" />
        
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/logs" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1.5">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Logs</span>
          </Link>
          
          <Link to="/favorites" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1.5">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Favorites</span>
          </Link>
          
          <Link to="/admin">
            <Button variant="secondary" size="sm" className="flex items-center gap-1.5">
              <LayoutDashboard className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Button>
          </Link>
          
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>My Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">Sign In</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => handleSignIn('email')} className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Email & Password</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSignIn('google')} className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSignIn('facebook')} className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                  </svg>
                  <span>Facebook</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSignIn('apple')} className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.125 0c.117.9.298 1.8.551 2.7.254.9.651 1.728 1.19 2.487-.503.9-1.093 1.6-1.772 2.1-.679.5-1.484.9-2.416 1.2-.386-.3-.87-.6-1.45-.9a9.455 9.455 0 0 0-1.772-.6c-1.245 0-2.315.4-3.212 1.2-.897.8-1.346 1.9-1.346 3.3 0 1.3.435 2.9 1.307 4.8.87 1.9 1.864 3.75 2.98 5.55-.968.3-1.948.3-2.942 0-.994-.3-2.035-.4-3.125-.3-.328-.3-.656-.75-.984-1.35a13.15 13.15 0 0 1-.984-2.1c-.328-.9-.58-1.8-.761-2.7a9.202 9.202 0 0 1-.271-2.1c0-1.3.361-2.4 1.086-3.3.723-.9 1.615-1.35 2.67-1.35.968 0 1.845.3 2.632.9.787.6 1.523.3 2.21-.9-.29-.3-.668-.75-1.126-1.35a9.2 9.2 0 0 1-1.129-1.8c-.343-.7-.61-1.4-.802-2.1a6.605 6.605 0 0 1-.288-1.8c0-.8.168-1.55.508-2.25a6.33 6.33 0 0 1 1.303-1.8c.526-.5 1.113-.85 1.765-1.05.652-.2 1.293-.3 1.92-.3.814 0 1.57.15 2.264.45.695.3 1.293.7 1.788 1.2zm-5.547 24c-.853 0-1.693-.25-2.515-.75-.824-.5-1.511-1.15-2.063-1.95h-.31c-.096.4-.192.75-.285 1.05-.096.3-.213.55-.354.75-.142.2-.316.35-.522.45-.207.1-.457.15-.752.15-.678 0-1.182-.15-1.51-.45-.33-.3-.493-.65-.493-1.05 0-.3.057-.55.174-.75.117-.2.271-.4.464-.6.19-.2.4-.45.632-.75.23-.3.45-.75.662-1.35.096-.2.255-.65.48-1.35.224-.7.497-1.55.821-2.55.323-1 .663-2.1 1.021-3.3.356-1.2.71-2.35 1.059-3.45.29-.7.683-1.25 1.183-1.65.498-.4 1.003-.7 1.519-.9.514-.2 1.031-.3 1.55-.3.521 0 .989.05 1.403.15.34.1.654.25.942.45.288.2.51.45.668.75.158.3.236.65.236 1.05 0 .9-.264 1.85-.791 2.85-.527 1-.94 1.9-1.235 2.7.776.2 1.448.65 2.012 1.35.564.7.845 1.45.845 2.25 0 .6-.121 1.2-.365 1.8-.244.6-.569 1.15-.976 1.65-.407.5-.876.9-1.403 1.2-.529.3-1.08.45-1.653.45-.66 0-1.222-.2-1.683-.6-.464-.4-.833-.85-1.105-1.35h-.116c-.193.5-.562.95-1.105 1.35-.545.4-1.189.6-1.935.6zm.582-13.5c-.155 0-.348.075-.582.225-.232.15-.458.45-.674.9-.217.45-.411 1.05-.582 1.8-.173.75-.261 1.7-.261 2.85 0 .4.029.75.088 1.05.057.3.128.55.213.75.084.2.174.35.271.45.095.1.18.15.251.15.136 0 .303-.075.504-.225.2-.15.393-.45.582-.9.186-.45.343-1.05.467-1.8.124-.75.186-1.7.186-2.85 0-.4-.02-.75-.058-1.05-.039-.3-.097-.55-.173-.75-.078-.2-.168-.35-.272-.45-.104-.1-.207-.15-.31-.15zm5.976 0c-.155 0-.348.075-.582.225-.232.15-.458.45-.674.9-.217.45-.411 1.05-.582 1.8-.173.75-.261 1.7-.261 2.85 0 .4.029.75.087 1.05.058.3.13.55.214.75.082.2.174.35.271.45.095.1.18.15.251.15.136 0 .304-.075.504-.225.2-.15.394-.45.582-.9.187-.45.342-1.05.465-1.8.124-.75.186-1.7.186-2.85 0-.4-.018-.75-.058-1.05-.038-.3-.096-.55-.172-.75-.078-.2-.168-.35-.272-.45-.105-.1-.207-.15-.309-.15z" fill="#000000"/>
                  </svg>
                  <span>Apple</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
