
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export interface Booking {
  id: string;
  vehicleName: string;
  vehicleType: 'car' | 'bike' | 'scooter';
  pickupLocation: string;
  dropoffLocation: string;
  pickupDateTime: string;
  duration: number;
  totalPrice: number;
  status: BookingStatus;
  customerName?: string;
  customerEmail?: string;
  providerName?: string;
  providerEmail?: string;
  specialRequests?: string;
  feedbackRating?: number;
  feedbackComment?: string;
}

interface BookingsListProps {
  bookings: Booking[];
  userType: 'provider' | 'customer';
  onStatusChange?: (bookingId: string, newStatus: BookingStatus, message?: string) => void;
  onFeedbackSubmit?: (bookingId: string, rating: number, comment: string) => void;
}

const BookingStatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800'
  };

  return (
    <Badge className={statusStyles[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const BookingsList: React.FC<BookingsListProps> = ({ 
  bookings, 
  userType, 
  onStatusChange,
  onFeedbackSubmit
}) => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [dialogAction, setDialogAction] = useState<'accept' | 'reject' | 'feedback'>('accept');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);

  const filteredBookings = selectedTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === selectedTab);

  const handleActionClick = (booking: Booking, action: 'accept' | 'reject' | 'feedback') => {
    setSelectedBooking(booking);
    setDialogAction(action);
    setMessage('');
    setRating(booking.feedbackRating || 0);
    setIsDialogOpen(true);
  };

  const handleDialogConfirm = () => {
    if (!selectedBooking) return;
    
    if (dialogAction === 'feedback' && onFeedbackSubmit) {
      onFeedbackSubmit(selectedBooking.id, rating, message);
    } else if (onStatusChange) {
      const newStatus: BookingStatus = dialogAction === 'accept' ? 'accepted' : 'rejected';
      onStatusChange(selectedBooking.id, newStatus, message);
    }
    
    setIsDialogOpen(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {userType === 'provider' ? 'Booking Requests' : 'My Bookings'}
          </CardTitle>
          <CardDescription>
            {userType === 'provider' 
              ? 'View and manage booking requests from customers'
              : 'View and manage your booking requests'}
          </CardDescription>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-4 max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No bookings found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{booking.vehicleName}</CardTitle>
                      <BookingStatusBadge status={booking.status} />
                    </div>
                    <CardDescription>
                      {userType === 'provider' && booking.customerEmail && (
                        <div className="font-medium">Customer: {booking.customerEmail}</div>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Pickup:</p>
                        <p>{booking.pickupLocation}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Dropoff:</p>
                        <p>{booking.dropoffLocation}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date & Time:</p>
                        <p>{formatDate(booking.pickupDateTime)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration:</p>
                        <p>{booking.duration} {booking.duration > 1 ? 'hours' : 'hour'}</p>
                      </div>
                    </div>
                    
                    {booking.specialRequests && (
                      <div className="mt-2">
                        <p className="text-muted-foreground">Special Requests:</p>
                        <p className="text-sm">{booking.specialRequests}</p>
                      </div>
                    )}
                    
                    <div className="mt-2 font-medium">
                      Total Price: ${booking.totalPrice.toFixed(2)}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    {userType === 'provider' && booking.status === 'pending' && (
                      <div className="flex space-x-2 w-full">
                        <Button 
                          variant="default" 
                          className="w-full" 
                          onClick={() => handleActionClick(booking, 'accept')}
                        >
                          Accept
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => handleActionClick(booking, 'reject')}
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                    
                    {userType === 'customer' && booking.status === 'completed' && !booking.feedbackRating && (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => handleActionClick(booking, 'feedback')}
                      >
                        Leave Feedback
                      </Button>
                    )}
                    
                    {userType === 'customer' && booking.status === 'completed' && booking.feedbackRating && (
                      <div className="w-full">
                        <div className="text-sm text-muted-foreground">Your Rating:</div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < booking.feedbackRating! ? 'text-yellow-400' : 'text-gray-300'}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Action Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === 'accept' 
                ? 'Accept Booking Request' 
                : dialogAction === 'reject' 
                  ? 'Decline Booking Request'
                  : 'Leave Feedback'
              }
            </DialogTitle>
            <DialogDescription>
              {dialogAction === 'accept' 
                ? 'Add an optional message to the customer'
                : dialogAction === 'reject'
                  ? 'Please provide a reason for declining'
                  : 'Rate your experience and provide feedback'
              }
            </DialogDescription>
          </DialogHeader>
          
          {dialogAction === 'feedback' && (
            <div className="flex items-center justify-center space-x-1 py-2">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className="focus:outline-none"
                >
                  <svg
                    className={`w-8 h-8 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          )}
          
          <Textarea
            placeholder={
              dialogAction === 'accept' 
                ? 'Optional message to customer...' 
                : dialogAction === 'reject'
                  ? 'Reason for declining...'
                  : 'Share your experience...'
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleDialogConfirm}
              disabled={dialogAction === 'reject' && !message || dialogAction === 'feedback' && !rating}
            >
              {dialogAction === 'accept' 
                ? 'Accept Booking' 
                : dialogAction === 'reject'
                  ? 'Decline Booking'
                  : 'Submit Feedback'
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingsList;
