export interface Experience {
  id: string;
  company: string;
  logo?: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title?: string;
  company: string;
  context: string;
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Amazon Web Services",
    logo: "/images/logos/aws.svg",
    role: "Technical Program Manager III",
    location: "Remote",
    startDate: "June 2022",
    endDate: "Present",
    highlights: [
      "Led Basin platform (9PB daily data processing)",
      "Delivered $24.9M in annual cost savings",
      "Scaled platform 965% YoY",
      "Coordinated 40+ microservices across organizations",
      "Enabled EPP team's insider threat detection and IP protection through Basin data integration",
      "Served as interim Engineering Manager for 3 months, leading a development team during manager's medical leave",
      "Consistent 'Exceeds High Bar' performance ratings",
    ],
  },
  {
    id: "2",
    company: "NuORDER",
    logo: "/images/logos/nuorder.svg",
    role: "Principal Product Manager",
    location: "Remote",
    startDate: "2021",
    endDate: "2022",
    highlights: [
      "Owned platform modernization strategy",
      "Drove 28% ARR growth in 6 months",
      "Led monolith to microservices transformation",
      "Implemented comprehensive CI/CD pipelines",
      "Developed reusable API framework",
    ],
  },
  {
    id: "3",
    company: "Kibo Commerce",
    logo: "/images/logos/kibo.svg",
    role: "Multiple Roles (Product Manager → TPM → Principal PM)",
    location: "Dallas, TX",
    startDate: "2011",
    endDate: "2021",
    highlights: [
      "Built fraud detection system from scratch",
      "Reduced implementation time 50% (8mo → 4mo)",
      "Improved project margin 120%",
      "Led enterprise commerce platform initiatives",
      "Managed $110M+ revenue platform",
    ],
  },
  {
    id: "4",
    company: "John Deere",
    logo: "/images/logos/john-deere.svg",
    role: "Manufacturing Operations",
    location: "Moline, IL",
    startDate: "2010",
    endDate: "2011",
    highlights: [
      "Reduced manufacturing overhead 26% ($3.2M savings)",
      "Earned Six Sigma Black Belt certification",
      "Applied Lean methodologies to production",
      "Optimized workflows and processes",
    ],
  },
  {
    id: "5",
    company: "Performance Food Group",
    logo: "/images/logos/pfg.svg",
    role: "Inventory Management",
    location: "Illinois",
    startDate: "2004",
    endDate: "2010",
    highlights: [
      "Managed large-scale inventory operations",
      "Developed analytical skills and business acumen",
      "Built foundation in supply chain management",
    ],
  },
];

export const testimonials = [
  {
    id: "1",
    quote:
      "I appreciate that you are self-motivated — you see problems and you act. I found myself saying on more than one occasion: 'Rob can you look at X problem', only to find you've already got the ball rolling. What stands out for me is that you exhibit curiosity and dive deep into projects and technologies and grow in understanding.",
    author: "Josh Nibecker",
    title: "Sr. Manager, Amazon Security",
    company: "Amazon",
    context: "Forte 2025 Review",
  },
  {
    id: "2",
    quote:
      "Throughout the project, I witnessed first-hand Rob's technical experience and deep understanding of cloud technology and the development of large-scale data platforms operating at petabyte scale. Combined with his excellent communication skills, he effectively kept both technical and non-technical stakeholders aligned, informed, and moving in the same direction throughout a complex, cross-team initiative. Under his leadership, new infrastructure deployment effort was reduced from 3–4 weeks to 2–3 days—an ~86% reduction in infrastructure deployment time.",
    author: "Atul Shaurya",
    title: "Senior Software Engineer",
    company: "Amazon",
    context: "January 2026",
  },
  {
    id: "3",
    quote:
      "Rob's tenacity and persistence make him a highly effective team member. His product and industry knowledge allow him to communicate requirements from clients to engineers effectively, which is an invaluable skill. Our small team of engineers depended on Rob to relay issues to stakeholders and make us aware of client needs. In this way, he was indispensable to us, and many projects likely would not have got off the ground without his input.",
    author: "Daniel Thorogood",
    title: "Lead Developer",
    company: "Kibo Commerce",
    context: "January 2017",
  },
  {
    id: "4",
    quote:
      "Rob is a smart and extremely hard working Product Manager that I have had the pleasure to work with for the past 5 years. Over that time, our company has grown and grown and his technical expertise and commitment to excellence has contributed to the success of our company. I would recommend him to any company that wants a Product Manager that can take a project from an idea to fruition.",
    author: "Vincent Sordo",
    title: "AI Agency Owner & Engineering Leader",
    company: "Kibo Commerce",
    context: "January 2017",
  },
  {
    id: "5",
    quote:
      "Rob is a talented Product Manager with a strong commitment to defining clear requirements that are customer centered. He is great at engaging cross functional teams to ensure smooth development and implementation. Through it all, he has a positive attitude and brings a friendly sense of humor to the team as well.",
    author: "Jamie Laughlin",
    title: "Head of Global Digital Success",
    company: "Shopatron (Kibo Commerce)",
    context: "November 2019",
  },
  {
    id: "6",
    quote:
      "Rob is very detail oriented with any project he worked on. He was always able to keep all areas of the company in mind when making recommendations and decisions. Rob was never afraid of pitching in to help others to advance the overall team.",
    author: "Ted Thoms",
    title: "Senior Leader",
    company: "Kibo Commerce",
    context: "April 2009",
  },
  {
    id: "7",
    quote:
      "Rob is an extremely dedicated person who gives everything he has no matter what the task at hand. He will not accept anything less than the best from himself, and pushes others to strive for the same personal success. This, coupled with his proficiency to problem solve and plan ahead, is what makes him an outstanding manager, an invaluable team player and a genuinely admirable leader.",
    author: "Mallory Jenkins",
    title: "Marketing & Communications Leader",
    company: "Colleague",
    context: "April 2009",
  },
  {
    id: "8",
    quote:
      "Rob was an excellent partner in the management of store operations and employee development. Rob has a drive not commonly found and a resourcefulness that is difficult to faze. Rob's skills and abilities would make him an asset to any team.",
    author: "Robert F. Boyer",
    title: "Regional Manager",
    company: "Best Buy",
    context: "Direct Manager",
  },
  {
    id: "9",
    quote:
      "The word dedication certainly applies to Rob. I had the opportunity to watch Rob at his best and the results were above and beyond others in the same position. He has progressed through his career by learning each and every position he has held quickly and efficiently.",
    author: "Dave Burnham",
    title: "Electronic Repair Supervisor",
    company: "Best Buy",
    context: "April 2009",
  },
  {
    id: "10",
    quote:
      "Rob Frew is one of the smartest people I have ever had the pleasure to work with. He is a fast thinker who is able to find the solution to almost any predicament he finds. He works far beyond status quo. Any company would benefit from his vast book of knowledge.",
    author: "Jan Shirley",
    title: "Experienced Buyer",
    company: "Colleague",
    context: "May 2011",
  },
  {
    id: "11",
    quote:
      "I have known Rob for many years. Rob is a hard working goal oriented person who seems to bring out the best in people. Rob has a strong work ethic and is an extremely quick learner. Rob knows so much about so many different things, he is truly a jack of all trades.",
    author: "Alan DeBaene",
    title: "Senior Cybersecurity Engineer",
    company: "UW Health",
    context: "April 2009",
  },
];

export const approachItems = [
  {
    title: "Cross-Functional Influence",
    description:
      "I build consensus by understanding stakeholder needs first, creating clear value propositions, and focusing on enabling others' success rather than directing them. When I led Basin's integration into AWS Metering—spanning Security, Finance, AWS Billing, and 40+ microservices—I succeeded by demonstrating how the program would solve each stakeholder's specific pain points.",
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Every major decision I make is backed by quantitative analysis. I use metrics not just to track progress, but to drive alignment and build credibility. Whether it's creating financial models showing $12.7M in improved cost attribution or forecasting 965% YoY growth to inform infrastructure planning, data transforms opinions into action.",
  },
  {
    title: "Systems Thinking",
    description:
      "I see the big picture while managing details. I identify dependencies others miss, optimize for the whole system rather than individual components, and design solutions that scale. This approach enabled me to manage Basin's expansion from 92PB to 989PB monthly while maintaining reliability and reducing costs.",
  },
  {
    title: "Problem-Solving Methodology",
    description:
      "When facing complex challenges, I analyze from multiple angles, identify core underlying issues, and work backwards to develop solutions. Rather than focusing on obstacles, I consistently seek ways to overcome them—a positive, solution-oriented mindset that's proven particularly effective in navigating multi-stakeholder problems.",
  },
];
