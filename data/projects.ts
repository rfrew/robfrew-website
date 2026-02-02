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
    image: "/images/projects/Basin_Data_Lake.png",
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
      "Basin was experiencing 965% year-over-year growth, putting enormous pressure on infrastructure costs. The platform's $73.5M+ annual infrastructure footprint was on track to significantly exceed OP1 budget targets, while the broader Security organization faced tightening budget constraints. Without a structured cost-reduction strategy, the team risked either curtailing platform growth or absorbing unsustainable cost overruns that would impact other security priorities.",
    approach:
      "Conducted a comprehensive financial review of Basin's entire infrastructure footprint, cataloging every cost driver across compute, storage, networking, and data transfer. Identified 15 distinct cost-reduction opportunities, each with a detailed cost-benefit analysis, implementation timeline, and risk assessment. Coordinated execution across Security, Operations, and Finance teams, establishing a weekly review cadence to track progress and surface blockers. Prioritized initiatives by impact-to-effort ratio, ensuring the highest-value savings were captured first while maintaining platform reliability and SLA commitments.",
    impact: [
      "$24.9M total annual savings",
      "$19.7M realized in FY26",
      "$9.1M below OP1 target",
      "Zero service incidents",
    ],
    technologies: ["AWS Cost Explorer", "S3 Storage Classes", "EC2 Optimization", "Financial Modeling"],
    featured: true,
    image: "/images/projects/2026_Basin_Fleet_Financial_Review.png",
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
    image: "/images/projects/AWS_Metering.png",
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
      "Basin's RAW data storage costs were growing proportionally with data ingestion volumes, representing one of the largest line items in the platform's infrastructure budget. The current S3 Standard storage class was over-provisioned for actual access patterns—analysis showed that the vast majority of RAW data was rarely accessed after initial processing, yet it was being stored at premium tier pricing. With data volumes scaling alongside the platform's 965% growth, this inefficiency was compounding rapidly and needed a solution that could reduce costs without impacting query performance or SLA commitments.",
    approach:
      "Designed a controlled pilot program across three strategically selected test regions, each representing different data volumes and access patterns. Built comprehensive monitoring dashboards to track retrieval latency, access frequency, and error rates throughout the migration. Conducted detailed access pattern analysis to validate that Glacier Instant Retrieval met the performance requirements for downstream consumers. Established clear rollback criteria and SLA validation checkpoints before recommending full production rollout across all regions.",
    impact: [
      "$2.9M annual cost avoidance",
      "$0.38/TB cost reduction",
      "99.9% SLA maintained",
      "Zero customer incidents",
    ],
    technologies: ["AWS S3", "S3 Glacier Instant Retrieval", "Storage Optimization"],
    featured: false,
    image: "/images/projects/S3_Glacier_Migration.png",
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
      "NuORDER's monolithic architecture was limiting development velocity, making releases risky, and preventing independent scaling. Every deployment required a full platform release, meaning a single bug in one module could delay updates across the entire product. The platform needed modernization to support a growing customer base without extended downtime, while also enabling the partner ecosystem integrations that enterprise clients were demanding. Engineering teams were spending disproportionate time on regression testing and deployment coordination rather than building new features.",
    approach:
      "Developed a multi-year product roadmap for platform migration, prioritizing components based on customer value, technical dependencies, and risk. Guided technical architecture decisions including API design patterns, service boundaries, and data ownership models to ensure clean separation of concerns. Sequenced the migration to deliver incremental value at each phase—extracting high-churn services first to unlock immediate development velocity gains. Implemented comprehensive CI/CD pipelines to enable independent service deployments and established API contracts that allowed the partner ecosystem to integrate reliably during the transition.",
    impact: [
      "28% ARR growth in 6 months",
      "Improved release velocity",
      "Scalable microservices architecture",
      "Partner ecosystem expansion",
    ],
    technologies: ["Microservices", "CI/CD", "APIs", "Cloud Architecture", "B2B SaaS"],
    featured: true,
    image: "/images/projects/NuORDER_Platform.png",
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
      "Kibo's payment processing platform had no fraud detection or risk management capabilities, exposing both the company and its enterprise customers to significant financial risk. Fraudulent transactions were being processed without any automated screening, resulting in chargebacks, revenue loss, and eroding client trust. The solution needed to work across Kibo's diverse customer base—from small retailers to large enterprise brands—each with different risk profiles, transaction volumes, and tolerance thresholds.",
    approach:
      "Designed the system architecture from the ground up, starting with a thorough analysis of transaction patterns and fraud vectors specific to the commerce platform. Built a layered detection approach that combined automated rules-based screening for known fraud patterns with machine-learning-informed risk scoring for more nuanced threats. Created configurable risk profiles so each client could tune detection sensitivity to their business needs, and established manual review workflows with clear escalation procedures for borderline cases. Worked closely with engineering to ensure the system could process transactions in real time without adding latency to the checkout experience.",
    impact: [
      "Reduced fraudulent transactions",
      "Enterprise-scale processing",
      "Configurable risk profiles",
      "Financial risk mitigation",
    ],
    technologies: ["Payment Processing", "Risk Management", "Real-Time Analytics", "Rules Engines"],
    featured: false,
    image: "/images/projects/Kibo_Fraud_Detection.png",
  },
  {
    id: "7",
    slug: "basin-epp-insider-threat-enablement",
    title: "Basin EPP Integration: Insider Threat Detection",
    company: "Amazon",
    category: "Platform Engineering",
    shortDescription:
      "Enabled Amazon's Endpoint Protection Platform (EPP) team to leverage Basin for insider threat detection, IP protection investigations, and automated threat response.",
    challenge:
      "Amazon's Endpoint Protection Platform (EPP) team needed access to comprehensive security data to power their insider threat detection and intellectual property protection programs. Their investigations and automated threat detection systems required reliable, high-fidelity data pipelines that could surface anomalous behavior patterns across Amazon's vast infrastructure.",
    approach:
      "Worked directly with the EPP team to understand their data requirements for insider threat investigations and automated detection workflows. Designed and delivered the data integration pipelines within Basin that provided EPP the security telemetry they needed, ensuring data quality, timeliness, and completeness for both real-time automated threat detection and retrospective investigations.",
    keyDeliverables: [
      "Delivered Basin data pipelines tailored to EPP's insider threat detection requirements",
      "Enabled automated threat detection workflows with reliable, high-fidelity security data",
      "Supported IP protection investigations with comprehensive data access and query capabilities",
      "Established data quality frameworks ensuring accuracy for security-critical investigations",
    ],
    impact: [
      "EPP insider threat detection enabled",
      "Automated threat response powered",
      "IP protection investigations supported",
      "Cross-team security data integration",
    ],
    technologies: ["AWS", "Basin", "Security Analytics", "Threat Detection", "Data Pipelines"],
    featured: true,
    image: "/images/projects/epp.png",
  },
  {
    id: "8",
    slug: "basin-regional-expansion",
    title: "Basin Regional Expansion",
    company: "Amazon",
    category: "Platform Engineering",
    shortDescription:
      "Developed comprehensive region build-out strategy, automation framework, and operational runbooks for 30+ global regions.",
    challenge:
      "Basin needed to expand across 30+ AWS regions to meet Amazon Security's global coverage requirements, but each region deployment involved complex infrastructure provisioning, service configuration, and validation steps. Manual deployments were error-prone, inconsistent, and time-intensive, creating a bottleneck that couldn't scale with the pace of AWS region launches. The team needed a repeatable, reliable process that could bring Basin online in new regions quickly while maintaining the same quality and operational standards as established regions.",
    approach:
      "Developed a comprehensive region build-out strategy that standardized every phase of deployment—from initial infrastructure provisioning through service validation and traffic onboarding. Created detailed automation frameworks that replaced manual steps with repeatable, version-controlled processes, and authored operational runbooks that enabled any on-call engineer to execute a region deployment confidently. Established pre-deployment checklists and post-deployment validation criteria to ensure consistency, and built monitoring dashboards to verify each new region met Basin's SLA requirements before accepting production traffic.",
    impact: [
      "30+ regions deployed",
      "Automated provisioning",
      "Standardized runbooks",
      "Reduced deployment time",
    ],
    technologies: ["AWS Multi-Region", "Infrastructure as Code", "Automation"],
    featured: false,
    image: "/images/projects/Basin_Regional_Expansion.png",
  },
  {
    id: "9",
    slug: "kibo-implementation-optimization",
    title: "Kibo Implementation Time Reduction",
    company: "Kibo",
    category: "Process Improvement",
    shortDescription:
      "Streamlined client implementation process, reducing enterprise commerce platform onboarding from 8 months to 4 months.",
    challenge:
      "Enterprise implementations were taking 8 months on average, far exceeding customer expectations and eroding project margins. The lengthy timelines were creating a ripple effect—sales teams struggled to close deals when prospects learned about onboarding duration, existing customers grew frustrated waiting for go-live, and professional services teams were stretched thin across overlapping engagements. Each implementation was being treated as a one-off project, with engineers rebuilding similar configurations from scratch rather than leveraging previous work.",
    approach:
      "Conducted a thorough analysis of completed implementations to identify recurring bottlenecks, common failure points, and steps that consumed disproportionate time. Standardized the implementation process into a structured methodology with clear phase gates, templated configurations, and reusable components that eliminated redundant work. Created a library of pre-built integrations and configuration templates for the most common enterprise scenarios, and established parallel workstreams so that independent tasks no longer blocked each other sequentially. Introduced progress tracking and early warning metrics to surface delays before they compounded.",
    impact: [
      "50% faster implementations",
      "120% margin improvement",
      "Improved customer satisfaction",
    ],
    technologies: ["Process Optimization", "Project Management", "Enterprise SaaS"],
    featured: false,
    image: "/images/projects/Kibo_Implementation.png",
  },
  {
    id: "10",
    slug: "john-deere-manufacturing-overhead",
    title: "John Deere Manufacturing Overhead Reduction",
    company: "John Deere",
    category: "Process Improvement",
    shortDescription:
      "Led operational efficiency initiatives reducing manufacturing overhead from $12.3M to $9.1M annually.",
    challenge:
      "Manufacturing overhead costs of $12.3M annually were significantly impacting profitability and putting pressure on the division's financial targets. The overhead structure had grown organically over years without systematic review, resulting in redundant processes, underutilized resources, and inefficient workflows. Any cost reduction initiative needed to preserve John Deere's rigorous quality standards and maintain production output—cutting corners was not an option in an environment where product reliability directly impacts customer safety and brand reputation.",
    approach:
      "Applied Six Sigma methodology to systematically map every overhead cost driver across the manufacturing operation, identifying root causes of waste and inefficiency rather than just symptoms. Led cross-functional teams through DMAIC (Define, Measure, Analyze, Improve, Control) cycles to develop data-driven solutions for each high-impact area. Implemented Lean manufacturing principles to streamline workflows, eliminate non-value-added steps, and optimize resource allocation. Established control mechanisms and ongoing measurement systems to ensure improvements were sustainable and didn't regress over time.",
    impact: [
      "26% reduction ($3.2M savings)",
      "Maintained quality standards",
      "Sustainable improvements",
    ],
    technologies: ["Six Sigma", "Lean Manufacturing", "Process Optimization"],
    featured: false,
    image: "/images/projects/John_Deere_Manufacturing.png",
  },
  {
    id: "11",
    slug: "local-inventory-search-patent",
    title: "Local Inventory Search Patent",
    company: "Shopatron",
    category: "Product Management",
    shortDescription:
      "Co-authored patent for innovative local inventory search solution enabling real-time stock requests and retailer aggregation.",
    challenge:
      "Consumers increasingly wanted to find products available at local retailers in real-time, but no solution existed to aggregate inventory across distributed retail networks. Retailers had inventory data siloed in individual point-of-sale systems with no standardized way to expose stock levels to consumers. The technical challenge was building a system that could query thousands of independent retail locations in real time, aggregate the results, and present them in a consumer-friendly format—all while handling the inherent inconsistencies and latency of disparate inventory systems.",
    approach:
      "Designed and built the solution using Lean Startup methodology, starting with rapid prototyping and iterative testing to validate the concept with real consumers and retailers. Created a mobile-optimized consumer experience that made local inventory search intuitive and fast, backed by a real-time aggregation engine that normalized inventory data from multiple retailer systems. Developed the API architecture to handle concurrent stock requests across distributed retail networks while maintaining response times acceptable for a consumer-facing product. The innovation was novel enough to be awarded a patent for the approach to real-time local inventory aggregation.",
    impact: [
      "Patent awarded",
      "First Lean Startup creation",
      "Real-time inventory aggregation",
      "Mobile-optimized experience",
    ],
    technologies: ["Mobile Development", "Real-Time APIs", "Inventory Systems"],
    featured: false,
    image: "/images/projects/Local_Inventory_Patent.png",
  },
];

export const companies: Company[] = ["Amazon", "NuORDER", "Kibo", "John Deere", "Shopatron"];

export const categories: ProjectCategory[] = [
  "Platform Engineering",
  "Cost Optimization",
  "Product Management",
  "Process Improvement",
];
