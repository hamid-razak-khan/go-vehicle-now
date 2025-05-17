
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/hooks/useAuth';
import AppLayout from '@/components/layout/AppLayout';
import { toast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Forgot password request failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] px-4">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">Forgot Password</CardTitle>
            <CardDescription>
              {!isSubmitted ? 
                "Enter your email and we'll send you a link to reset your password" :
                "Check your email for a password reset link"
              }
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit" 
                  className="w-full mb-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-3"></div>
                      <span>Sending email...</span>
                    </div>
                  ) : "Send Reset Link"}
                </Button>
                
                <p className="text-sm text-center text-gray-600">
                  Remember your password?{" "}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Login
                  </Link>
                </p>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <div className="bg-accent/20 mx-auto rounded-full p-3 w-16 h-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent w-8 h-8">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  We've sent a password reset link to <strong>{email}</strong>. Please check your email.
                </p>
                <p className="text-gray-500 text-sm">
                  If you don't see the email, check your spam folder.
                </p>
                <div className="pt-4">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </AppLayout>
  );
};

export default ForgotPassword;
