
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Admin credentials (in a real app, this would be validated against a backend)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (data.username === ADMIN_CREDENTIALS.username && 
          data.password === ADMIN_CREDENTIALS.password) {
        // Store admin authentication state
        localStorage.setItem('adminAuthenticated', 'true');
        toast.success("Login successful");
        navigate('/admin');
      } else {
        toast.error("Invalid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-secondary/30 p-4">
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
      
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Logo variant="default" className="mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access the admin dashboard</p>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-center">Administrator Access</CardTitle>
            <CardDescription className="text-center">
              Secure login required for administrative privileges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter admin username" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter password" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Authenticating..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-xs text-muted-foreground text-center">
              Hint: For demo purposes, use "admin" as username and "admin123" as password
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
