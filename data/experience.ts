export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Amazon Web Services",
    role: "Technical Program Manager III",
    location: "Remote",
    startDate: "June 2022",
    endDate: "Present",
    highlights: [
      "Led Basin platform (9PB daily data processing)",
      "Delivered $24.9M in annual cost savings",
      "Scaled platform 965% YoY",
      "Coordinated 40+ microservices across organizations",
      "Consistent 'Exceeds High Bar' performance ratings",
    ],
  },
  {
    id: "2",
    company: "NuORDER",
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
    author: "Manager",
    company: "Amazon",
    context: "Forte 2025 Review",
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
