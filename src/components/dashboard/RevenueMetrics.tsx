
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', revenue: 6500 },
  { name: 'Week 2', revenue: 8200 },
  { name: 'Week 3', revenue: 7800 },
  { name: 'Week 4', revenue: 9500 },
  { name: 'Week 5', revenue: 11200 },
  { name: 'Week 6', revenue: 9800 },
  { name: 'Week 7', revenue: 12500 },
  { name: 'Week 8', revenue: 14200 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-primary">Revenue: ${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const RevenueMetrics = () => {
  const averageRevenue = Math.round(data.reduce((sum, item) => sum + item.revenue, 0) / data.length);
  const lastWeekRevenue = data[data.length - 1].revenue;
  const previousWeekRevenue = data[data.length - 2].revenue;
  const weeklyChange = ((lastWeekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Weekly Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${averageRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Last Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${lastWeekRevenue.toLocaleString()}</div>
            <div className={`text-sm flex items-center mt-1 ${weeklyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {weeklyChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(weeklyChange).toFixed(1)}% from previous week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Projected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(lastWeekRevenue * 1.1).toFixed(0)}</div>
            <div className="text-sm text-muted-foreground mt-1">
              Based on current trends
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Weekly Revenue</CardTitle>
          <CardDescription>Revenue trends over the past 8 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis 
                  tickFormatter={(value) => `$${value / 1000}k`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueMetrics;
