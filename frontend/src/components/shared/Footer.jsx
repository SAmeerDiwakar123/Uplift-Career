import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Heart } from 'lucide-react';
import logo from '../../assets/logo.svg';

const Footer = () => {
  const footerLinks = [
    {
      title: 'For Job Seekers',
      links: ['Browse Jobs', 'Companies', 'Career Advice', 'Resume Builder', 'Salary Guide']
    },
    {
      title: 'For Employers',
      links: ['Post a Job', 'Search Resumes', 'Pricing Plans', 'Recruitment Solutions', 'Employer Branding']
    },
    {
      title: 'Company',
      links: ['About Us', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Help Center']
    }
  ];

  const socialIcons = [
    { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: Youtube, label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <img 
              src={logo} 
              alt="Uplift Career" 
              className="h-8 sm:h-10 mb-4 brightness-200 filter" 
            />
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              Your trusted platform for finding the best job opportunities. Connecting talent with top companies across India.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className={`bg-gray-800 ${social.color} p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-gray-400 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-150 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-xs text-gray-500">
            <p>© 2026 Uplift Career. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Designed with</span>
              <Heart size={14} className="text-red-500 fill-red-500" />
              <span>by</span>
              <span className="text-gray-400 font-medium">Sameer Diwakar</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;