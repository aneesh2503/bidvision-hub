
import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // Get status badge style
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'active': 
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'pending': 
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300';
      case 'ended': 
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      case 'sold':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'canceled':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: 
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(status)} transition-all group-hover:shadow-sm`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
