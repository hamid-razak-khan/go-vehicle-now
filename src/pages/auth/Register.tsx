
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from '@/hooks/useAuth';
import AppLayout from '@/components/layout/AppLayout';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Check, Mail, Lock, User } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Registration Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Registration Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Registration Error",
        description: "You must accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(email, password, role);
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      navigate(role === 'customer' ? '/customer-dashboard' : '/provider-dashboard');
    } catch (error) {
      console.error('Registration failed', error);
      toast({
        title: "Registration failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AppLayout>
      <div className="auth-container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formVariants}
          className="w-full max-w-md"
        >
          <Card className="auth-card shadow-lg border-t-4 border-t-primary">
            <CardHeader className="space-y-1 text-center">
              <motion.div variants={itemVariants}>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Create an account
                </CardTitle>
              </motion.div>
              <motion.div variants={itemVariants}>
                <CardDescription>
                  Sign up for a WheelsOnDemand account
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="form-input-icon" size={18} />
                    <Input
                      id="email"
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </motion.div>
                
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="form-input-icon" size={18} />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </motion.div>
                
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="form-input-icon" size={18} />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </motion.div>
                
                <motion.div className="space-y-3" variants={itemVariants}>
                  <Label>Account Type</Label>
                  <RadioGroup 
                    value={role} 
                    onValueChange={(value: 'customer' | 'provider') => setRole(value)}
                    className="flex flex-col space-y-3"
                  >
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors">
                      <RadioGroupItem value="customer" id="customer" />
                      <Label htmlFor="customer" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4 text-primary" />
                        Customer - Book vehicles
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors">
                      <RadioGroupItem value="provider" id="provider" />
                      <Label htmlFor="provider" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4 text-accent" />
                        Service Provider - Offer vehicles
                      </Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div className="flex items-center space-x-2" variants={itemVariants}>
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    I accept the <Link to="/terms" className="text-primary hover:underline">terms and conditions</Link>
                  </label>
                </motion.div>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <motion.div className="w-full" variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className="w-full mb-4 btn-gradient"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-3"></div>
                        <span>Registering...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Check className="mr-2 h-4 w-4" />
                        <span>Register</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
                
                <motion.p className="text-sm text-center text-gray-600" variants={itemVariants}>
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Login
                  </Link>
                </motion.p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Register;
