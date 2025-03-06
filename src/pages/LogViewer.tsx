
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Clock, Download, Filter, RefreshCw, Search } from "lucide-react";
import Logo from '@/components/Logo';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  source: string;
  details?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2023-06-10T12:30:45Z',
    level: 'info',
    message: 'User login successful',
    source: 'Authentication',
    details: 'User ID: 12345'
  },
  {
    id: '2',
    timestamp: '2023-06-10T12:35:12Z',
    level: 'warning',
    message: 'Bid placed close to auction end',
    source: 'Auction',
    details: 'Auction ID: 789, Bid amount: $150'
  },
  {
    id: '3',
    timestamp: '2023-06-10T12:40:33Z',
    level: 'error',
    message: 'Payment processing failed',
    source: 'Payment',
    details: 'Transaction ID: TX98765, Error code: 402'
  },
  {
    id: '4',
    timestamp: '2023-06-10T12:45:20Z',
    level: 'success',
    message: 'Auction completed successfully',
    source: 'Auction',
    details: 'Auction ID: 123, Final price: $350'
  },
  {
    id: '5',
    timestamp: '2023-06-10T12:50:05Z',
    level: 'info',
    message: 'New item listed for auction',
    source: 'Inventory',
    details: 'Item ID: 456, Starting price: $75'
  },
  {
    id: '6',
    timestamp: '2023-06-10T12:55:18Z',
    level: 'warning',
    message: 'User account nearing storage limit',
    source: 'Storage',
    details: 'User ID: 789, Usage: 95%'
  },
  {
    id: '7',
    timestamp: '2023-06-10T13:00:45Z',
    level: 'info',
    message: 'System backup completed',
    source: 'Maintenance',
    details: 'Backup size: 2.3GB'
  },
  {
    id: '8',
    timestamp: '2023-06-10T13:05:30Z',
    level: 'error',
    message: 'Database connection lost',
    source: 'Database',
    details: 'Server: db-prod-02, Duration: 15s'
  },
  {
    id: '9',
    timestamp: '2023-06-10T13:10:22Z',
    level: 'success',
    message: 'User verification completed',
    source: 'Authentication',
    details: 'User ID: 567, Method: Email'
  },
  {
    id: '10',
    timestamp: '2023-06-10T13:15:10Z',
    level: 'info',
    message: 'Daily report generated',
    source: 'Reporting',
    details: 'Report ID: RPT-2023-06-10'
  }
];

const LogViewer = () => {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleDownload = () => {
    // In a real app, this would generate and download a CSV/JSON file
    alert('Logs would be downloaded in a real application');
  };
  
  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };
  
  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-amber-100 text-amber-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo variant="default" />
          <div className="text-sm text-muted-foreground">
            <Clock className="inline-block mr-1 h-4 w-4" />
            <span>Live monitoring</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <Card className="shadow-md animate-fade-in">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">System Logs</CardTitle>
              <p className="text-muted-foreground mt-1">View and analyze system activities</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0 sm:min-w-[220px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Button variant="outline" onClick={handleRefresh} className="relative">
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead className="w-[100px]">Level</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="hidden md:table-cell">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow 
                          key={log.id}
                          className="hover:bg-muted/50 group transition-colors"
                        >
                          <TableCell className="font-mono text-xs">
                            {formatDate(log.timestamp)}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                              {log.level}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium">{log.message}</TableCell>
                          <TableCell>{log.source}</TableCell>
                          <TableCell className="text-sm hidden md:table-cell text-muted-foreground">
                            {log.details}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No logs found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
              <div>Showing {filteredLogs.length} of {logs.length} logs</div>
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>Add filters</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LogViewer;
