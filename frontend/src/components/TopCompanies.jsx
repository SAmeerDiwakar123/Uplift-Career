import React from "react";

const companies = [
  { 
    name: "TCS", 
     logo: "https://tse3.mm.bing.net/th/id/OIP.wGvIBluul352FAXwe6Y6fgHaHa?pid=Api&P=0&h=180"  
  },
  { 
    name: "Infosys", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" 
  },
  { 
    name: "Wipro", 
    logo: "https://1000logos.net/wp-content/uploads/2021/05/Wipro-logo.png" 
  },
  { 
    name: "Google", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
  },
  { 
    name: "Amazon", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
  },
  { 
    name: "Microsoft", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" 
  },
];

const TopCompanies = () => {
  return (
    <section id="companies" className="py-8 sm:py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
          Top Companies Hiring Now
        </h2>
        <p className="text-xs sm:text-base text-gray-500 mt-1 sm:mt-2">
          Join leading companies and grow your career
        </p>

        <div className="mt-6 sm:mt-10 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-6">
          {companies.map((company, i) => (
            <div
              key={i}
              className="bg-gray-50 p-2.5 sm:p-5 rounded-lg sm:rounded-xl border flex items-center justify-center hover:shadow-md transition"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-5 sm:h-8 object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopCompanies;