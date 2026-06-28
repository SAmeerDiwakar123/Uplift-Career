import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import AboutHero from '@/components/about/AboutHero';
import FoundersSection from '@/components/about/FoundersSection';
import ValuesSection from '@/components/about/ValuesSection';
import TeamSection from '@/components/about/TeamSection';
import ImpactSection from '@/components/about/ImpactSection';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <AboutHero />
      <FoundersSection />
      <ValuesSection />
      <TeamSection />
      <ImpactSection />
      <Footer />
    </div>
  );
};

export default About;