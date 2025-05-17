
import React, { useState } from 'react';
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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Vehicle } from "./VehicleCard";

interface BookingFormProps {
  selectedVehicle: Vehicle | null;
  onBookingSubmit: (formData: BookingFormData) => void;
  isProcessing: boolean;
}

export interface BookingFormData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  duration: number;
  specialRequests: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  selectedVehicle, 
  onBookingSubmit,
  isProcessing
}) => {
  const { user } = useAuth();
  
  const form = useForm<BookingFormData>({
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: "",
      pickupTime: "",
      duration: 1,
      specialRequests: ""
    },
  });

  if (!selectedVehicle) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Book a Vehicle</CardTitle>
          <CardDescription>
            Please select a vehicle from the map first
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const calculateTotalPrice = () => {
    const duration = form.watch('duration') || 1;
    return (selectedVehicle.pricePerHour * duration).toFixed(2);
  };

  const onSubmit = (data: BookingFormData) => {
    if (!selectedVehicle) {
      toast({
        title: "Error",
        description: "Please select a vehicle first",
        variant: "destructive"
      });
      return;
    }
    
    onBookingSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book {selectedVehicle.name}</CardTitle>
        <CardDescription>
          Fill in the details to make a booking request
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pickupLocation"
                rules={{ required: "Pickup location is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dropoffLocation"
                rules={{ required: "Dropoff location is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dropoff Location</FormLabel>
                    <FormControl>
                      <Input placeholder="456 Oak Ave" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pickupDate"
                rules={{ required: "Pickup date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Date</FormLabel>
                    <FormControl>
                      <Input type="date" min={new Date().toISOString().split('T')[0]} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pickupTime"
                rules={{ required: "Pickup time is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                rules={{ 
                  required: "Duration is required",
                  min: { value: 1, message: "Minimum duration is 1 hour" },
                  max: { value: 72, message: "Maximum duration is 72 hours" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (hours)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max="72" 
                        step="1" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special requests or requirements..." 
                      className="resize-none" 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between font-medium">
                <span>Price per hour:</span>
                <span>${selectedVehicle.pricePerHour.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Duration:</span>
                <span>{form.watch('duration') || 1} hours</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Price:</span>
                <span className="text-primary">${calculateTotalPrice()}</span>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-3"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Request Booking'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
