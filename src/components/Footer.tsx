import React from 'react';
import { Coffee, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-forest-900 text-white">
      <div className="container-width section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8" />
              <span className="text-xl font-serif font-semibold">Pillcocaja</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              From Yunguilla Valley to the World – Premium specialty coffee rooted in sustainability and exceptional quality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Coffee</h3>
            <ul className="space-y-2">
              <li><a href="/green-coffee" className="text-gray-300 hover:text-white transition-colors">Green Coffee</a></li>
              <li><a href="/farm" className="text-gray-300 hover:text-white transition-colors">Farm</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/sustainability" className="text-gray-300 hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-300">+593 997 069 202</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-300">ana.crespo@pillcocaja.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-forest-800 text-center">
          <p className="text-gray-300">&copy; 2025 Pillcocaja Specialty Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
