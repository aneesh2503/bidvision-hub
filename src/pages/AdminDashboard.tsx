import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  Clock, 
  BarChart, 
  BellRing, 
  LogOut,
  Plus,
  Search,
  MoreHorizontal,
  ArrowUpRight,
  Edit,
  Trash2,
  PieChart,
  LineChart,
  ArrowDownUp,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Logo from '../components/Logo';
import { toast } from "sonner";

const RECENT_AUCTIONS = [
  {
    id: 'A1234',
    title: 'Vintage Rolex Submariner',
    status: 'active',
    currentBid: 8500,
    bidders: 23,
    endDate: '2023-07-15',
  },
  {
    id: 'A1235',
    title: 'Modern Art Painting',
    status: 'active',
    currentBid: 3200,
    bidders: 15,
    endDate: '2023-07-05',
  },
  {
    id: 'A1236',
    title: 'Antique Writing Desk',
    status: 'pending',
    currentBid: 0,
    bidders: 0,
    endDate: '2023-07-20',
  },
  {
    id: 'A1237',
    title: 'First Edition Book Collection',
    status: 'ended',
    currentBid: 6200,
    bidders: 12,
    endDate: '2023-06-28',
  },
  {
    id: 'A1238',
    title: 'Designer Handbag',
    status: 'active',
    currentBid: 1950,
    bidders: 7,
    endDate: '2023-07-12',
  },
];

const STATS = [
  {
    title: 'Active Auctions',
    value: '32',
    change: '+14%',
    increasing: true,
  },
  {
    title: 'Total Bids',
    value: '854',
    change: '+28%',
    increasing: true,
  },
  {
    title: 'Revenue',
    value: '$24,500',
    change: '+18%',
    increasing: true,
  },
  {
    title: 'New Users',
    value: '142',
    change: '-3%',
    increasing: false,
  },
];

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'New bid on "Vintage Rolex Submariner"',
    time: '10 mins ago',
  },
  {
    id: 2,
    title: 'Auction "Modern Art Painting" ending soon',
    time: '30 mins ago',
  },
  {
    id: 3,
    title: 'New user registration: johndoe@example.com',
    time: '2 hours ago',
  },
  {
    id: 4,
    title: 'Payment received for auction #A1234',
    time: '5 hours ago',
  },
];

const MONTHLY_REVENUE = [
  { month: 'Jan', revenue: 12500 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18500 },
  { month: 'Apr', revenue: 22000 },
  { month: 'May', revenue: 19000 },
  { month: 'Jun', revenue: 24500 },
];

const CATEGORY_DISTRIBUTION = [
  { category: 'Collectibles', percentage: 35 },
  { category: 'Art', percentage: 25 },
  { category: 'Jewelry', percentage: 15 },
  { category: 'Electronics', percentage: 12 },
  { category: 'Vehicles', percentage: 8 },
  { category: 'Other', percentage: 5 },
];

const TOP_BIDDERS = [
  { id: 1, name: 'John Smith', totalBids: 47, totalAmount: 28500 },
  { id: 2, name: 'Alice Johnson', totalBids: 38, totalAmount: 24200 },
  { id: 3, name: 'Robert Chen', totalBids: 31, totalAmount: 19800 },
  { id: 4, name: 'Elena Rodriguez', totalBids: 29, totalAmount: 17500 },
  { id: 5, name: 'Michael Wong', totalBids: 23, totalAmount: 15900 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [auctionSearchTerm, setAuctionSearchTerm] = useState('');
  const [reportType, setReportType] = useState('revenue');
  
  const filteredAuctions = RECENT_AUCTIONS.filter(auction => 
    auction.title.toLowerCase().includes(auctionSearchTerm.toLowerCase()) ||
    auction.id.toLowerCase().includes(auctionSearchTerm.toLowerCase())
  );
  
  const handleDeleteAuction = (id: string) => {
    toast.success(`Auction ${id} deleted`);
  };
  
  const handleEditAuction = (id: string) => {
    toast(`Edit auction ${id}`);
  };

  const handleExportReport = (type: string) => {
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} report exported successfully!`);
  };
  
  return (
    <div className="flex min-h-screen bg-secondary/30">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="p-6 border-b">
          <Logo />
        </div>
        
        <nav className="flex-1 py-6 px-4">
          <ul className="space-y-1">
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'overview' ? 'bg-secondary' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Overview
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'auctions' ? 'bg-secondary' : ''}`}
                onClick={() => setActiveTab('auctions')}
              >
                <Package className="mr-2 h-5 w-5" />
                Auctions
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'users' ? 'bg-secondary' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                <Users className="mr-2 h-5 w-5" />
                Users
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'reports' ? 'bg-secondary' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                <BarChart className="mr-2 h-5 w-5" />
                Reports
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'settings' ? 'bg-secondary' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t mt-auto">
          <Link to="/">
            <Button variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
          </Link>
        </div>
      </aside>
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your auctions, users, and settings</p>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <BellRing size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-medium">Notifications</h3>
                    <Button variant="ghost" size="sm">Mark all as read</Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {NOTIFICATIONS.map(notification => (
                      <div key={notification.id} className="p-4 border-b last:border-0 hover:bg-secondary/50 transition-colors">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full">View all notifications</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button>
                <Plus size={16} className="mr-2" />
                New Auction
              </Button>
            </div>
          </header>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="md:hidden mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="auctions">Auctions</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {STATS.map((stat, index) => (
                  <Card key={index} className="opacity-0 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl">{stat.value}</CardTitle>
                      <CardDescription className="flex items-center">
                        {stat.title}
                        <span className={`ml-2 flex items-center text-xs ${stat.increasing ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.change}
                          <ArrowUpRight size={12} className={`ml-0.5 ${!stat.increasing ? 'rotate-180' : ''}`} />
                        </span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              
              <Card className="mb-8 opacity-0 animate-scale-in" style={{ animationDelay: `400ms` }}>
                <CardHeader>
                  <CardTitle>Recent Auctions</CardTitle>
                  <CardDescription>
                    Overview of your most recent auction listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Current Bid</TableHead>
                          <TableHead>Bidders</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {RECENT_AUCTIONS.slice(0, 3).map((auction) => (
                          <TableRow key={auction.id}>
                            <TableCell className="font-medium">{auction.id}</TableCell>
                            <TableCell>{auction.title}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                auction.status === 'active' 
                                  ? 'bg-green-100 text-green-700' 
                                  : auction.status === 'pending' 
                                    ? 'bg-amber-100 text-amber-700' 
                                    : 'bg-gray-100 text-gray-700'
                              }`}>
                                {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell>${auction.currentBid.toLocaleString()}</TableCell>
                            <TableCell>{auction.bidders}</TableCell>
                            <TableCell>{auction.endDate}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEditAuction(auction.id)}>
                                    <Edit size={14} className="mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-500" 
                                    onClick={() => handleDeleteAuction(auction.id)}
                                  >
                                    <Trash2 size={14} className="mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab('auctions')}>
                      View All Auctions
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="opacity-0 animate-fade-in" style={{ animationDelay: `600ms` }}>
                  <CardHeader>
                    <CardTitle>Recent Notifications</CardTitle>
                    <CardDescription>Latest updates from your auction platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {NOTIFICATIONS.map(notification => (
                        <div key={notification.id} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                          <div className="mr-4 p-2 bg-secondary rounded-full">
                            <BellRing size={16} />
                          </div>
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="opacity-0 animate-fade-in" style={{ animationDelay: `800ms` }}>
                  <CardHeader>
                    <CardTitle>Ending Soon</CardTitle>
                    <CardDescription>Auctions that will end in the next 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {RECENT_AUCTIONS.filter(a => a.status === 'active').slice(0, 3).map(auction => (
                        <div key={auction.id} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                          <div className="mr-4 p-2 bg-secondary rounded-full">
                            <Clock size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{auction.title}</p>
                              <p className="text-sm font-medium">${auction.currentBid.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground">ID: {auction.id}</p>
                              <p className="text-sm text-muted-foreground">{auction.bidders} bidders</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="auctions">
              <div className="bg-white rounded-lg shadow-sm border p-6 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <h2 className="text-xl font-bold mb-4 md:mb-0">Manage Auctions</h2>
                  <div className="flex w-full md:w-auto gap-3">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="search" 
                        placeholder="Search auctions..." 
                        className="pl-9"
                        value={auctionSearchTerm}
                        onChange={(e) => setAuctionSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button>
                      <Plus size={16} className="mr-2" />
                      New Auction
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Current Bid</TableHead>
                        <TableHead>Bidders</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAuctions.length > 0 ? (
                        filteredAuctions.map((auction) => (
                          <TableRow key={auction.id}>
                            <TableCell className="font-medium">{auction.id}</TableCell>
                            <TableCell>{auction.title}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                auction.status === 'active' 
                                  ? 'bg-green-100 text-green-700' 
                                  : auction.status === 'pending' 
                                    ? 'bg-amber-100 text-amber-700' 
                                    : 'bg-gray-100 text-gray-700'
                              }`}>
                                {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell>${auction.currentBid.toLocaleString()}</TableCell>
                            <TableCell>{auction.bidders}</TableCell>
                            <TableCell>{auction.endDate}</TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button variant="outline" size="sm" onClick={() => handleEditAuction(auction.id)}>
                                  <Edit size={14} className="mr-2" />
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-500" 
                                  onClick={() => handleDeleteAuction(auction.id)}
                                >
                                  <Trash2 size={14} className="mr-2" />
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            No auctions found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm border animate-fade-in">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">User Management</h3>
                  <p className="text-muted-foreground mb-4">This section is under development.</p>
                  <Button>Coming Soon</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="bg-white rounded-lg shadow-sm border p-6 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <h2 className="text-xl font-bold mb-4 md:mb-0">Reports & Analytics</h2>
                  <div className="flex w-full md:w-auto gap-3">
                    <Tabs defaultValue="revenue" value={reportType} onValueChange={setReportType} className="w-full md:w-auto">
                      <TabsList>
                        <TabsTrigger value="revenue" className="flex items-center gap-1.5">
                          <LineChart className="h-4 w-4" />
                          Revenue
                        </TabsTrigger>
                        <TabsTrigger value="categories" className="flex items-center gap-1.5">
                          <PieChart className="h-4 w-4" />
                          Categories
                        </TabsTrigger>
                        <TabsTrigger value="bidders" className="flex items-center gap-1.5">
                          <Users className="h-4 w-4" />
                          Top Bidders
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      Date Range
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1.5" 
                      onClick={() => handleExportReport(reportType)}>
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
                
                {reportType === 'revenue' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Monthly Revenue</CardTitle>
                        <CardDescription>Revenue trends over the past 6 months</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80 w-full bg-slate-50 rounded-md border flex items-center justify-center">
                          <div className="w-full px-6">
                            <div className="flex justify-between items-end h-60 border-b border-l">
                              {MONTHLY_REVENUE.map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                  <div 
                                    className="w-12 bg-primary rounded-t-md" 
                                    style={{ 
                                      height: `${(item.revenue / 25000) * 100}%`,
                                      opacity: 0.7 + (index * 0.05)
                                    }}
                                  ></div>
                                  <div className="mt-2 text-xs">{item.month}</div>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between mt-4">
                              <div className="text-sm font-medium">Total Revenue: $111,500</div>
                              <div className="text-sm text-green-600 font-medium flex items-center">
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                +18.5% from previous period
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">$111,500</div>
                          <div className="text-sm text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            18.5%
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Avg. Bid Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">$1,254</div>
                          <div className="text-sm text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            12.3%
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Commission</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">$11,150</div>
                          <div className="text-sm text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            18.5%
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
                
                {reportType === 'categories' && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Category Distribution</CardTitle>
                        <CardDescription>Distribution of auctions by category</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80 w-full bg-slate-50 rounded-md border flex items-center justify-center">
                          <div className="w-full px-6 flex items-center justify-center">
                            <div className="w-64 h-64 rounded-full border-8 border-primary relative flex items-center justify-center">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="text-sm font-medium">Total Auctions</div>
                                  <div className="text-2xl font-bold">145</div>
                                </div>
                              </div>
                            </div>
                            <div className="ml-12">
                              {CATEGORY_DISTRIBUTION.map((item, index) => (
                                <div key={index} className="flex items-center mb-3">
                                  <div 
                                    className="w-4 h-4 rounded-sm mr-2" 
                                    style={{ 
                                      backgroundColor: `hsl(${index * 60}, 70%, 60%)` 
                                    }}
                                  ></div>
                                  <div className="text-sm font-medium flex-1">{item.category}</div>
                                  <div className="text-sm font-medium ml-4">{item.percentage}%</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Most Popular Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">Collectibles</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            35% of all auctions
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Highest Bid Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">Jewelry</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Avg. bid: $3,250
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
                
                {reportType === 'bidders' && (
                  <div className="space-y-6">
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
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Total Bidders</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">254</div>
                          <div className="text-sm text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            15.2%
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Avg. Bids per User</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">3.4</div>
                          <div className="text-sm text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            8.7%
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">New Bidders</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">42</div>
                          <div className="text-sm text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            23.5%
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm border animate-fade-in">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Platform Settings</h3>
                  <p className="text-muted-foreground mb-4">This section is under development.</p>
                  <Button>Coming Soon</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
