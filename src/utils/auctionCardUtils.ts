
import { Heart, Clock, AlertCircle, HandCoins, Tag, Sparkles, Star, Gem } from 'lucide-react';
import React from 'react';

// Get badge color based on category
export const getCategoryColor = (category?: string) => {
  switch(category) {
    case 'art': return 'bg-purple-500 hover:bg-purple-600';
    case 'collectibles': return 'bg-amber-500 hover:bg-amber-600';
    case 'electronics': return 'bg-blue-500 hover:bg-blue-600';
    case 'fashion': return 'bg-pink-500 hover:bg-pink-600';
    case 'furniture': return 'bg-emerald-500 hover:bg-emerald-600';
    case 'jewelry': return 'bg-yellow-500 hover:bg-yellow-600';
    case 'watches': return 'bg-slate-500 hover:bg-slate-600';
    case 'vehicles': return 'bg-red-500 hover:bg-red-600';
    case 'antiquities': return 'bg-orange-500 hover:bg-orange-600';
    default: return 'bg-gray-500 hover:bg-gray-600';
  }
};

// Get condition badge style
export const getConditionStyle = (condition?: string) => {
  switch(condition) {
    case 'new': return 'bg-green-500 hover:bg-green-600';
    case 'like-new': return 'bg-emerald-500 hover:bg-emerald-600';
    case 'excellent': return 'bg-teal-500 hover:bg-teal-600';
    case 'good': return 'bg-blue-500 hover:bg-blue-600';
    case 'fair': return 'bg-amber-500 hover:bg-amber-600';
    default: return 'bg-gray-500 hover:bg-gray-600';
  }
};

// Get icon based on category
export const getCategoryIcon = (category?: string) => {
  switch(category) {
    case 'art': return React.createElement(Sparkles, { className: "h-3 w-3 mr-1" });
    case 'collectibles': return React.createElement(Star, { className: "h-3 w-3 mr-1" });
    case 'jewelry': return React.createElement(Gem, { className: "h-3 w-3 mr-1" });
    default: return React.createElement(Tag, { className: "h-3 w-3 mr-1" });
  }
};

// Determine if item is high value (for special highlighting)
export const isHighValueAuction = (currentBid: number) => currentBid > 10000;
