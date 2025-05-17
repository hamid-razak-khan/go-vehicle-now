
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout, userRole } = useAuth();

  return (
    <nav className="bg-primary text-primary-foreground py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold">
          WheelsOnDemand
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="mr-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <span className="font-medium">{user.email}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="capitalize">{userRole} Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {userRole === 'customer' ? (
                <Link to="/customer-dashboard">
                  <Button variant="outline" className="bg-white text-primary hover:bg-primary-foreground">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/provider-dashboard">
                  <Button variant="outline" className="bg-white text-primary hover:bg-primary-foreground">
                    Provider Dashboard
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="bg-white text-primary hover:bg-primary-foreground">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="bg-white text-primary hover:bg-primary-foreground">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
