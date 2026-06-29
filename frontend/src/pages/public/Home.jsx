import BootcampBanner from "@/components/home/BootcampBanner";
import CoursesSection from "@/components/home/CoursesSection";
import CTASection from "@/components/home/CTASection";
import Hero from "@/components/home/Hero";
import JobsSection from "@/components/home/JobsSection";
import Testimonials from "@/components/home/Testimonials";
import TrendingJobs from "@/components/home/TrendingJobs";
import WhyUplift from "@/components/home/WhyUplift";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import TopCompanies from "@/components/home/TopCompanies";
import BottomNav from "@/components/shared/BottomNav";


const Home = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Navbar />
      <Hero />
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-8" />
      <TrendingJobs />
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-8" />
      <JobsSection />
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-8" />
      <CoursesSection />
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-8" />
      <WhyUplift />
      <BootcampBanner />
      <TopCompanies />
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-8" />
      <Testimonials />
      <CTASection />
      <Footer />
      <BottomNav/>
    </div>
  );
};

export default Home;