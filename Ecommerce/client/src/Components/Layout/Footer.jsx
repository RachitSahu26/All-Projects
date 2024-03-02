import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Company Name</h3>
          <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor urna ac sapien commodo.</p>
        </div>
        <div className="flex gap-4">
          <div>
            <h4 className="font-semibold">Information</h4>
            <ul className="mt-2">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Support</h4>
            <ul className="mt-2">
              <li>Shipping & Returns</li>
              <li>Track Your Order</li>
              <li>Customer Service</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
