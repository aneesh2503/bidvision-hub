
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-900 border-indigo-100 dark:border-indigo-800 mb-6 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-indigo-900 dark:text-indigo-100">
              Welcome back to your Admin Portal
            </h3>
            <p className="text-muted-foreground max-w-xl">
              This dashboard gives you a complete overview of your auction platform performance.
              Check your stats below or use the navigation to manage specific aspects of your platform.
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full" 
            onClick={() => setIsVisible(false)}
          >
            <X size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
