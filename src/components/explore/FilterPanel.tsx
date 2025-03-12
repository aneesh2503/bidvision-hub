
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  categories: string[];
}

const FilterPanel = ({
  priceRange,
  setPriceRange,
  selectedCategories,
  toggleCategory,
  categories
}: FilterPanelProps) => {
  return (
    <div className="bg-card rounded-lg p-6 mb-6 border animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filter Options</h3>
        <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-3">Price Range</h4>
          <Slider
            defaultValue={[0, 200000]}
            max={200000}
            step={1000}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-sm font-medium mb-3">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge 
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
