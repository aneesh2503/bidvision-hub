
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ArrowUpRight,
  PieChart,
  LineChart,
  Filter,
  Wallet,
  Activity,
  TrendingUp,
  Home,
  HelpCircle,
  Moon,
  Sun,
  CalendarIcon, // Fixed: Changed from Calendar to CalendarIcon
  Download // Added: Import for Download icon
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Logo from '../components/Logo';
import { toast } from "sonner";
import { adminAuthService } from '@/services/adminAuthService';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import RevenueMetrics from '@/components/dashboard/RevenueMetrics';
import CategoryDistribution from '@/components/dashboard/CategoryDistribution';
import TopBidders from '@/components/dashboard/TopBidders';
import DashboardTooltip from '@/components/dashboard/DashboardTooltip';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import QuickActions from '@/components/dashboard/QuickActions';
import AuctionTable from '@/components/dashboard/AuctionTable';

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
    icon: Package,
  },
  {
    title: 'Total Bids',
    value: '854',
    change: '+28%',
    increasing: true,
    icon: Activity,
  },
  {
    title: 'Revenue',
    value: '$24,500',
    change: '+18%',
    increasing: true,
    icon: Wallet,
  },
  {
    title: 'New Users',
    value: '142',
    change: '-3%',
    increasing: false,
    icon: Users,
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [auctionSearchTerm, setAuctionSearchTerm] = useState('');
  const [reportType, setReportType] = useState('revenue');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  
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

  const handleViewAuction = (id: string) => {
    toast.info(`Viewing auction details for ${id}`);
  };

  const handleExportReport = (type: string) => {
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} report exported successfully!`);
  };
  
  const handleAdminLogout = () => {
    adminAuthService.adminLogout();
    toast.success('Logged out successfully');
    navigate('/admin-login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    toast.success(`${darkMode ? 'Light' : 'Dark'} mode activated`);
  };
  
  return (
    <div className={`flex min-h-screen ${darkMode ? 'dark' : ''} bg-secondary/30 dark:bg-gray-900`}>
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="p-6 border-b dark:border-gray-700">
          <Logo />
        </div>
        
        <nav className="flex-1 py-6 px-4 overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">MAIN MENU</p>
            <ul className="space-y-1">
              <li>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === 'overview' ? 'bg-secondary dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Overview
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === 'auctions' ? 'bg-secondary dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveTab('auctions')}
                >
                  <Package className="mr-2 h-5 w-5" />
                  Auctions
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === 'users' ? 'bg-secondary dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Users
                </Button>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">ANALYTICS</p>
            <ul className="space-y-1">
              <li>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === 'reports' ? 'bg-secondary dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveTab('reports')}
                >
                  <BarChart className="mr-2 h-5 w-5" />
                  Reports
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Trends
                  <Badge variant="outline" className="ml-auto mr-1">New</Badge>
                </Button>
              </li>
            </ul>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">SETTINGS</p>
            <ul className="space-y-1">
              <li>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === 'settings' ? 'bg-secondary dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? (
                    <Sun className="mr-2 h-5 w-5" />
                  ) : (
                    <Moon className="mr-2 h-5 w-5" />
                  )}
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Help Center
                </Button>
              </li>
            </ul>
          </div>
        </nav>
        
        <div className="p-4 border-t dark:border-gray-700 mt-auto">
          <Button variant="outline" className="w-full mb-2" onClick={handleAdminLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <Link to="/">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
          </Link>
        </div>
      </aside>
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your auctions, users, and settings</p>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <BellRing size={20} />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
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
              <WelcomeBanner />
              
              <QuickActions />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {STATS.map((stat, index) => (
                  <StatCard 
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    change={stat.change}
                    increasing={stat.increasing}
                    icon={stat.icon}
                    delay={index * 100}
                  />
                ))}
              </div>
              
              <div className="mb-8">
                <RevenueChart />
              </div>
              
              <Card className="mb-8 opacity-0 animate-scale-in" style={{ animationDelay: `400ms` }}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CardTitle>Recent Auctions</CardTitle>
                      <DashboardTooltip content="Most recently created or updated auction listings" />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab('auctions')}>
                      View All
                    </Button>
                  </div>
                  <CardDescription>
                    Overview of your most recent auction listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AuctionTable 
                    data={RECENT_AUCTIONS.slice(0, 3)} 
                    onEdit={handleEditAuction}
                    onDelete={handleDeleteAuction}
                    onView={handleViewAuction}
                  />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="opacity-0 animate-fade-in" style={{ animationDelay: `600ms` }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CardTitle>Recent Notifications</CardTitle>
                        <DashboardTooltip content="Latest system notifications and alerts" />
                      </div>
                      <Button variant="ghost" size="sm">View All</Button>
                    </div>
                    <CardDescription>Latest updates from your auction platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {NOTIFICATIONS.map(notification => (
                        <div key={notification.id} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                          <div className="mr-4 p-2 bg-secondary rounded-full dark:bg-gray-700">
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CardTitle>Ending Soon</CardTitle>
                        <DashboardTooltip content="Auctions that will end in the next 24 hours" />
                      </div>
                      <Button variant="ghost" size="sm">View All</Button>
                    </div>
                    <CardDescription>Auctions that will end in the next 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {RECENT_AUCTIONS.filter(a => a.status === 'active').slice(0, 3).map(auction => (
                        <div key={auction.id} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                          <div className="mr-4 p-2 bg-secondary rounded-full dark:bg-gray-700">
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
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <h2 className="text-xl font-bold mb-4 md:mb-0 dark:text-white">Manage Auctions</h2>
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
                
                <AuctionTable 
                  data={filteredAuctions} 
                  onEdit={handleEditAuction}
                  onDelete={handleDeleteAuction}
                  onView={handleViewAuction}
                />
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
                      <CalendarIcon className="h-4 w-4" />
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
                  <RevenueMetrics />
                )}
                
                {reportType === 'categories' && (
                  <div className="space-y-6">
                    <CategoryDistribution />
                    
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
                    <TopBidders />
                    
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
