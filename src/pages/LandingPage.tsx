
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';

const LandingPage = () => {
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative bg-primary py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover opacity-20"></div>
        <div className="container mx-auto relative z-10 px-4 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Book Your Next Ride with Confidence</h1>
            <p className="text-xl mb-8">
              Connect with trusted service providers and find the perfect vehicle for your journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" variant="outline" className="bg-white hover:bg-primary-foreground text-primary font-semibold">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 font-semibold">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose WheelsOnDemand</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Book in Minutes</h3>
              <p className="text-muted-foreground">
                Our streamlined booking process makes it quick and easy to find and reserve the perfect vehicle.
              </p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.9 2 11 2 11.3V16c0 .6.4 1 1 1h2"/>
                  <circle cx="7" cy="17" r="2"/>
                  <path d="M9 17h6"/>
                  <circle cx="17" cy="17" r="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Diverse Fleet</h3>
              <p className="text-muted-foreground">
                Choose from a wide range of vehicles including cars, bikes, and scooters to match your specific needs.
              </p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Providers</h3>
              <p className="text-muted-foreground">
                All our service providers are thoroughly vetted to ensure you receive the highest quality service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-primary text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-muted-foreground">
                Sign up as a customer looking to book vehicles or as a service provider offering your fleet.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-primary text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Find a Vehicle</h3>
              <p className="text-muted-foreground">
                Browse available vehicles near you on our interactive map and select the one that fits your needs.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-primary text-white font-bold w-10 h-10 rounded-full flex items-center justify-center mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Book & Go</h3>
              <p className="text-muted-foreground">
                Submit your booking request, receive confirmation, and enjoy your ride!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Moving?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found the perfect transportation solution.
          </p>
          <Link to="/register">
            <Button size="lg" variant="outline" className="bg-white hover:bg-primary-foreground text-primary font-semibold">
              Register Now
            </Button>
          </Link>
        </div>
      </section>
    </AppLayout>
  );
};

export default LandingPage;
