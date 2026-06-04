import company from "./company.png"

export const categories = [
  { name: "Software", icon: "💻", jobs: "2.4k+ jobs" },
  { name: "Data Science", icon: "📊", jobs: "1.2k+ jobs" },
  { name: "Marketing", icon: "📢", jobs: "890 jobs" },
  { name: "Design", icon: "🎨", jobs: "650 jobs" },

  { name: "Sales", icon: "💼", jobs: "1.5k+ jobs" },
  { name: "Human Resources", icon: "👥", jobs: "420 jobs" },
  { name: "Finance", icon: "💰", jobs: "780 jobs" },
  { name: "Healthcare", icon: "🏥", jobs: "930 jobs" },

  { name: "Education", icon: "📚", jobs: "500 jobs" },
  { name: "Customer Support", icon: "📞", jobs: "1.1k+ jobs" },
  { name: "Engineering", icon: "🛠️", jobs: "1.8k+ jobs" },
  { name: "Legal", icon: "⚖️", jobs: "210 jobs" },

  { name: "Content Writing", icon: "✍️", jobs: "670 jobs" },
  { name: "Digital Marketing", icon: "📱", jobs: "980 jobs" },
  { name: "Cyber Security", icon: "🔐", jobs: "350 jobs" },
  { name: "AI / ML", icon: "🤖", jobs: "600 jobs" },
];


export const jobsData = [
  {
    _id: "1",
    title: "Frontend Developer",
    companyId: { _id: "c1", name: "TCS", email: "hr@tcs.com", image: company },
    location: "Bangalore",
    level: "Fresher",
    type: "Full-time",
    experience: "Fresher",
    salary: "₹3-5 LPA",
    date: "1 Feb 2026",
    applicants: 32,
    deadline: "10 Mar 2026",
    skills: ["React", "JavaScript", "Tailwind"],
    description: `
  <p>At TCS, we're not just building websites—we're crafting digital experiences that empower businesses and delight users. We're on the hunt for a Frontend Developer who lives and breathes React, someone who sees code as a creative medium and believes that great design is just as important as flawless functionality. If you're passionate about turning complex problems into simple, elegant interfaces and thrive in a collaborative, fast-paced environment, this is your stage.</p>

  <p>You'll be joining a dynamic team of designers and developers working on enterprise-level applications that reach millions. Every line of code you write will contribute to products that are scalable, accessible, and performant. We don't just focus on delivery—we focus on excellence. From pixel-perfect implementations to performance optimizations, your work will set the standard for frontend quality across the organization.</p>

  <h2><strong>Key Responsibilities</strong></h2>
  <ol>
    <li>Develop responsive and accessible UI using React.js.</li>
    <li>Convert Figma designs into pixel-perfect interfaces.</li>
    <li>Optimize performance for speed and scalability.</li>
    <li>Ensure cross-browser compatibility.</li>
    <li>Maintain reusable component libraries.</li>
  </ol>

  <h2><strong>Required Skills</strong></h2>
  <ol>
    <li>Strong knowledge of React & modern JavaScript.</li>
    <li>Understanding of responsive design.</li>
    <li>Experience with Tailwind or CSS frameworks.</li>
    <li>Basic Git workflow knowledge.</li>
    <li>Problem-solving mindset.</li>
  </ol>
  `
  },

  {
    _id: "2",
    title: "MERN Stack Developer",
    companyId: { _id: "c2", name: "Infosys", email: "hr@infosys.com", image:company },
    location: "Hyderabad",
    level: "internship",
    type: "Full-time",
    experience: "0-1 years",
    salary: "₹4-6 LPA",
    date: "3 Feb 2026",
    applicants: 45,
    deadline: "18 Mar 2026",
    skills: ["MongoDB", "Express", "React", "Node"],
    description: `
  <p>Infosys is where technology meets imagination. We're looking for a MERN Stack Developer who doesn't just write code but builds ecosystems. In this role, you'll architect and develop full-stack web applications that are robust, scalable, and future-ready. You'll work with a team of brilliant minds who are redefining what's possible with the MERN stack—MongoDB, Express, React, and Node.js.</p>

  <p>Imagine working on applications that handle thousands of concurrent users, where your APIs are the backbone of seamless user experiences. You'll not only build features but also own them—from database schema design to frontend implementation. We value engineers who think beyond syntax, who care about security, performance, and maintainability. If you're ready to take ownership and make an impact, Infosys is your home.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Develop RESTful APIs using Node.js & Express.</li>
    <li>Build dynamic frontends with React.</li>
    <li>Design MongoDB database schemas.</li>
    <li>Integrate third-party services & APIs.</li>
    <li>Ensure application security and performance.</li>
  </ol>

  <h2><strong>Requirements</strong></h2>
  <ol>
    <li>Strong understanding of MERN technologies.</li>
    <li>JWT authentication & REST APIs.</li>
    <li>Version control using Git.</li>
    <li>Debugging and optimization skills.</li>
    <li>Team collaboration ability.</li>
  </ol>
`
  },

  {
    _id: "3",
    title: "React Developer",
    companyId: { _id: "c3", name: "Wipro", email: "hr@wipro.com", image: company },
    location: "Remote",
    level: "Junior",
    type: "Remote",
    experience: "1 year",
    salary: "₹5 LPA",
    date: "5 Feb 2026",
    applicants: 28,
    deadline: "22 Mar 2026",
    skills: ["React", "Redux", "TypeScript"],
    description: `
  <p>Wipro isn't just a workplace; it's a launchpad for innovators. We're seeking a React Developer who eats, sleeps, and breathes component-based architecture. You'll be crafting high-performance user interfaces that are not only visually stunning but also lightning-fast and accessible to all. This is a remote role, giving you the freedom to work from anywhere while being part of a global team that's shaping the future of enterprise software.</p>

  <p>Your day-to-day will involve more than just coding—it's about solving real-world problems through technology. You'll collaborate with designers to bring mockups to life, work with backend engineers to integrate APIs seamlessly, and mentor junior developers along the way. We believe in clean code, continuous learning, and pushing boundaries. If you're a React enthusiast with an eye for detail and a heart for collaboration, let's talk.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Create reusable and maintainable components.</li>
    <li>Implement state management solutions.</li>
    <li>Improve performance and accessibility.</li>
    <li>Integrate APIs and backend services.</li>
    <li>Collaborate with distributed teams.</li>
  </ol>

  <h2><strong>Skills</strong></h2>
  <ol>
    <li>Strong React fundamentals.</li>
    <li>Redux or Context API knowledge.</li>
    <li>TypeScript familiarity.</li>
    <li>REST API integration.</li>
    <li>Clean coding practices.</li>
  </ol>
`
  },

  {
    _id: "4",
    title: "Backend Developer",
    companyId: { _id: "c2", name: "Infosys", email: "hr@infosys.com", image: company }, // ✅ Fixed: c4 → c2 (same as Infosys)
    location: "Noida",
    level: "Fresher",
    type: "Full-time",
    experience: "Fresher",
    salary: "₹3.5-5.5 LPA",
    date: "6 Feb 2026",
    applicants: 41,
    deadline: "25 Mar 2026",
    skills: ["Node.js", "MongoDB", "Express"],
    description: `
  <p>Infosys is where backend engineering meets innovation. We're searching for a Backend Developer who understands that the magic of an application happens behind the scenes. You'll design, build, and maintain the server-side logic that powers our most critical applications. This isn't just about writing endpoints—it's about creating secure, scalable, and high-performance systems that can handle millions of requests without breaking a sweat.</p>

  <p>You'll work with cutting-edge technologies like Node.js, Express, and MongoDB, and you'll have the opportunity to architect systems from the ground up. We value engineers who think about data integrity, security, and efficiency. You'll collaborate with frontend teams, DevOps, and product managers to deliver features that are robust and reliable. If you're passionate about building the invisible backbone of great software, Infosys is the place for you.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Develop REST APIs using Node.js.</li>
    <li>Design and manage MongoDB databases.</li>
    <li>Implement authentication & security layers.</li>
    <li>Optimize server performance.</li>
    <li>Write clean and maintainable code.</li>
  </ol>

  <h2><strong>Skills</strong></h2>
  <ol>
    <li>Node.js & Express expertise.</li>
    <li>Database design fundamentals.</li>
    <li>JWT authentication knowledge.</li>
    <li>Debugging & testing skills.</li>
    <li>Understanding of REST architecture.</li>
  </ol>
`
  },

  {
    _id: "5",
    title: "Full Stack Developer",
    companyId: { _id: "c5", name: "Tech Mahindra", email: "hr@techmahindra.com", image: company },
    location: "Pune",
    level: "Mid",
    type: "Full-time",
    experience: "2+ years",
    salary: "₹6-10 LPA",
    date: "7 Feb 2026",
    applicants: 52,
    deadline: "30 Mar 2026",
    skills: ["React", "Node", "AWS"],
    description: `
  <p>Tech Mahindra is on a mission to digitally transform the world, and we need Full Stack Developers who can lead the charge. This role is for those who love the big picture—who can jump from crafting a React component to optimizing an AWS Lambda function without missing a beat. You'll build scalable full-stack applications that solve complex business problems and deliver real value to users across the globe.</p>

  <p>As a Full Stack Developer, you'll have your hands in everything—frontend, backend, cloud, and databases. You'll work with modern tools and frameworks, collaborate with cross-functional teams, and have the autonomy to make architectural decisions. We're looking for someone who is curious, adaptable, and excited about learning new technologies. If you're a full-stack wizard who loves building end-to-end solutions, Tech Mahindra is your canvas.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Develop frontend & backend features.</li>
    <li>Integrate cloud services.</li>
    <li>Ensure performance & scalability.</li>
    <li>Maintain application security.</li>
    <li>Collaborate with cross-functional teams.</li>
  </ol>

  <h2><strong>Skills</strong></h2>
  <ol>
    <li>React & Node.js expertise.</li>
    <li>AWS fundamentals.</li>
    <li>Database optimization.</li>
    <li>System design basics.</li>
    <li>Team collaboration.</li>
  </ol>
`
  },

  {
    _id: "6",
    title: "UI/UX Designer",
    companyId: { _id: "c6", name: "Zoho", email: "hr@zoho.com", image: company },
    location: "Chennai",
    level: "Junior",
    type: "Full-time",
    experience: "1 year",
    salary: "₹4 LPA",
    date: "8 Feb 2026",
    applicants: 19,
    deadline: "20 Mar 2026",
    skills: ["Figma", "Adobe XD", "Wireframing"],
    description: `
  <p>At Zoho, design isn't just about how things look—it's about how they work. We're looking for a UI/UX Designer who understands that great design is invisible, intuitive, and delightful. You'll be the voice of the user, advocating for simplicity and usability in every product decision. From wireframes to high-fidelity prototypes, you'll shape experiences that users love and remember.</p>

  <p>You'll work closely with product managers, developers, and researchers to understand user needs and translate them into beautiful, functional designs. We believe in data-driven design, so you'll conduct user research, A/B testing, and usability studies to validate your ideas. If you're a designer who thinks beyond pixels—who cares about user psychology, accessibility, and business goals—Zoho is your playground.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Create wireframes & prototypes.</li>
    <li>Conduct user research.</li>
    <li>Improve usability & accessibility.</li>
    <li>Collaborate with developers.</li>
    <li>Maintain design systems.</li>
  </ol>

  <h2><strong>Skills</strong></h2>
  <ol>
    <li>Figma & Adobe XD expertise.</li>
    <li>UX principles knowledge.</li>
    <li>Creative thinking.</li>
    <li>Attention to detail.</li>
    <li>User empathy mindset.</li>
  </ol>
`
  },

  {
    _id: "7",
    title: "DevOps Engineer",
    companyId: { _id: "c7", name: "Amazon", email: "hr@amazon.com", image: company },
    location: "Bangalore",
    level: "Mid",
    type: "Full-time",
    experience: "2-4 years",
    salary: "₹12-18 LPA",
    date: "9 Feb 2026",
    applicants: 67,
    deadline: "5 Apr 2026",
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
    description: `
  <p>Amazon thrives on reliability, scalability, and speed—and our DevOps Engineers are the guardians of these principles. We're seeking a DevOps Engineer who can build and maintain the infrastructure that powers one of the world's largest e-commerce platforms. You'll automate everything that can be automated, optimize everything that can be optimized, and ensure that our systems are always up, always fast, and always secure.</p>

  <p>This is a role for engineers who love the intersection of development and operations. You'll work with AWS, Docker, Kubernetes, and Jenkins to create CI/CD pipelines that enable rapid, reliable deployments. You'll monitor system performance, troubleshoot issues, and implement solutions that prevent problems before they happen. If you're passionate about infrastructure as code, automation, and high-availability systems, Amazon is where you belong.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Manage AWS cloud infrastructure.</li>
    <li>Implement CI/CD pipelines using Jenkins.</li>
    <li>Containerize apps using Docker & Kubernetes.</li>
    <li>Monitor system performance & uptime.</li>
    <li>Automate deployment processes.</li>
  </ol>

  <h2><strong>Requirements</strong></h2>
  <ol>
    <li>AWS services expertise.</li>
    <li>Docker & K8s hands-on experience.</li>
    <li>Infrastructure as Code knowledge.</li>
    <li>Scripting in Python or Bash.</li>
    <li>Problem-solving attitude.</li>
  </ol>
`
  },

  {
    _id: "8",
    title: "Data Scientist",
    companyId: { _id: "c8", name: "Microsoft", email: "hr@microsoft.com", image: company },
    location: "Hyderabad",
    level: "Senior",
    type: "Full-time",
    experience: "4-6 years",
    salary: "₹20-30 LPA",
    date: "10 Feb 2026",
    applicants: 38,
    deadline: "12 Apr 2026",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    description: `
  <p>Microsoft's AI team is at the forefront of technological innovation, and we're looking for a Data Scientist to join our ranks. This isn't just about building models—it's about solving problems that matter. You'll work on projects that impact millions of users, from improving search algorithms to building intelligent assistants that understand natural language. If you're passionate about machine learning, deep learning, and turning data into insights, this is your dream job.</p>

  <p>You'll have access to massive datasets, cutting-edge tools like TensorFlow and PyTorch, and a team of world-class researchers and engineers. You'll design experiments, train models, and deploy them to production, seeing your work come to life in real-world applications. We value curiosity, creativity, and a strong mathematical foundation. If you're ready to push the boundaries of what AI can do, Microsoft is the place for you.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Develop ML models for business problems.</li>
    <li>Analyze large datasets for insights.</li>
    <li>Deploy models to production.</li>
    <li>Optimize model performance.</li>
    <li>Collaborate with engineering teams.</li>
  </ol>

  <h2><strong>Skills</strong></h2>
  <ol>
    <li>Strong Python & SQL skills.</li>
    <li>ML frameworks like TensorFlow.</li>
    <li>Statistical analysis expertise.</li>
    <li>Data visualization abilities.</li>
    <li>Research & publication record.</li>
  </ol>
`
  },

  {
    _id: "9",
    title: "Android Developer",
    companyId: { _id: "c9", name: "Google", email: "hr@google.com", image: company },
    location: "Bangalore",
    level: "Mid",
    type: "Full-time",
    experience: "2-3 years",
    salary: "₹15-22 LPA",
    date: "11 Feb 2026",
    applicants: 73,
    deadline: "15 Apr 2026",
    skills: ["Kotlin", "Jetpack Compose", "Android SDK"],
    description: `
  <p>Google builds products for billions of users, and as an Android Developer, your code will be in the pockets of people around the world. We're looking for someone who is passionate about the Android ecosystem—who stays up-to-date with the latest Jetpack libraries, understands Material Design inside out, and cares deeply about app performance and user experience.</p>

  <p>You'll work on apps that are used daily by millions, collaborating with world-class designers and product managers to deliver features that are both beautiful and functional. From implementing complex animations to optimizing battery usage, you'll tackle challenges that require both creativity and technical depth. If you're an Android enthusiast who wants to make a global impact, Google is your home.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Develop native Android apps using Kotlin.</li>
    <li>Implement modern UI with Jetpack Compose.</li>
    <li>Ensure app performance & security.</li>
    <li>Write clean, testable code.</li>
    <li>Collaborate with cross-functional teams.</li>
  </ol>

  <h2><strong>Requirements</strong></h2>
  <ol>
    <li>Kotlin & Android SDK expertise.</li>
    <li>Jetpack Compose experience.</li>
    <li>Material Design guidelines.</li>
    <li>REST API integration.</li>
    <li>Play Store deployment knowledge.</li>
  </ol>
`
  },

  {
    _id: "10",
    title: "iOS Developer",
    companyId: { _id: "c10", name: "Apple", email: "hr@apple.com", image: company },
    location: "Hyderabad",
    level: "Mid",
    type: "Full-time",
    experience: "2-4 years",
    salary: "₹16-24 LPA",
    date: "12 Feb 2026",
    applicants: 41,
    deadline: "18 Apr 2026",
    skills: ["Swift", "SwiftUI", "iOS", "Core Data"],
    description: `
  <p>Apple is synonymous with innovation, and as an iOS Developer, you'll be part of a legacy that values design, performance, and user experience above all else. We're looking for someone who is passionate about the Apple ecosystem—who loves SwiftUI, understands the nuances of Human Interface Guidelines, and cares deeply about creating apps that feel magical to use.</p>

  <p>You'll work on applications that are used by millions of Apple users worldwide, collaborating with designers and engineers who set the standard for mobile development. From implementing smooth animations to ensuring apps are accessible to everyone, you'll tackle challenges that require both technical excellence and creative thinking. If you're an iOS developer who dreams in Swift and cares about every pixel, Apple is where you belong.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Build iOS apps using Swift & SwiftUI.</li>
    <li>Implement Apple design guidelines.</li>
    <li>Optimize app performance.</li>
    <li>Integrate with backend services.</li>
    <li>Write unit tests & debug issues.</li>
  </ol>

  <h2><strong>Skills</strong></h2>
  <ol>
    <li>Swift & SwiftUI proficiency.</li>
    <li>iOS SDK & Core Data.</li>
    <li>Combine framework knowledge.</li>
    <li>App Store submission process.</li>
    <li>Strong problem-solving skills.</li>
  </ol>
`
  },

  {
    _id: "11",
    title: "Cloud Architect",
    companyId: { _id: "c11", name: "Oracle", email: "hr@oracle.com", image: company },
    location: "Mumbai",
    level: "Senior",
    type: "Full-time",
    experience: "6-8 years",
    salary: "₹30-45 LPA",
    date: "13 Feb 2026",
    applicants: 22,
    deadline: "20 Apr 2026",
    skills: ["AWS", "Azure", "Cloud Security", "Terraform"],
    description: `
  <p>Oracle is redefining what's possible in the cloud, and we need a Cloud Architect who can design the future. This role is for strategic thinkers who understand that cloud architecture is about more than just servers and storage—it's about scalability, security, cost optimization, and business continuity. You'll work with enterprise clients to design solutions that are robust, resilient, and ready for anything.</p>

  <p>You'll have expertise across AWS, Azure, and Oracle Cloud, and you'll use Infrastructure as Code tools like Terraform to build environments that are reproducible and manageable. You'll lead migration projects, mentor junior architects, and work closely with clients to understand their unique challenges. If you're a cloud visionary who loves solving complex problems, Oracle is your platform.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Design cloud architecture strategies.</li>
    <li>Implement security best practices.</li>
    <li>Optimize cloud costs & performance.</li>
    <li>Lead migration projects.</li>
    <li>Mentor junior engineers.</li>
  </ol>

  <h2><strong>Requirements</strong></h2>
  <ol>
    <li>Multi-cloud expertise (AWS/Azure).</li>
    <li>Infrastructure as Code tools.</li>
    <li>Security & compliance knowledge.</li>
    <li>Strong communication skills.</li>
    <li>Relevant cloud certifications.</li>
  </ol>
`
  },

  {
    _id: "12",
    title: "Cybersecurity Analyst",
    companyId: { _id: "c12", name: "Cisco", email: "hr@cisco.com", image: company },
    location: "Bangalore",
    level: "Junior",
    type: "Full-time",
    experience: "1-2 years",
    salary: "₹6-9 LPA",
    date: "14 Feb 2026",
    applicants: 33,
    deadline: "22 Apr 2026",
    skills: ["Network Security", "Penetration Testing", "SIEM"],
    description: `
  <p>Cisco is the backbone of the internet, and our Cybersecurity Analysts are the guardians of that backbone. We're looking for someone who is passionate about security—who thinks like a hacker to protect against hackers. You'll monitor networks, analyze threats, and implement measures that keep our systems and our clients' data safe from ever-evolving cyber threats.</p>

  <p>This role is for those who are always learning, because the threat landscape changes daily. You'll work with cutting-edge security tools, conduct penetration tests, and collaborate with teams across the organization to ensure security is built into everything we do. If you're a security enthusiast who wants to make the digital world a safer place, Cisco is your mission.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Monitor security incidents & alerts.</li>
    <li>Conduct vulnerability assessments.</li>
    <li>Implement security policies.</li>
    <li>Perform penetration testing.</li>
    <li>Create security reports.</li>
  </ol>

  <h2><strong>Skills</strong></h2>
  <ol>
    <li>Network security fundamentals.</li>
    <li>SIEM tools experience.</li>
    <li>Ethical hacking knowledge.</li>
    <li>Risk assessment abilities.</li>
    <li>Security certifications preferred.</li>
  </ol>
`
  },

  {
    _id: "13",
    title: "QA Automation Engineer",
    companyId: { _id: "c13", name: "Adobe", email: "hr@adobe.com", image: company },
    location: "Noida",
    level: "Mid",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₹8-12 LPA",
    date: "15 Feb 2026",
    applicants: 47,
    deadline: "25 Apr 2026",
    skills: ["Selenium", "Java", "TestNG", "Cucumber"],
    description: `
  <p>Adobe creates tools that power creativity around the world, and as a QA Automation Engineer, you'll ensure those tools are flawless. We're looking for someone who believes that quality is not an afterthought—it's built into every line of code. You'll design and maintain automation frameworks that catch bugs before they reach users, ensuring that Adobe's products are always reliable and performant.</p>

  <p>You'll work with Selenium, Java, and Cucumber to create test suites that run continuously, integrating with CI/CD pipelines to provide rapid feedback to developers. You'll also have the opportunity to explore performance testing, security testing, and new testing methodologies. If you're passionate about quality and automation, Adobe is your canvas.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Design & maintain automation frameworks.</li>
    <li>Create & execute test cases.</li>
    <li>Identify & report bugs.</li>
    <li>Integrate tests in CI/CD.</li>
    <li>Performance testing & analysis.</li>
  </ol>

  <h2><strong>Requirements</strong></h2>
  <ol>
    <li>Selenium WebDriver expertise.</li>
    <li>Java/Python programming.</li>
    <li>Cucumber & BDD knowledge.</li>
    <li>API testing experience.</li>
    <li>Attention to detail.</li>
  </ol>
`
  },

  {
    _id: "14",
    title: "Product Manager",
    companyId: { _id: "c14", name: "Salesforce", email: "hr@salesforce.com", image: company },
    location: "Hyderabad",
    level: "Senior",
    type: "Full-time",
    experience: "5-7 years",
    salary: "₹25-40 LPA",
    date: "16 Feb 2026",
    applicants: 28,
    deadline: "28 Apr 2026",
    skills: ["Product Strategy", "Agile", "Market Research", "Roadmapping"],
    description: `
  <p>Salesforce is the world's leading CRM platform, and our Product Managers are the visionaries who shape its future. We're looking for someone who can see the big picture—who understands market trends, customer needs, and technical possibilities—and translate that vision into a roadmap that delivers real value. You'll work with engineering, design, marketing, and sales to bring products from concept to launch and beyond.</p>

  <p>This role is for strategic thinkers who are also hands-on. You'll gather requirements, prioritize features, write user stories, and work closely with development teams to ensure successful delivery. You'll analyze market data, talk to customers, and iterate based on feedback. If you're a product leader who wants to build software that transforms how businesses operate, Salesforce is your stage.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Define product roadmap & strategy.</li>
    <li>Gather & prioritize requirements.</li>
    <li>Work with engineering & design teams.</li>
    <li>Analyze market trends & competition.</li>
    <li>Launch & monitor product features.</li>
  </ol>

  <h2><strong>Skills</strong></h2>
  <ol>
    <li>Product lifecycle management.</li>
    <li>Agile methodology expertise.</li>
    <li>Strong analytical skills.</li>
    <li>Excellent communication.</li>
    <li>Technical background preferred.</li>
  </ol>
`
  },

  {
    _id: "15",
    title: "Technical Writer",
    companyId: { _id: "c15", name: "Atlassian", email: "hr@atlassian.com", image: company },
    location: "Remote",
    level: "Junior",
    type: "Remote",
    experience: "1-2 years",
    salary: "₹5-7 LPA",
    date: "17 Feb 2026",
    applicants: 19,
    deadline: "30 Apr 2026",
    skills: ["Documentation", "API Docs", "Markdown", "Technical Writing"],
    description: `
  <p>Atlassian builds tools for developers, and our Technical Writers are the bridge between complex technology and the people who use it. We're looking for someone who can take intricate technical concepts and turn them into clear, concise, and helpful documentation. You'll write API docs, user guides, tutorials, and more, helping millions of developers around the world be more productive.</p>

  <p>This role is for writers who love technology—who aren't afraid to dive into code, ask questions, and learn new tools. You'll work closely with engineers to understand features, and with product managers to understand user needs. You'll maintain documentation standards, contribute to style guides, and ensure that every piece of content is accurate and useful. If you're a technical writer who wants to empower developers, Atlassian is your home.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Write API documentation & guides.</li>
    <li>Create user manuals & tutorials.</li>
    <li>Maintain documentation standards.</li>
    <li>Collaborate with engineers.</li>
    <li>Update existing documentation.</li>
  </ol>

  <h2><strong>Requirements</strong></h2>
  <ol>
    <li>Excellent writing & editing skills.</li>
    <li>Technical background understanding.</li>
    <li>Markdown & Git knowledge.</li>
    <li>API documentation experience.</li>
    <li>Attention to detail.</li>
  </ol>
`
  },

  {
    _id: "16",
    title: "Database Administrator",
    companyId: { _id: "c16", name: "IBM", email: "hr@ibm.com", image: company },
    location: "Pune",
    level: "Mid",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₹10-15 LPA",
    date: "18 Feb 2026",
    applicants: 31,
    deadline: "2 May 2026",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Database Optimization"],
    description: `
  <p>IBM has been at the forefront of data management for decades, and as a Database Administrator, you'll be part of that legacy. We're looking for someone who understands that data is the lifeblood of modern applications—and that keeping that data safe, available, and performant is a critical responsibility. You'll manage databases across SQL and NoSQL platforms, ensuring they're optimized for the workloads they support.</p>

  <p>You'll work with MySQL, PostgreSQL, MongoDB, and more, handling everything from installation and configuration to performance tuning and disaster recovery. You'll implement backup strategies, monitor system health, and troubleshoot issues before they impact users. If you're a DBA who takes pride in keeping data safe and systems running smoothly, IBM is where you belong.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Install & configure database servers.</li>
    <li>Monitor & optimize performance.</li>
    <li>Implement backup & recovery.</li>
    <li>Ensure data security.</li>
    <li>Troubleshoot database issues.</li>
  </ol>

  <h2><strong>Skills</strong></h2>
  <ol>
    <li>SQL & NoSQL expertise.</li>
    <li>Performance tuning knowledge.</li>
    <li>Replication & clustering.</li>
    <li>Automation scripts.</li>
    <li>Problem-solving skills.</li>
  </ol>
`
  },

  {
    _id: "17",
    title: "Blockchain Developer",
    companyId: { _id: "c17", name: "Coinbase", email: "hr@coinbase.com", image: company },
    location: "Bangalore",
    level: "Mid",
    type: "Full-time",
    experience: "2-4 years",
    salary: "₹18-28 LPA",
    date: "19 Feb 2026",
    applicants: 24,
    deadline: "5 May 2026",
    skills: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts"],
    description: `
  <p>Coinbase is on a mission to increase economic freedom in the world, and we need Blockchain Developers to build the infrastructure that makes it possible. This role is for those who believe in the power of decentralized technology—who understand that blockchain is more than just cryptocurrency, it's a new way of building trust and transparency into digital systems.</p>

  <p>You'll develop and deploy smart contracts on Ethereum, build dApps with Web3.js, and work with cutting-edge DeFi protocols. You'll implement security best practices, optimize gas costs, and stay at the forefront of blockchain innovation. If you're a blockchain enthusiast who wants to build the future of finance, Coinbase is your platform.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Develop & deploy smart contracts.</li>
    <li>Build dApps with Web3 integration.</li>
    <li>Implement security best practices.</li>
    <li>Optimize gas costs.</li>
    <li>Stay updated with blockchain tech.</li>
  </ol>

  <h2><strong>Requirements</strong></h2>
  <ol>
    <li>Solidity & Ethereum expertise.</li>
    <li>Web3.js/ethers.js knowledge.</li>
    <li>Smart contract security.</li>
    <li>Understanding of DeFi protocols.</li>
    <li>Problem-solving mindset.</li>
  </ol>
`
  },

  {
    _id: "18",
    title: "System Administrator",
    companyId: { _id: "c18", name: "Dell", email: "hr@dell.com", image: company },
    location: "Chennai",
    level: "Junior",
    type: "Full-time",
    experience: "1-2 years",
    salary: "₹4-6 LPA",
    date: "20 Feb 2026",
    applicants: 42,
    deadline: "8 May 2026",
    skills: ["Linux", "Windows Server", "Networking", "Shell Scripting"],
    description: `
  <p>Dell powers the infrastructure that businesses rely on, and as a System Administrator, you'll be the person keeping those systems running. We're looking for someone who loves the challenge of maintaining complex IT environments—who can troubleshoot a server issue, configure a network, and automate routine tasks, all while keeping security top of mind.</p>

  <p>You'll work with Linux and Windows servers, manage user accounts and permissions, and ensure that systems are patched and secure. You'll monitor performance, respond to incidents, and implement solutions that prevent problems from recurring. If you're a sysadmin who thrives on keeping things running smoothly and securely, Dell is your home.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Install & configure servers.</li>
    <li>Monitor system performance.</li>
    <li>Manage user accounts & permissions.</li>
    <li>Troubleshoot hardware/software issues.</li>
    <li>Implement security patches.</li>
  </ol>

  <h2><strong>Skills</strong></h2>
  <ol>
    <li>Linux & Windows administration.</li>
    <li>Networking fundamentals.</li>
    <li>Shell/Python scripting.</li>
    <li>Virtualization knowledge.</li>
    <li>ITIL processes understanding.</li>
  </ol>
`
  },

  {
    _id: "19",
    title: "AI/ML Engineer",
    companyId: { _id: "c19", name: "NVIDIA", email: "hr@nvidia.com", image: company },
    location: "Bangalore",
    level: "Senior",
    type: "Full-time",
    experience: "4-6 years",
    salary: "₹25-40 LPA",
    date: "21 Feb 2026",
    applicants: 36,
    deadline: "10 May 2026",
    skills: ["Deep Learning", "PyTorch", "Computer Vision", "CUDA"],
    description: `
  <p>NVIDIA is at the heart of the AI revolution, and as an AI/ML Engineer, you'll be building the technology that powers everything from self-driving cars to medical breakthroughs. We're looking for someone who is passionate about deep learning, computer vision, and GPU-accelerated computing—who wants to push the boundaries of what artificial intelligence can achieve.</p>

  <p>You'll work with PyTorch, CUDA, and massive datasets to train models that are faster, more accurate, and more efficient. You'll optimize models for deployment, collaborate with researchers, and contribute to projects that are changing the world. If you're an AI engineer who dreams in vectors and gradients, NVIDIA is your dream job.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Design & train deep learning models.</li>
    <li>Optimize models for GPU performance.</li>
    <li>Implement computer vision algorithms.</li>
    <li>Deploy models to production.</li>
    <li>Research latest AI advancements.</li>
  </ol>

  <h2><strong>Requirements</strong></h2>
  <ol>
    <li>PyTorch/TensorFlow expertise.</li>
    <li>Computer vision experience.</li>
    <li>CUDA optimization skills.</li>
    <li>Strong mathematics background.</li>
    <li>Research publications preferred.</li>
  </ol>
`
  },

  {
    _id: "20",
    title: "Business Analyst",
    companyId: { _id: "c20", name: "Deloitte", email: "hr@deloitte.com", image: company },
    location: "Mumbai",
    level: "Mid",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₹9-14 LPA",
    date: "22 Feb 2026",
    applicants: 55,
    deadline: "12 May 2026",
    skills: ["Data Analysis", "SQL", "Tableau", "Requirements Gathering"],
    description: `
  <p>Deloitte helps businesses solve their most complex challenges, and as a Business Analyst, you'll be the person who uncovers the insights that drive those solutions. We're looking for someone who loves data—who can analyze trends, gather requirements, and translate business needs into technical specifications that engineers can build.</p>

  <p>You'll work with stakeholders across the organization, from executives to developers, to understand their goals and challenges. You'll create process flow diagrams, write user stories, and validate that solutions meet business needs. You'll use SQL and Tableau to analyze data and present findings in a way that drives decision-making. If you're a business analyst who wants to make a real impact, Deloitte is your stage.</p>

  <h2><strong>Responsibilities</strong></h2>
  <ol>
    <li>Gather & document business requirements.</li>
    <li>Analyze data for insights.</li>
    <li>Create process flow diagrams.</li>
    <li>Coordinate with stakeholders.</li>
    <li>Validate solutions with users.</li>
  </ol>

  <h2><strong>Skills</strong></h2>
  <ol>
    <li>SQL & data visualization.</li>
    <li>Requirements documentation.</li>
    <li>Agile methodology knowledge.</li>
    <li>Strong communication skills.</li>
    <li>Problem-solving abilities.</li>
  </ol>
`
  }
];