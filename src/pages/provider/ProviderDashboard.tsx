
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppLayout from '@/components/layout/AppLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import MapView from '@/components/map/MapView';
import BookingsList, { Booking, BookingStatus } from '@/components/booking/BookingsList';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('requests');
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Mock loading bookings
  useEffect(() => {
    const loadBookings = () => {
      // This would be an API call in a real application
      const mockBookings: Booking[] = [
        {
          id: '1',
          vehicleName: 'Tesla Model S',
          vehicleType: 'car',
          pickupLocation: '123 Main St, New York',
          dropoffLocation: '456 Broadway, New York',
          pickupDateTime: new Date().toISOString(),
          duration: 3,
          totalPrice: 75,
          status: 'pending',
          customerName: 'John Smith',
          customerEmail: 'john@example.com',
          specialRequests: 'Please make sure the car is fully charged',
        },
        {
          id: '2',
          vehicleName: 'BMW X5',
          vehicleType: 'car',
          pickupLocation: '789 Fifth Ave, New York',
          dropoffLocation: '101 Park Ave, New York',
          pickupDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
          duration: 5,
          totalPrice: 110,
          status: 'pending',
          customerName: 'Sarah Johnson',
          customerEmail: 'sarah@example.com',
        },
        {
          id: '3',
          vehicleName: 'Mountain Bike',
          vehicleType: 'bike',
          pickupLocation: 'Central Park Entrance',
          dropoffLocation: 'Central Park Exit',
          pickupDateTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
          duration: 2,
          totalPrice: 16,
          status: 'accepted',
          customerName: 'Michael Brown',
          customerEmail: 'michael@example.com',
        },
        {
          id: '4',
          vehicleName: 'Electric Scooter',
          vehicleType: 'scooter',
          pickupLocation: 'Times Square',
          dropoffLocation: 'Grand Central',
          pickupDateTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
          duration: 1,
          totalPrice: 10,
          status: 'completed',
          customerName: 'Emily Wilson',
          customerEmail: 'emily@example.com',
          feedbackRating: 4,
          feedbackComment: 'Great service, the scooter was clean and well maintained.',
        },
        {
          id: '5',
          vehicleName: 'Honda Civic',
          vehicleType: 'car',
          pickupLocation: 'JFK Airport',
          dropoffLocation: 'Manhattan',
          pickupDateTime: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
          duration: 4,
          totalPrice: 60,
          status: 'rejected',
          customerName: 'David Lee',
          customerEmail: 'david@example.com',
        },
      ];
      
      setBookings(mockBookings);
    };
    
    loadBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus, message?: string) => {
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Update booking status
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      
      toast({
        title: `Booking ${newStatus === 'accepted' ? 'Accepted' : 'Rejected'}`,
        description: `You have ${newStatus} the booking request.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${newStatus} booking`,
        variant: "destructive",
      });
    }
  };

  // Calculate statistics
  const totalRequests = bookings.length;
  const acceptedRequests = bookings.filter(booking => booking.status === 'accepted' || booking.status === 'completed').length;
  const pendingRequests = bookings.filter(booking => booking.status === 'pending').length;
  const feedbackCount = bookings.filter(booking => booking.feedbackRating).length;
  
  const averageFeedback = feedbackCount > 0 
    ? bookings.reduce((sum, booking) => sum + (booking.feedbackRating || 0), 0) / feedbackCount 
    : 0;

  return (
    <AuthGuard allowedRoles={['provider']}>
      <AppLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Requests</CardDescription>
                <CardTitle className="text-4xl">{totalRequests}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Accepted Requests</CardDescription>
                <CardTitle className="text-4xl">{acceptedRequests}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {totalRequests > 0 ? Math.round((acceptedRequests / totalRequests) * 100) : 0}% of total
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pending Requests</CardDescription>
                <CardTitle className="text-4xl">{pendingRequests}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Feedback</CardDescription>
                <CardTitle className="text-4xl">{averageFeedback.toFixed(1)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(averageFeedback) ? 'text-yellow-400' : 'text-gray-300'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({feedbackCount} reviews)
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-8 grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="requests">Booking Requests</TabsTrigger>
              <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="requests">
              <BookingsList 
                bookings={bookings}
                userType="provider"
                onStatusChange={handleStatusChange}
              />
            </TabsContent>
            
            <TabsContent value="vehicles">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <MapView userType="provider" />
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Vehicle Management</CardTitle>
                      <CardDescription>
                        Manage your vehicle fleet here
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        This section would allow you to add, edit, and remove vehicles from your fleet.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        (Vehicle management functionality would be implemented here)
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </AuthGuard>
  );
};

export default ProviderDashboard;
