export type ProficiencyLevel = "Expert" | "Proficient" | "Familiar";

export interface Skill {
  name: string;
  level: ProficiencyLevel;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Cloud & Infrastructure",
    skills: [
      { name: "AWS (S3, EC2, Lambda, SageMaker, CloudWatch)", level: "Expert" },
      { name: "Multi-Region Deployments", level: "Expert" },
      { name: "Cloud-Native Architecture", level: "Expert" },
      { name: "Infrastructure as Code", level: "Proficient" },
      { name: "High Availability Design", level: "Expert" },
      { name: "Distributed Systems", level: "Expert" },
    ],
  },
  {
    title: "Data & Platform Engineering",
    skills: [
      { name: "Large-Scale Data Pipelines (9PB daily)", level: "Expert" },
      { name: "Real-Time Data Processing", level: "Expert" },
      { name: "Data Governance & Quality Frameworks", level: "Expert" },
      { name: "Microservices Architecture", level: "Expert" },
      { name: "API Development & Integration", level: "Expert" },
      { name: "Platform Orchestration", level: "Expert" },
    ],
  },
  {
    title: "AI/ML Infrastructure",
    skills: [
      { name: "ML Data Pipelines", level: "Proficient" },
      { name: "Model Performance Monitoring", level: "Proficient" },
      { name: "Data Validation for ML", level: "Expert" },
      { name: "ML Infrastructure Support", level: "Proficient" },
    ],
  },
  {
    title: "Program & Product Management",
    skills: [
      { name: "Technical Program Management", level: "Expert" },
      { name: "Cross-Functional Leadership", level: "Expert" },
      { name: "Stakeholder Management", level: "Expert" },
      { name: "Risk & Dependency Management", level: "Expert" },
      { name: "Agile/Scrum Methodologies", level: "Expert" },
      { name: "Product Strategy & Roadmaps", level: "Expert" },
    ],
  },
  {
    title: "Release Management & CI/CD",
    skills: [
      { name: "Release Pipeline Architecture", level: "Expert" },
      { name: "CI/CD Implementation", level: "Expert" },
      { name: "Quality Frameworks", level: "Expert" },
      { name: "Change Control", level: "Expert" },
      { name: "Deployment Confidence", level: "Expert" },
    ],
  },
  {
    title: "Financial & Cost Management",
    skills: [
      { name: "Infrastructure Cost Optimization", level: "Expert" },
      { name: "Usage-Based Cost Allocation", level: "Expert" },
      { name: "Financial Planning & Forecasting", level: "Expert" },
      { name: "Budget Management ($70M+)", level: "Expert" },
    ],
  },
];

export const methodologies = [
  "Lean/Six Sigma (Black Belt Certified)",
  "Lean Startup Method",
  "Amazon Leadership Principles",
  "Systems Thinking",
  "Continuous Improvement (Kaizen)",
  "Technical Risk Assessment",
];

export const tools = [
  "Jira",
  "Confluence",
  "Git / Version Control",
  "CI/CD Tools",
  "Datadog",
  "New Relic",
  "Tableau",
  "AWS Console & CLI",
  "Infrastructure Automation",
];

export const certifications = [
  {
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    year: "2024",
    description:
      "Advanced technical skills and experience designing distributed systems on AWS",
  },
  {
    name: "AWS Certified Security - Specialty",
    issuer: "Amazon Web Services",
    year: "2024",
    description:
      "Specialized knowledge in securing AWS workloads and architectures",
  },
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    description:
      "Foundational knowledge of AI/ML concepts and AWS AI services",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    description:
      "Foundational understanding of AWS Cloud concepts, services, and terminology",
  },
  {
    name: "Project Management Professional (PMP)",
    issuer: "Project Management Institute",
    year: "2015",
    description:
      "Industry-recognized certification for project management expertise",
  },
  {
    name: "Six Sigma Black Belt Certification",
    issuer: "John Deere",
    year: "2011",
    description:
      "Operational excellence, process improvement, and data-driven problem solving",
  },
];

export const patents = [
  {
    name: "Local Inventory Search Patent",
    company: "Finderbot Technology",
    description:
      "Co-authored patent for innovative local inventory search solution enabling real-time stock requests, retailer aggregation, and mobile-optimized consumer experience. First creation of Shopatron Startups following Lean Startup methodology.",
  },
];

export const notableWork = [
  {
    name: "AWS Metering Integration Program",
    description:
      "Pioneered first internal-only AWS service integration into external Metering and Commerce Platform, establishing framework and process for other Security services to follow.",
  },
  {
    name: "Basin Regional Expansion",
    description:
      "Developed comprehensive region build-out strategy, automation framework, and operational runbooks enabling Amazon Security data lake expansion across 30+ global regions.",
  },
];
