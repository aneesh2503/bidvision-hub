
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

const TOP_BIDDERS = [
  { id: 1, name: 'John Smith', totalBids: 47, totalAmount: 28500, winRate: 68 },
  { id: 2, name: 'Alice Johnson', totalBids: 38, totalAmount: 24200, winRate: 55 },
  { id: 3, name: 'Robert Chen', totalBids: 31, totalAmount: 19800, winRate: 74 },
  { id: 4, name: 'Elena Rodriguez', totalBids: 29, totalAmount: 17500, winRate: 45 },
  { id: 5, name: 'Michael Wong', totalBids: 23, totalAmount: 15900, winRate: 61 },
];

const TopBidders = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Top Bidders</CardTitle>
        <CardDescription>Users with the highest bidding activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Total Bids</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Avg. Per Bid</TableHead>
              <TableHead>Win Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TOP_BIDDERS.map((bidder, index) => (
              <TableRow key={bidder.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{bidder.name}</TableCell>
                <TableCell>{bidder.totalBids}</TableCell>
                <TableCell>${bidder.totalAmount.toLocaleString()}</TableCell>
                <TableCell>${Math.round(bidder.totalAmount / bidder.totalBids).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-24">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${bidder.winRate}%` }}
                      ></div>
                    </div>
                    <span>{bidder.winRate}%</span>
                  </div>
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
