
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'small';
  className?: string;
}

const Logo = ({ variant = 'default', className = '' }: LogoProps) => {
  return (
    <Link 
      to="/" 
      className={`flex items-center space-x-2 font-semibold transition-all ${className}`}
    >
      <div className="relative">
        <div className="flex items-center justify-center w-8 h-8 bg-accent rounded-lg">
          <span className="text-white font-bold">A</span>
        </div>
        <div className="absolute -right-1 -top-1 w-3 h-3 bg-primary rounded-full animate-pulse-soft" />
      </div>
      {variant === 'default' && (
        <span className="text-xl tracking-tight">AuctionElite</span>
      )}
    </Link>
  );
};

export default Logo;
