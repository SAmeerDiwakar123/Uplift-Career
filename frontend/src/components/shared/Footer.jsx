import React from 'react'
import facebook1 from '../../assets/facebook1.png'
import instagram from '../../assets/instagram.png'
import twitter from '../../assets/twitter.png'
import logo from '../../assets/logo.svg'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300'>

      {/* Main Footer */}
      <div className='container mx-auto px-4 2xl:px-20 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>

          {/* Brand Section */}
          <div className='lg:col-span-1'>
            <img src={logo} alt="Logo" className='h-8 mb-4 brightness-200' />
            <p className='text-sm text-gray-400 leading-relaxed mb-5'>
              Your trusted platform for finding the best job opportunities. Connecting talent with top companies across India.
            </p>
            <div className='flex gap-4'>
              <a href="#" className='bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors duration-200'>
                <img src={facebook1} alt="Facebook" className='h-4 w-4' />
              </a>
              <a href="#" className='bg-gray-800 hover:bg-pink-600 p-2 rounded-lg transition-colors duration-200'>
                <img src={instagram} alt="Instagram" className='h-4 w-4' />
              </a>
              <a href="#" className='bg-gray-800 hover:bg-sky-500 p-2 rounded-lg transition-colors duration-200'>
                <img src={twitter} alt="Twitter" className='h-4 w-4' />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>For Job Seekers</h3>
            <ul className='space-y-2 text-sm'>
              {['Browse Jobs', 'Companies', 'Career Advice', 'Resume Builder', 'Salary Guide'].map(item => (
                <li key={item}>
                  <a href="#" className='text-gray-400 hover:text-white transition-colors duration-150'>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>For Employers</h3>
            <ul className='space-y-2 text-sm'>
              {['Post a Job', 'Search Resumes', 'Pricing Plans', 'Recruitment Solutions', 'Employer Branding'].map(item => (
                <li key={item}>
                  <a href="#" className='text-gray-400 hover:text-white transition-colors duration-150'>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>Company</h3>
            <ul className='space-y-2 text-sm'>
              {['About Us', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Help Center'].map(item => (
                <li key={item}>
                  <a href="#" className='text-gray-400 hover:text-white transition-colors duration-150'>{item}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='container mx-auto px-4 2xl:px-20 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500'>
          <p>Designed by <span className='text-gray-400 font-medium'>Sameer Diwakar</span></p>
        </div>
      </div>

    </footer>
  )
}

export default Footer