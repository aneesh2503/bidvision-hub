
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from 'lucide-react';

const data = [
  { month: 'Jan', revenue: 12500, transactions: 145 },
  { month: 'Feb', revenue: 15000, transactions: 162 },
  { month: 'Mar', revenue: 18500, transactions: 197 },
  { month: 'Apr', revenue: 22000, transactions: 213 },
  { month: 'May', revenue: 19000, transactions: 185 },
  { month: 'Jun', revenue: 24500, transactions: 238 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-primary">Revenue: ${payload[0].value.toLocaleString()}</p>
        <p className="text-[#8884d8]">Transactions: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const previousPeriodRevenue = 94000; // For comparison
  const percentageChange = ((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue trends over the past 6 months</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-green-600 flex items-center justify-end">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              {percentageChange.toFixed(1)}% from previous period
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis 
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) => `$${value / 1000}k`}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => value.toString()}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="revenue" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
                name="Revenue" 
                barSize={30}
              />
              <Bar 
                yAxisId="right"
                dataKey="transactions" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]} 
                name="Transactions" 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
