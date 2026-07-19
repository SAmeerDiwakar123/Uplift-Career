import React, { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, Youtube, Send, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CTASection from '@/components/home/CTASection';
import BottomNav from '@/components/shared/BottomNav';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      alert('✅ Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { icon: <Mail size={20} />, title: 'Email Us', info: 'support@upliftcareer.com' },
    { icon: <Phone size={20} />, title: 'Call Us', info: '+91 95480 02719' },
    { icon: <MapPin size={20} />, title: 'Visit Us', info: 'Bangalore, India' },
    { icon: <Clock size={20} />, title: 'Working Hours', info: 'Mon-Fri 9AM - 6PM' },
  ];

  const socialLinks = [
    { id: 1, icon: <Facebook size={20} />, name: 'Facebook' },
    { id: 2, icon: <Twitter size={20} />, name: 'Twitter' },
    { id: 3, icon: <Linkedin size={20} />, name: 'LinkedIn' },
    { id: 4, icon: <Instagram size={20} />, name: 'Instagram' },
    { id: 5, icon: <Youtube size={20} />, name: 'YouTube' },
  ];

  const faqData = [
    { q: 'How can I apply for jobs?', a: 'Simply create an account, complete your profile, and start applying to jobs that match your skills.' },
    { q: 'Are the courses free?', a: 'We offer both free and paid courses. Our paid courses start at just ₹999.' },
    { q: 'Do you provide internships?', a: 'Yes! We partner with top companies to provide real internships with stipends.' },
    { q: 'How does placement support work?', a: 'We provide resume reviews, mock interviews, and direct connections with hiring partners.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
            Contact Us
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Have questions, suggestions, or want to collaborate? 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 sm:py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info) => (
              <div key={info.title} className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center hover:shadow-md transition">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mx-auto mb-2">
                  {info.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{info.title}</h3>
                <p className="text-xs text-gray-500">{info.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Social Section */}
      <section className="py-8 sm:py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-1">Send us a Message</h2>
              <p className="text-xs text-gray-500 mb-4">Fill out the form and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter subject"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-vertical"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-1">Connect With Us</h2>
              <p className="text-xs text-gray-500 mb-4">Follow us on social media for updates, tips, and more.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href="#"
                    className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md hover:border-indigo-300 transition"
                  >
                    <div className="text-gray-600 mx-auto">
                      {link.icon}
                    </div>
                    <div className="text-[10px] font-medium text-gray-500 mt-1">
                      {link.name}
                    </div>
                  </a>
                ))}
              </div>

              {/* Why Contact */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle size={18} className="text-indigo-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Why Contact Us?</h3>
                </div>
                <ul className="space-y-1.5">
                  {[
                    'Quick response within 24 hours',
                    'Personalized career guidance',
                    'Free resources and tips',
                    'Direct connection with experts'
                  ].map((item, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="text-indigo-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500">Find answers to common questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqData.map((item, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {item.q}
                </h4>
                <p className="text-xs text-gray-500">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection/>
      <Footer />
      <BottomNav/>
    </div>
  );
};

export default Contact;