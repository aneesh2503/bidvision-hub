
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flame, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResultsSummaryProps {
  count: number;
}

const ResultsSummary = ({ count }: ResultsSummaryProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6 flex justify-between items-center">
      <p className="text-muted-foreground">
        {count} {count === 1 ? 'item' : 'items'} found
      </p>
      <Button 
        variant="outline" 
        size="sm" 
        className="relative overflow-hidden border-purple-200 dark:border-purple-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all group" 
        onClick={() => navigate('/live-auctions')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative flex items-center gap-1.5">
          <div className="relative">
            <Flame className="h-4 w-4 text-red-500 group-hover:animate-pulse" />
            <Sparkles className="absolute -top-1 -right-1 h-2 w-2 text-yellow-500 opacity-0 group-hover:opacity-100" />
          </div>
          <span className="font-medium group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">Live Auctions</span>
          <span className="hidden group-hover:inline-flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30 px-1.5 py-0.5 text-[10px] font-semibold text-pink-700 dark:text-pink-300 transition-all">HOT</span>
        </div>
      </Button>
    </div>
  );
};

export default ResultsSummary;
