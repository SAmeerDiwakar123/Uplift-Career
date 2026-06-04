import React from 'react'


const HowWorks = () => {
  const steps = [
    {
      title: "Create Account",
      desc: "Sign up and complete your profile",
    },
    {
      title: "Search Jobs",
      desc: "Browse jobs based on your skills",
    },
    {
      title: "Apply Easily",
      desc: "Apply with just one click",
    },
  ];

  return (
    <section id='how-it-works' className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <h2 className="text-3xl font-bold text-gray-900">
          How It Works
        </h2>
        <p className="text-gray-500 mt-2">
          Get your dream job in 3 simple steps
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border hover:shadow-md transition"
            >
              <div className="text-indigo-600 text-2xl font-bold mb-2">
                {i + 1}
              </div>

              <h3 className="font-semibold text-gray-900">
                {step.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowWorks;