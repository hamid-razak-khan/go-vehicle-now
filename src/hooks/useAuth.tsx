
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Define user type
type User = {
  id: string;
  email: string;
  name?: string;
};

type UserRole = 'customer' | 'provider';

interface AuthContextProps {
  user: User | null;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('userRole');
      
      if (storedUser && storedRole) {
        setUser(JSON.parse(storedUser));
        setUserRole(storedRole as UserRole);
      }
      
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  // Mock authentication functions (to be replaced with real backend later)
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data - would come from API in real implementation
      const mockUserId = Math.random().toString(36).substr(2, 9);
      
      // For demo: Determine role based on email (provider@test.com = provider, others = customer)
      const role = email.includes('provider') ? 'provider' : 'customer';
      
      const userData = {
        id: mockUserId,
        email,
      };
      
      // Save to local storage (would be a token in real implementation)
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userRole', role);
      
      setUser(userData);
      setUserRole(role as UserRole);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${email}!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user registration - would be handled by API in real implementation
      const mockUserId = Math.random().toString(36).substr(2, 9);
      
      const userData = {
        id: mockUserId,
        email,
      };
      
      // Save to local storage (would be a token in real implementation)
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userRole', role);
      
      setUser(userData);
      setUserRole(role);
      
      toast({
        title: "Registration Successful",
        description: `Welcome to WheelsOnDemand, ${email}!`,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setUser(null);
    setUserRole(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would send a real password reset email in production
      toast({
        title: "Password Reset Email Sent",
        description: `If ${email} exists in our system, you'll receive a password reset link.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send password reset email",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully. Please log in with your new password.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. The link may have expired.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    userRole,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
