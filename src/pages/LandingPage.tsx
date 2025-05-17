
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import { Car, Calendar, Users, Star, ArrowRight, Check } from 'lucide-react';

const LandingPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
  
  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover opacity-20"></div>
        <div className="container mx-auto relative z-10 px-4 text-white">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Book Your Next Ride with Confidence
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Connect with trusted service providers and find the perfect vehicle for your journey.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/register">
                <Button size="lg" variant="outline" className="bg-white hover:bg-primary-foreground text-primary font-semibold">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 font-semibold">
                  Login
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-accent/30 rounded-full blur-3xl"></div>
        <div className="absolute top-16 -right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose WheelsOnDemand</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our platform makes it easy to find and book the perfect vehicle for any occasion.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="feature-card text-center"
              variants={fadeIn}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-primary h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book in Minutes</h3>
              <p className="text-muted-foreground">
                Our streamlined booking process makes it quick and easy to find and reserve the perfect vehicle.
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card text-center"
              variants={fadeIn}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="text-primary h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Diverse Fleet</h3>
              <p className="text-muted-foreground">
                Choose from a wide range of vehicles including cars, bikes, and scooters to match your specific needs.
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card text-center"
              variants={fadeIn}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Providers</h3>
              <p className="text-muted-foreground">
                All our service providers are thoroughly vetted to ensure you receive the highest quality service.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Getting started with WheelsOnDemand is simple and straightforward.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="relative" variants={fadeIn}>
              <div className="bg-primary text-white font-bold w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-lg">1</div>
              <h3 className="text-xl font-semibold mb-4">Create an Account</h3>
              <p className="text-muted-foreground mb-4">
                Sign up as a customer looking to book vehicles or as a service provider offering your fleet.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-accent mr-2" />
                  <span>Quick email verification</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-accent mr-2" />
                  <span>Choose your role</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div className="relative" variants={fadeIn}>
              <div className="bg-primary text-white font-bold w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-lg">2</div>
              <h3 className="text-xl font-semibold mb-4">Find a Vehicle</h3>
              <p className="text-muted-foreground mb-4">
                Browse available vehicles near you on our interactive map and select the one that fits your needs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-accent mr-2" />
                  <span>Interactive map view</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-accent mr-2" />
                  <span>Filter by vehicle type</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div className="relative" variants={fadeIn}>
              <div className="bg-primary text-white font-bold w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-lg">3</div>
              <h3 className="text-xl font-semibold mb-4">Book & Go</h3>
              <p className="text-muted-foreground mb-4">
                Submit your booking request, receive confirmation, and enjoy your ride!
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-accent mr-2" />
                  <span>Instant notifications</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-accent mr-2" />
                  <span>Secure payment process</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-secondary/30 rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="italic mb-4">"Finding a car for my weekend trip was incredibly easy with WheelsOnDemand. The map interface made it simple to see all available options near me."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-secondary/30 rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="italic mb-4">"As a service provider, WheelsOnDemand has helped me grow my business by connecting me with customers I wouldn't have found otherwise."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Service Provider</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-secondary/30 rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="italic mb-4">"The booking process is streamlined and the communication between provider and customer is excellent. I'll definitely be using this service again!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold">Emma Wilson</p>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Get Moving?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of satisfied customers who have found the perfect transportation solution.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/register">
              <Button size="lg" variant="outline" className="bg-white hover:bg-primary-foreground text-primary font-semibold">
                Register Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </AppLayout>
  );
};

export default LandingPage;
