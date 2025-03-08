
import { 
  Plus, 
  Users, 
  Settings, 
  Package, 
  BarChart,
  Download
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const QuickActions = () => {
  const handleAction = (action: string) => {
    toast.success(`${action} action initiated`);
  };

  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Common tasks you might want to perform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Button 
            variant="outline" 
            className="h-auto flex flex-col items-center justify-center py-4 px-2 gap-2 hover:bg-secondary/80" 
            onClick={() => handleAction('New Auction')}
          >
            <Plus className="h-5 w-5 text-emerald-500" />
            <span className="text-xs text-center">New Auction</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto flex flex-col items-center justify-center py-4 px-2 gap-2 hover:bg-secondary/80" 
            onClick={() => handleAction('Manage Users')}
          >
            <Users className="h-5 w-5 text-blue-500" />
            <span className="text-xs text-center">Manage Users</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto flex flex-col items-center justify-center py-4 px-2 gap-2 hover:bg-secondary/80" 
            onClick={() => handleAction('Settings')}
          >
            <Settings className="h-5 w-5 text-gray-500" />
            <span className="text-xs text-center">Settings</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto flex flex-col items-center justify-center py-4 px-2 gap-2 hover:bg-secondary/80" 
            onClick={() => handleAction('Inventory')}
          >
            <Package className="h-5 w-5 text-amber-500" />
            <span className="text-xs text-center">Inventory</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto flex flex-col items-center justify-center py-4 px-2 gap-2 hover:bg-secondary/80" 
            onClick={() => handleAction('Reports')}
          >
            <BarChart className="h-5 w-5 text-purple-500" />
            <span className="text-xs text-center">Reports</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto flex flex-col items-center justify-center py-4 px-2 gap-2 hover:bg-secondary/80" 
            onClick={() => handleAction('Export Data')}
          >
            <Download className="h-5 w-5 text-teal-500" />
            <span className="text-xs text-center">Export Data</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
