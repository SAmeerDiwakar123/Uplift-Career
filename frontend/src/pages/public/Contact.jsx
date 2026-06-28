import React, { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, Youtube, Send, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CTASection from '@/components/home/CTASection';

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
    { icon: <Mail size={22} />, title: 'Email Us', info: 'support@upliftcareer.com', color: 'from-purple-100 to-purple-50' },
    { icon: <Phone size={22} />, title: 'Call Us', info: '+91 95480 02719', color: 'from-teal-100 to-teal-50' },
    { icon: <MapPin size={22} />, title: 'Visit Us', info: 'Bangalore, India', color: 'from-amber-100 to-amber-50' },
    { icon: <Clock size={22} />, title: 'Working Hours', info: 'Mon-Fri 9AM - 6PM', color: 'from-rose-100 to-rose-50' },
  ];

  const socialLinks = [
    { id: 1, icon: <Facebook size={24} />, name: 'Facebook', color: 'hover:bg-blue-600' },
    { id: 2, icon: <Twitter size={24} />, name: 'Twitter', color: 'hover:bg-sky-500' },
    { id: 3, icon: <Linkedin size={24} />, name: 'LinkedIn', color: 'hover:bg-blue-700' },
    { id: 4, icon: <Instagram size={24} />, name: 'Instagram', color: 'hover:bg-pink-600' },
    { id: 5, icon: <Youtube size={24} />, name: 'YouTube', color: 'hover:bg-red-600' },
  ];

  const faqData = [
    { q: 'How can I apply for jobs?', a: 'Simply create an account, complete your profile, and start applying to jobs that match your skills.' },
    { q: 'Are the courses free?', a: 'We offer both free and paid courses. Our paid courses start at just ₹999.' },
    { q: 'Do you provide internships?', a: 'Yes! We partner with top companies to provide real internships with stipends.' },
    { q: 'How does placement support work?', a: 'We provide resume reviews, mock interviews, and direct connections with hiring partners.' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-100 py-12 sm:py-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 px-4 py-2 rounded-full mb-6 shadow-sm">
            <Sparkles size={16} className="text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">Get in Touch</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
            Let's Connect
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              We'd Love to Hear From You
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Have questions, suggestions, or want to collaborate? 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 sm:py-12 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info) => (
              <div key={info.title} className={`group bg-gradient-to-br ${info.color} border border-gray-200 rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer`}>
                <div className={`w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {info.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">{info.title}</h3>
                <p className="text-xs text-gray-600">{info.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Social Section */}
      <section className="py-12 sm:py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">Send us a Message</h2>
              <p className="text-sm text-gray-500 mb-5">Fill out the form and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter subject"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-vertical"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">Connect With Us</h2>
              <p className="text-sm text-gray-500 mb-5">Follow us on social media for updates, tips, and more.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href="#"
                    className={`group bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:-translate-y-1 ${link.color}`}
                  >
                    <div className="text-gray-600 group-hover:text-white transition-colors duration-300">
                      {link.icon}
                    </div>
                    <div className="text-[10px] font-medium text-gray-600 group-hover:text-white transition-colors duration-300 mt-1">
                      {link.name}
                    </div>
                  </a>
                ))}
              </div>

              {/* Why Contact */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle size={20} className="text-purple-600" />
                  <h3 className="text-base font-bold text-gray-900">Why Contact Us?</h3>
                </div>
                <ul className="space-y-1.5">
                  {[
                    '💬 Quick response within 24 hours',
                    '🤝 Personalized career guidance',
                    '📚 Free resources and tips',
                    '🎯 Direct connection with experts'
                  ].map((item, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-purple-500">•</span>
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
      <section className="py-12 sm:py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-lg sm:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <span>Frequently Asked</span>
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">Find answers to common questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqData.map((item, index) => (
              <div key={index} className="group bg-white border border-gray-200 rounded-2xl p-5 transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 text-base font-bold">❓</span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
                      {item.q}
                    </h4>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection/>
      <Footer />
    </div>
  );
};

export default Contact;