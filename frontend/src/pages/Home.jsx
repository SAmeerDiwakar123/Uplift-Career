import Navbar from '../components/shared/Navbar.jsx'
import React, { useEffect, useState } from "react";
import Footer from '../components/shared/Footer.jsx';
import Hero from '../components/Hero.jsx';
import TrendingJobs from '../components/TrendingJobs.jsx';
import Categories from '../components/Categories.jsx'
import JobsSection from '../components/JobsSection.jsx';
import TopCompanies from '../components/TopCompanies.jsx';
import HowWork from '../components/HowWork.jsx';
import ExploreJobs from '../components/ExploreJobs.jsx';
import useGetAllJobs from '../hooks/useGetAllJobs.jsx';


const Home = () => {
  useGetAllJobs();

  return (
    <>
      <Navbar />
      <Hero/>
      <TrendingJobs/>
      <Categories/>
      <JobsSection/>
      <ExploreJobs/>
      <TopCompanies/>
      <HowWork/>
      <Footer/>
    </>
  )
}
export default Home;