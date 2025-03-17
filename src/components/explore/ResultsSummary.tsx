
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';
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
        className="flex items-center gap-1 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" 
        onClick={() => navigate('/live-auctions')}
      >
        <Flame className="h-4 w-4 text-red-500" />
        Live Auctions
      </Button>
    </div>
  );
};

export default ResultsSummary;
