
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">WheelsOnDemand</h3>
            <p className="text-sm">Your trusted vehicle booking platform connecting service providers with customers seamlessly.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="hover:underline">Vehicle Booking</Link></li>
              <li><Link to="/become-provider" className="hover:underline">Become a Provider</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-6 text-sm text-center">
          <p>© {new Date().getFullYear()} WheelsOnDemand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
