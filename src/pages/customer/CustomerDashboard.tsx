
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from '@/components/layout/AppLayout';
import AuthGuard from '@/components/auth/AuthGuard';
import MapView from '@/components/map/MapView';
import VehicleCard, { Vehicle } from '@/components/booking/VehicleCard';
import BookingForm, { BookingFormData } from '@/components/booking/BookingForm';
import BookingsList, { Booking } from '@/components/booking/BookingsList';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

// Mock data
const dummyVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Tesla Model S',
    type: 'car',
    pricePerHour: 25,
    isAvailable: true,
    description: 'Premium electric vehicle with autopilot features',
  },
  {
    id: '2',
    name: 'BMW X5',
    type: 'car',
    pricePerHour: 22,
    isAvailable: true,
    description: 'Luxury SUV with spacious interior',
  },
  {
    id: '3',
    name: 'Mountain Bike',
    type: 'bike',
    pricePerHour: 8,
    isAvailable: true,
    description: 'All-terrain bike perfect for trails',
  },
  {
    id: '4',
    name: 'Electric Scooter',
    type: 'scooter',
    pricePerHour: 10,
    isAvailable: true,
    description: 'Eco-friendly urban transportation',
  },
];

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('book');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isProcessingBooking, setIsProcessingBooking] = useState(false);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

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
          specialRequests: 'Please make sure the car is fully charged',
        },
        {
          id: '2',
          vehicleName: 'Mountain Bike',
          vehicleType: 'bike',
          pickupLocation: 'Central Park Entrance',
          dropoffLocation: 'Central Park Exit',
          pickupDateTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
          duration: 2,
          totalPrice: 16,
          status: 'accepted',
        },
        {
          id: '3',
          vehicleName: 'Electric Scooter',
          vehicleType: 'scooter',
          pickupLocation: 'Times Square',
          dropoffLocation: 'Grand Central',
          pickupDateTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
          duration: 1,
          totalPrice: 10,
          status: 'completed',
        },
      ];
      
      setMyBookings(mockBookings);
    };
    
    loadBookings();
  }, []);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleBookingSubmit = async (formData: BookingFormData) => {
    if (!selectedVehicle) return;
    
    setIsProcessingBooking(true);
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      // Create new booking object
      const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        vehicleName: selectedVehicle.name,
        vehicleType: selectedVehicle.type,
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
        pickupDateTime: new Date(`${formData.pickupDate}T${formData.pickupTime}`).toISOString(),
        duration: formData.duration,
        totalPrice: selectedVehicle.pricePerHour * formData.duration,
        status: 'pending',
        specialRequests: formData.specialRequests,
        customerEmail: user?.email,
      };
      
      // Add to bookings list
      setMyBookings(prev => [newBooking, ...prev]);
      
      toast({
        title: "Booking Request Submitted",
        description: "Your booking request has been sent to the service provider",
      });
      
      // Reset selected vehicle and switch to My Bookings tab
      setSelectedVehicle(null);
      setSelectedTab('bookings');
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error submitting your booking request",
        variant: "destructive",
      });
    } finally {
      setIsProcessingBooking(false);
    }
  };

  const handleFeedbackSubmit = async (bookingId: string, rating: number, comment: string) => {
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Update booking with feedback
      setMyBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, feedbackRating: rating, feedbackComment: comment }
          : booking
      ));
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for sharing your experience!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthGuard allowedRoles={['customer']}>
      <AppLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-8 grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="book">Book a Vehicle</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="book" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <MapView 
                    onVehicleSelect={handleVehicleSelect}
                    selectedVehicle={selectedVehicle}
                  />
                </div>
                
                <div>
                  <BookingForm 
                    selectedVehicle={selectedVehicle}
                    onBookingSubmit={handleBookingSubmit}
                    isProcessing={isProcessingBooking}
                  />
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Available Vehicles</CardTitle>
                  <CardDescription>
                    Select a vehicle to book
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dummyVehicles.map(vehicle => (
                      <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        onSelect={handleVehicleSelect}
                        isSelected={selectedVehicle?.id === vehicle.id}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings">
              <BookingsList 
                bookings={myBookings}
                userType="customer"
                onFeedbackSubmit={handleFeedbackSubmit}
              />
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </AuthGuard>
  );
};

export default CustomerDashboard;
