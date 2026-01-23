export type ProjectCategory =
  | "Platform Engineering"
  | "Cost Optimization"
  | "Product Management"
  | "Process Improvement";

export type Company = "Amazon" | "NuORDER" | "Kibo" | "John Deere" | "Shopatron";

export interface Project {
  id: string;
  slug: string;
  title: string;
  company: Company;
  category: ProjectCategory;
  shortDescription: string;
  challenge: string;
  approach: string;
  keyDeliverables?: string[];
  impact: string[];
  technologies: string[];
  featured: boolean;
  image?: string; // Path to project image in /public/images/projects/
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "basin-amazon-security-data-lake",
    title: "Basin: Amazon Security's Data Lake",
    company: "Amazon",
    category: "Platform Engineering",
    shortDescription:
      "Platform processing 9PB daily from 350,000+ sources supporting ML workloads and security analytics across AWS.",
    challenge:
      "Amazon Security needed an authoritative data lake capable of ingesting massive volumes of security data from hundreds of thousands of sources while supporting ML-based threat detection, maintaining sub-second query performance, and scaling to meet exponential growth—all while optimizing costs and maintaining 99.9% availability.",
    approach:
      "Led technical program management for Basin, coordinating across 40+ microservices spanning Security, Operations, Finance, and Engineering teams. Focused on three parallel tracks: architecting scalable infrastructure capable of handling 965% year-over-year growth, implementing cost optimization initiatives that delivered $24.9M in annual savings, and establishing release management frameworks serving 2,000+ internal service teams.",
    keyDeliverables: [
      "Managed data platform supporting anomaly detection models and ML-based threat detection",
      "Designed data validation frameworks ensuring quality for downstream ML pipelines",
      "Led 15 cost-reduction initiatives delivering $24.9M in annual savings",
      "Architected release readiness frameworks and CI/CD standards for 2,000+ teams",
    ],
    impact: [
      "$24.9M annual savings",
      "965% YoY growth managed",
      "99.9% SLA maintained",
      "30+ AWS regions",
      "2,000+ teams supported",
    ],
    technologies: ["AWS", "S3", "Lambda", "SageMaker", "CloudWatch", "CI/CD"],
    featured: true,
  },
  {
    id: "2",
    slug: "basin-fleet-financial-review",
    title: "2026 Basin Fleet Financial Review",
    company: "Amazon",
    category: "Cost Optimization",
    shortDescription:
      "Led identification and execution of 15 infrastructure cost-reduction initiatives delivering $24.9M in annual savings.",
    challenge:
      "Basin was experiencing 965% year-over-year growth, putting enormous pressure on infrastructure costs. Without intervention, the platform would significantly exceed OP1 budget targets while the Security organization faced budget constraints.",
    approach:
      "Conducted a comprehensive financial review of Basin's $73.5M+ infrastructure footprint, identifying 15 distinct cost-reduction opportunities. Coordinated execution across Security, Operations, and Finance with detailed cost-benefit analysis for each initiative.",
    impact: [
      "$24.9M total annual savings",
      "$19.7M realized in FY26",
      "$9.1M below OP1 target",
      "Zero service incidents",
    ],
    technologies: ["AWS Cost Explorer", "S3 Storage Classes", "EC2 Optimization", "Financial Modeling"],
    featured: true,
  },
  {
    id: "3",
    slug: "aws-metering-integration",
    title: "AWS Metering Integration",
    company: "Amazon",
    category: "Cost Optimization",
    shortDescription:
      "Pioneered Basin's integration into AWS Metering as the first internal-only security service, establishing cost allocation blueprint.",
    challenge:
      "AWS Metering had never onboarded an internal-only service—all previous integrations were external-facing customer services. Basin needed usage-based cost allocation to accurately attribute infrastructure spend to consuming teams, but there was no established process or precedent.",
    approach:
      "Designed the usage-based metering architecture from scratch, working across Security, Finance, AWS Billing, and Metering teams. Built consensus among stakeholders, created technical specifications for 40+ microservices integration, and established processes as a blueprint for future internal service integrations.",
    impact: [
      "$12.7M+ cost attribution enabled",
      "First internal-only security service integrated",
      "Blueprint for other services",
      "Cross-org coordination model established",
    ],
    technologies: ["AWS Metering", "Metering Lite", "Cost Allocation", "Microservices"],
    featured: true,
  },
  {
    id: "4",
    slug: "s3-glacier-migration",
    title: "S3 Glacier Migration Program",
    company: "Amazon",
    category: "Cost Optimization",
    shortDescription:
      "Designed and executed pilot program migrating Basin's RAW storage to Glacier IR, delivering $2.9M annual cost avoidance.",
    challenge:
      "Basin's RAW data storage costs were growing proportionally with data ingestion volumes. The current S3 Standard storage class was over-provisioned for actual access patterns.",
    approach:
      "Designed a controlled pilot across three test regions with comprehensive monitoring to validate cost savings and performance impact. Included detailed metrics collection, access pattern analysis, and SLA validation before recommending full rollout.",
    impact: [
      "$2.9M annual cost avoidance",
      "$0.38/TB cost reduction",
      "99.9% SLA maintained",
      "Zero customer incidents",
    ],
    technologies: ["AWS S3", "S3 Glacier Instant Retrieval", "Storage Optimization"],
    featured: false,
  },
  {
    id: "5",
    slug: "nuorder-platform-modernization",
    title: "NuORDER Platform Modernization",
    company: "NuORDER",
    category: "Platform Engineering",
    shortDescription:
      "Owned platform modernization strategy from monolithic architecture to microservices, driving CI/CD implementation and API development.",
    challenge:
      "NuORDER's monolithic architecture was limiting development velocity, making releases risky, and preventing independent scaling. The platform needed modernization to support growing customer base without extended downtime.",
    approach:
      "Developed a multi-year product roadmap for platform migration, prioritizing components based on customer value and technical dependencies. Guided technical architecture decisions, API design patterns, and migration sequencing with focus on incremental delivery.",
    impact: [
      "28% ARR growth in 6 months",
      "Improved release velocity",
      "Scalable microservices architecture",
      "Partner ecosystem expansion",
    ],
    technologies: ["Microservices", "CI/CD", "APIs", "Cloud Architecture", "B2B SaaS"],
    featured: true,
  },
  {
    id: "6",
    slug: "kibo-fraud-detection",
    title: "Kibo Fraud Detection & Risk Management",
    company: "Kibo",
    category: "Product Management",
    shortDescription:
      "Designed and implemented fraud detection and risk management system from scratch for enterprise commerce platform.",
    challenge:
      "Kibo's payment processing platform had no fraud detection or risk management capabilities, exposing both the company and customers to financial risk.",
    approach:
      "Designed system architecture from ground up, balancing automated detection rules with manual review workflows. Established risk scoring algorithms, threshold configurations, and escalation procedures scalable across diverse customer base.",
    impact: [
      "Reduced fraudulent transactions",
      "Enterprise-scale processing",
      "Configurable risk profiles",
      "Financial risk mitigation",
    ],
    technologies: ["Payment Processing", "Risk Management", "Real-Time Analytics", "Rules Engines"],
    featured: false,
  },
  {
    id: "7",
    slug: "basin-regional-expansion",
    title: "Basin Regional Expansion",
    company: "Amazon",
    category: "Platform Engineering",
    shortDescription:
      "Developed comprehensive region build-out strategy, automation framework, and operational runbooks for 30+ global regions.",
    challenge:
      "Basin needed to expand across 30+ AWS regions while maintaining consistency, reliability, and operational efficiency.",
    approach:
      "Created standardized automation framework and operational runbooks enabling repeatable, reliable region deployments with minimal manual intervention.",
    impact: [
      "30+ regions deployed",
      "Automated provisioning",
      "Standardized runbooks",
      "Reduced deployment time",
    ],
    technologies: ["AWS Multi-Region", "Infrastructure as Code", "Automation"],
    featured: false,
  },
  {
    id: "8",
    slug: "kibo-implementation-optimization",
    title: "Kibo Implementation Time Reduction",
    company: "Kibo",
    category: "Process Improvement",
    shortDescription:
      "Streamlined client implementation process, reducing enterprise commerce platform onboarding from 8 months to 4 months.",
    challenge:
      "Enterprise implementations were taking 8 months on average, impacting customer satisfaction and project margins.",
    approach:
      "Analyzed implementation bottlenecks, standardized processes, and created reusable components to accelerate deployments.",
    impact: [
      "50% faster implementations",
      "120% margin improvement",
      "Improved customer satisfaction",
    ],
    technologies: ["Process Optimization", "Project Management", "Enterprise SaaS"],
    featured: false,
  },
  {
    id: "9",
    slug: "john-deere-manufacturing-overhead",
    title: "John Deere Manufacturing Overhead Reduction",
    company: "John Deere",
    category: "Process Improvement",
    shortDescription:
      "Led operational efficiency initiatives reducing manufacturing overhead from $12.3M to $9.1M annually.",
    challenge:
      "Manufacturing overhead costs were impacting profitability and needed systematic reduction without affecting quality or output.",
    approach:
      "Applied Six Sigma methodology to identify inefficiencies, optimize workflows, and implement sustainable cost reduction measures.",
    impact: [
      "26% reduction ($3.2M savings)",
      "Maintained quality standards",
      "Sustainable improvements",
    ],
    technologies: ["Six Sigma", "Lean Manufacturing", "Process Optimization"],
    featured: false,
  },
  {
    id: "10",
    slug: "local-inventory-search-patent",
    title: "Local Inventory Search Patent",
    company: "Shopatron",
    category: "Product Management",
    shortDescription:
      "Co-authored patent for innovative local inventory search solution enabling real-time stock requests and retailer aggregation.",
    challenge:
      "Consumers needed a way to find products available at local retailers in real-time, but no solution existed to aggregate inventory across distributed retail networks.",
    approach:
      "Designed and built innovative solution using Lean Startup methodology, creating mobile-optimized consumer experience with real-time inventory aggregation.",
    impact: [
      "Patent awarded",
      "First Lean Startup creation",
      "Real-time inventory aggregation",
      "Mobile-optimized experience",
    ],
    technologies: ["Mobile Development", "Real-Time APIs", "Inventory Systems"],
    featured: false,
  },
];

export const companies: Company[] = ["Amazon", "NuORDER", "Kibo", "John Deere", "Shopatron"];

export const categories: ProjectCategory[] = [
  "Platform Engineering",
  "Cost Optimization",
  "Product Management",
  "Process Improvement",
];
