
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface DashboardTooltipProps {
  content: string;
  icon?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

const DashboardTooltip = ({ 
  content, 
  icon = <Info className="h-4 w-4 text-muted-foreground cursor-help" />,
  side = "top",
  align = "center"
}: DashboardTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <span className="ml-1 inline-flex items-center cursor-help">
            {icon}
          </span>
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className="bg-popover/95 backdrop-blur-sm border-border/40">
          <p className="max-w-xs text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DashboardTooltip;
