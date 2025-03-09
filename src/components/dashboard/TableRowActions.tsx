
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, Share2, Printer, EyeIcon } from 'lucide-react';
import { toast } from "sonner";

interface TableRowActionsProps {
  id: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

const TableRowActions: React.FC<TableRowActionsProps> = ({ 
  id, 
  onEdit, 
  onDelete, 
  onView 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-secondary"
        >
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-scale-in">
        <DropdownMenuItem 
          onClick={() => onView && onView(id)} 
          className="transition-colors hover:text-primary"
        >
          <EyeIcon size={14} className="mr-2" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onEdit && onEdit(id)}
          className="transition-colors hover:text-primary"
        >
          <Edit size={14} className="mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="transition-colors hover:text-primary"
          onClick={() => {
            toast.success(`Sharing auction ${id}`);
          }}
        >
          <Share2 size={14} className="mr-2" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="transition-colors hover:text-primary"
          onClick={() => {
            toast.success(`Auction ${id} printed`);
          }}
        >
          <Printer size={14} className="mr-2" />
          Print
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-500 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-900/30" 
          onClick={() => onDelete && onDelete(id)}
        >
          <Trash2 size={14} className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableRowActions;
