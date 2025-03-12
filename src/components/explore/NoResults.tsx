
import React from 'react';
import { Button } from '@/components/ui/button';

interface NoResultsProps {
  resetFilters: () => void;
}

const NoResults = ({ resetFilters }: NoResultsProps) => {
  return (
    <div className="text-center py-16">
      <h3 className="text-xl font-medium mb-2">No auctions found</h3>
      <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
      <Button onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );
};

export default NoResults;
