
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Landmark, CreditCard, BanknoteIcon } from 'lucide-react';

// Daily revenue data for the last 30 days
const generateDailyRevenueData = () => {
  const result = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Base revenue with some random variation
    const baseRevenue = 800 + Math.random() * 400;
    
    // Add weekly pattern (weekends have higher revenue)
    const dayOfWeek = date.getDay();
    const weekendBoost = (dayOfWeek === 0 || dayOfWeek === 6) ? 500 : 0;
    
    // Add some trend over time
    const trendBoost = i < 15 ? 200 : 0;
    
    const revenue = Math.round(baseRevenue + weekendBoost + trendBoost);
    
    result.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: revenue,
      transactions: Math.round(revenue / (80 + Math.random() * 40)),
    });
  }
  return result;
};

const data = generateDailyRevenueData();

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

const RevenueMetrics = () => {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalTransactions = data.reduce((sum, item) => sum + item.transactions, 0);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daily Revenue</CardTitle>
              <CardDescription>Revenue trends over the past 30 days</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-green-600 flex items-center justify-end">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                12.8% from previous month
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    // Show fewer tick labels to prevent overcrowding
                    // Only show every 5th day
                    const index = data.findIndex(item => item.date === value);
                    return index % 5 === 0 ? value : '';
                  }}
                />
                <YAxis 
                  yAxisId="left"
                  orientation="left"
                  tickFormatter={(value) => `$${value}`}
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
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  name="Revenue"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  name="Transactions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Total Revenue</CardTitle>
            <BanknoteIcon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              12.8% 
              <span className="text-muted-foreground ml-1">vs. last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Transactions</CardTitle>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTransactions.toLocaleString()}</div>
            <div className="text-sm text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              8.4%
              <span className="text-muted-foreground ml-1">vs. last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Avg. Order Value</CardTitle>
            <Landmark className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${Math.round(totalRevenue / totalTransactions).toLocaleString()}
            </div>
            <div className="text-sm text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              4.3%
              <span className="text-muted-foreground ml-1">vs. last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueMetrics;
