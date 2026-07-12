export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rob Frew",
    jobTitle: "Senior Technical Program Manager",
    description:
      "Senior TPM with 15+ years building platforms at scale. Managed Amazon's 9PB-daily security data lake, delivered $50M+ impact.",
    url: "https://www.robfrew.com",
    email: "rob@robfrew.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Luis Obispo",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: ["https://linkedin.com/in/frewrob"],
    knowsAbout: [
      "Technical Program Management",
      "Cloud Infrastructure",
      "AWS",
      "AI/ML Infrastructure",
      "Platform Engineering",
      "Data Pipelines",
      "Cost Optimization",
      "Release Management",
      "CI/CD",
      "Microservices",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified Solutions Architect - Professional",
        credentialCategory: "certification",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified Security - Specialty",
        credentialCategory: "certification",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified AI Practitioner",
        credentialCategory: "certification",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified Cloud Practitioner",
        credentialCategory: "certification",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Project Management Professional (PMP)",
        credentialCategory: "certification",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Six Sigma Black Belt",
        credentialCategory: "certification",
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Available for new opportunities",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rob Frew - Senior Technical Program Manager",
    url: "https://www.robfrew.com",
    description:
      "Portfolio website of Rob Frew, Senior Technical Program Manager with 15+ years experience in cloud infrastructure, AI/ML platforms, and platform engineering.",
    author: {
      "@type": "Person",
      name: "Rob Frew",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
