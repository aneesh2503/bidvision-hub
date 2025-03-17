import { 
  Plus, 
  Users, 
  Settings, 
  Package, 
  BarChart,
  Download,
  Flame,
  Sparkles
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
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();
  
  const handleAction = (action: string) => {
    switch(action) {
      case 'Live Auctions':
        navigate('/live-auctions');
        break;
      default:
        toast.success(`${action} action initiated`);
    }
  };

  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Common tasks you might want to perform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
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
          
          <Button 
            variant="outline" 
            className="h-auto flex flex-col items-center justify-center py-4 px-2 gap-2 relative overflow-hidden group bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 border-purple-200 dark:border-purple-800" 
            onClick={() => handleAction('Live Auctions')}
          >
            <div className="relative">
              <Flame className="h-5 w-5 text-red-500 group-hover:animate-pulse" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 opacity-0 group-hover:opacity-100" />
            </div>
            <span className="text-xs text-center font-medium group-hover:text-purple-700 dark:group-hover:text-purple-400">Live Auctions</span>
            <span className="absolute top-1 right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-pink-100 dark:bg-pink-900/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] font-bold text-pink-700 dark:text-pink-300">HOT</span>
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
