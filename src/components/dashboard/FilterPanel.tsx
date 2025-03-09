
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FilterPanel: React.FC = () => {
  return (
    <Card className="p-4 animate-fade-in border-primary/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Status</label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="ended">Ended</option>
            <option value="sold">Sold</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Bid Range</label>
          <div className="flex space-x-2">
            <input placeholder="Min" type="number" className="w-full border rounded px-3 py-2 text-sm" />
            <input placeholder="Max" type="number" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">End Date</label>
          <div className="flex space-x-2">
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option value="all">Any Time</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end col-span-3 mt-2">
          <Button variant="outline" size="sm" className="mr-2">Reset</Button>
          <Button size="sm">Apply Filters</Button>
        </div>
      </div>
    </Card>
  );
};

export default FilterPanel;
