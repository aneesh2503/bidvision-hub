
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  increasing: boolean;
  icon?: LucideIcon;
  delay?: number;
}

const StatCard = ({ 
  title, 
  value, 
  change, 
  increasing, 
  icon: Icon, 
  delay = 0 
}: StatCardProps) => {
  return (
    <Card className="opacity-0 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-2xl">{value}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <CardDescription className="flex items-center">
          {title}
          <span className={`ml-2 flex items-center text-xs ${increasing ? 'text-green-500' : 'text-red-500'}`}>
            {change}
            {increasing ? (
              <ArrowUpRight size={12} className="ml-0.5" />
            ) : (
              <ArrowDownRight size={12} className="ml-0.5" />
            )}
          </span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default StatCard;
