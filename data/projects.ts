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
      "Served as single point of contact for all EPP-Basin integrations, managing 9PB+ daily endpoint data from 5M monitored endpoints to enable insider threat detection and IP protection.",
    challenge:
      "Amazon's Endpoint Protection Platform (EPP) team monitored 5 million corporate endpoints for security threats, insider risk, and IP protection. However, their endpoint data—file hash data, endpoint telemetry, security events—needed to flow into Basin for correlation with other security data sources and into AIP for alias-based investigations. EPP and Basin were separate organizations with different priorities, and real-time vs. batch detection latency was a critical challenge affecting threat detection speed.",
    approach:
      "Established myself as the sole point of contact for ALL EPP-Basin integrations from the start of the Basin program, working with approximately 50 EPP team members throughout the program lifecycle. Addressed the real-time vs. batch detection challenge by gathering latency data across the entire pipeline—from file creation timestamp through event timestamp, Basin delivery time, and parquet conversion time—then analyzed use cases to determine whether streaming or batch processing was optimal for each detection type. Frequently scanned EPP data in Basin and recommended relevant datasets for AIP integration, creating a feedback loop where security engineers could request new datasets for the investigation platform. Guided security engineers on building new detections from endpoint data, including tying employee aliases to file hashes to detect sensitive IP exfiltration.",
    keyDeliverables: [
      "Managed all EPP-Basin integrations as single point of contact across ~50 team members",
      "Optimized detection latency by right-sizing streaming vs. batch processing for each use case",
      "Enabled file hash-to-alias tracking for IP theft detection (Ring Camera IP, company financials)",
      "Created detection framework and feedback loop for security engineers to request new datasets",
      "Established data quality frameworks ensuring accuracy for security-critical investigations",
    ],
    impact: [
      "5M endpoints integrated",
      "9PB+ daily data volume",
      "IP theft cases prevented",
      "50 team members coordinated",
    ],
    technologies: ["AWS", "Basin", "Security Analytics", "Threat Detection", "Data Pipelines", "Streaming/Batch Processing"],
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
  {
    id: "12",
    slug: "aip-alias-investigation-platform",
    title: "AIP: Alias Investigation Platform",
    company: "Amazon",
    category: "Platform Engineering",
    shortDescription:
      "Built centralized IP investigation and insider risk platform serving 400+ weekly investigators tracking 1M+ employee aliases with EU privacy compliance.",
    challenge:
      "Amazon Security investigators needed a centralized platform to conduct insider risk and IP theft investigations across over one million employee aliases. Investigations were taking weeks because critical data—badge access, VPN logs, endpoint telemetry, network DNS data—was scattered across multiple systems. Additionally, EU privacy compliance requirements meant investigators couldn't simply access all employee data without proper controls and audit trails.",
    approach:
      "Led the end-to-end build of AIP, designing the architecture to pull badge data, VPN logs, and endpoint telemetry (including Route 53 corporate DNS data) from Basin into a unified investigation interface. Integrated multiple sensitive data sources, working with endpoint teams to unblock data access by providing context on investigative needs and facilitating data access requests following least-privilege principles. Partnered with Legal teams to ensure EU privacy compliance, implementing need-to-know access controls where investigators could only access aliases tied to open investigation tickets. Built comprehensive logging of all AIP activity with automated detections flagging any alias access not tied to an open investigation ticket.",
    keyDeliverables: [
      "Designed and built unified investigation interface pulling data from multiple Basin sources",
      "Implemented need-to-know access controls with Legal partnership for EU privacy compliance",
      "Built automated detections flagging unauthorized alias access for oversight",
      "Established 10-year data retention framework meeting Legal requirements",
      "Integrated badge data, VPN logs, endpoint telemetry, and Route 53 DNS data",
    ],
    impact: [
      "400+ weekly investigators",
      "1M+ aliases tracked",
      "25% faster investigations",
      "IP theft case supported",
    ],
    technologies: ["AWS", "Basin", "Security Analytics", "Access Controls", "Audit Systems", "Data Integration"],
    featured: true,
  },
  {
    id: "13",
    slug: "fangorn-coral-collector-deployment",
    title: "Fangorn Coral Collector Deployment",
    company: "Amazon",
    category: "Platform Engineering",
    shortDescription:
      "Deployed security log collectors on 350,000+ hosts across all AWS regions, achieving 97% security coverage with <1% CPU impact.",
    challenge:
      "Amazon Security's Fangorn program needed to deploy coral collectors on hosts across AWS to send security logs into Basin for threat detection and security analytics. However, service owners were extremely concerned about performance impact on production systems. The challenge was achieving comprehensive security coverage—97%+ of AWS traffic—without degrading host performance, particularly for AWS's largest services and highest-risk data intersection points like Route 53, S3, and DynamoDB.",
    approach:
      "Developed criteria for identifying in-scope services based on data sensitivity, risk reduction potential, and customer impact, identifying 300+ services with focus on critical data intersection points. Designed and executed comprehensive performance testing monitoring CPU usage (typically <1% utilization) and memory usage, identifying and mitigating risk of log backlog in host memory if downstream services became unavailable. Overcame major pushback from service owners by presenting extensive test data proving collectors would never affect hosts, showing multiple sources of host performance data under load. Partnered with CloudWatch team to establish monitoring and validation framework.",
    keyDeliverables: [
      "Identified and prioritized 300+ in-scope services based on risk criteria",
      "Executed comprehensive performance testing proving <1% CPU impact",
      "Negotiated deployment approval with skeptical service owners through data-driven approach",
      "Partnered with CloudWatch to establish monitoring framework",
      "Created reusable pattern for deploying security instrumentation on production systems",
    ],
    impact: [
      "350K+ hosts deployed",
      "97% AWS coverage",
      "<1% CPU impact",
      "300+ services coordinated",
    ],
    technologies: ["AWS", "Security Collectors", "Performance Testing", "CloudWatch", "Distributed Systems"],
    featured: true,
  },
  {
    id: "14",
    slug: "gdpr-compliance-program",
    title: "GDPR Compliance Program",
    company: "Amazon",
    category: "Process Improvement",
    shortDescription:
      "Partnered with Legal to provide audit data proving EU data privacy compliance, mitigating potential fines up to €20M or 4% of worldwide revenue.",
    challenge:
      "Amazon Legal teams needed to prove GDPR compliance to EU auditors but couldn't access the necessary data to demonstrate EU data privacy compliance. Without proper audit evidence, Amazon faced potential fines of up to €20M or 4% of total worldwide annual revenue—whichever was greater. The data needed for compliance evidence was distributed across Basin's data producers, and there was no established process for extracting and delivering this information to satisfy regulatory requirements.",
    approach:
      "Partnered directly with Legal to understand the specific audit requirements and what data would satisfy EU regulators. Worked across Basin's data producers to identify and extract the compliance evidence needed, coordinating data delivery in formats that met Legal's documentation requirements. Established a repeatable process for future compliance audits, ensuring Amazon could efficiently respond to ongoing regulatory inquiries without recreating the data gathering effort each time.",
    keyDeliverables: [
      "Partnered with Legal to define audit data requirements for GDPR compliance",
      "Coordinated with data producers across Basin to extract compliance evidence",
      "Delivered audit documentation meeting EU regulatory requirements",
      "Established repeatable process for future compliance audits",
    ],
    impact: [
      "GDPR compliance demonstrated",
      "€20M+ potential fines avoided",
      "Repeatable audit process",
      "Legal partnership established",
    ],
    technologies: ["Data Governance", "Compliance", "Audit Systems", "Basin"],
    featured: false,
  },
  {
    id: "15",
    slug: "kibo-enterprise-solutions-architecture",
    title: "Kibo Enterprise Solutions Architecture",
    company: "Kibo",
    category: "Product Management",
    shortDescription:
      "Served as primary technical advisor for Fortune 500 clients including Ace Hardware, conducting on-site technical discovery and designing custom integrations.",
    challenge:
      "Enterprise clients like Ace Hardware required custom integrations and implementations that went far beyond standard product configurations. Each client had unique technical environments, legacy systems, and business requirements that demanded deep technical discovery and tailored solutions. Without dedicated technical advisory support, sales cycles stalled and implementations failed to meet client expectations, resulting in extended timelines and eroded trust.",
    approach:
      "Served as the primary technical advisor for Fortune 500 clients, traveling on-site to Chicago and other client locations for technical discovery and requirements gathering. Conducted architecture and design reviews focused on understanding each client's unique business requirements, existing technical infrastructure, and integration constraints. Designed custom integrations that bridged Kibo's commerce platform with client systems, and provided both pre-sales technical support to close deals and post-sales support to ensure successful implementations. Built trusted relationships with customer technical teams, IT management, and business stakeholders, acting as customer ambassador representing their voice internally.",
    keyDeliverables: [
      "Conducted on-site technical discovery for Fortune 500 clients including Ace Hardware",
      "Designed custom integrations bridging commerce platform with client systems",
      "Provided pre-sales technical support accelerating deal closure",
      "Built trusted advisor relationships with client technical and business stakeholders",
      "Represented customer voice internally as customer ambassador",
    ],
    impact: [
      "Fortune 500 clients served",
      "On-site technical advisory",
      "Custom integrations delivered",
      "Trusted advisor relationships",
    ],
    technologies: ["Enterprise Commerce", "System Integration", "Technical Advisory", "Requirements Analysis"],
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
