
import React from 'react';

interface ResultsSummaryProps {
  count: number;
}

const ResultsSummary = ({ count }: ResultsSummaryProps) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <p className="text-muted-foreground">
        {count} {count === 1 ? 'item' : 'items'} found
      </p>
    </div>
  );
};

export default ResultsSummary;
