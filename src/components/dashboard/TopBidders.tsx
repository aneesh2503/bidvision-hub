
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, ArrowUp, ArrowDown, User, TrendingUp } from "lucide-react";
import DashboardTooltip from "./DashboardTooltip";

const TOP_BIDDERS = [
  { id: 1, name: 'John Smith', avatar: '👨‍💼', totalBids: 47, totalAmount: 28500, winRate: 68, trend: 'up' },
  { id: 2, name: 'Alice Johnson', avatar: '👩‍💼', totalBids: 38, totalAmount: 24200, winRate: 55, trend: 'down' },
  { id: 3, name: 'Robert Chen', avatar: '👨‍💻', totalBids: 31, totalAmount: 19800, winRate: 74, trend: 'up' },
  { id: 4, name: 'Elena Rodriguez', avatar: '👩‍🎨', totalBids: 29, totalAmount: 17500, winRate: 45, trend: 'down' },
  { id: 5, name: 'Michael Wong', avatar: '👨‍🔧', totalBids: 23, totalAmount: 15900, winRate: 61, trend: 'up' },
];

const TopBidders = () => {
  return (
    <Card className="border border-muted-foreground/20 shadow-sm">
      <CardHeader className="pb-2 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <CardTitle>Top Bidders</CardTitle>
            <DashboardTooltip content="Users with the highest bidding activity and spend across all auctions" />
          </div>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200">LIVE</Badge>
        </div>
        <CardDescription>Performance metrics of your most active users</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[80px]">#</TableHead>
              <TableHead>Bidder</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Total Bids
                  <DashboardTooltip content="Number of bids placed across all auctions" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Total Amount
                  <DashboardTooltip content="Total monetary value of all bids placed" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Avg. Per Bid
                  <DashboardTooltip content="Average amount spent per bid" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Win Rate
                  <DashboardTooltip content="Percentage of auctions won vs. participated" />
                </div>
              </TableHead>
              <TableHead className="text-right">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TOP_BIDDERS.map((bidder, index) => (
              <TableRow key={bidder.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <TableCell>
                  {index === 0 ? (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-medium">1</div>
                  ) : index === 1 ? (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-medium">2</div>
                  ) : index === 2 ? (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-50/80 text-amber-800/80 font-medium">3</div>
                  ) : (
                    index + 1
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary mr-2">
                      <span className="text-lg" role="img" aria-label="avatar">{bidder.avatar}</span>
                    </div>
                    <span className="font-medium">{bidder.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{bidder.totalBids}</TableCell>
                <TableCell>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    ${bidder.totalAmount.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  ${Math.round(bidder.totalAmount / bidder.totalBids).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2 max-w-24">
                      <div 
                        className={`h-2.5 rounded-full ${
                          bidder.winRate > 65 
                            ? 'bg-emerald-500' 
                            : bidder.winRate > 50 
                              ? 'bg-amber-500' 
                              : 'bg-rose-500'
                        }`}
                        style={{ width: `${bidder.winRate}%` }}
                      ></div>
                    </div>
                    <span className={`
                      font-medium
                      ${bidder.winRate > 65 ? 'text-emerald-600 dark:text-emerald-400' : 
                        bidder.winRate > 50 ? 'text-amber-600 dark:text-amber-400' : 
                        'text-rose-600 dark:text-rose-400'}
                    `}>
                      {bidder.winRate}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {bidder.trend === 'up' ? (
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">↑ 12%</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">↓ 8%</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopBidders;
