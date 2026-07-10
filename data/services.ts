export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  /** Price in cents (USD). Stripe works in the smallest currency unit. */
  amount: number;
  features: string[];
  /** Optional note shown under the card, e.g. "billed once" */
  note?: string;
  /** Set for recurring packages — Checkout runs in subscription mode. */
  interval?: "month" | "year";
}

// Single source of truth for what clients can pay for. Edit prices here and the
// /pay page + Checkout updates automatically. Amounts are in cents.
export const servicePackages: ServicePackage[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    description: "A single, polished marketing page built to convert.",
    amount: 150000, // $1,500.00
    features: [
      "Custom responsive design",
      "Copy + layout guidance",
      "Contact form integration",
      "Deployed and live",
    ],
    note: "One-time payment",
  },
  {
    id: "full-website",
    name: "Full Website",
    description: "A complete multi-page site, designed and shipped end to end.",
    amount: 400000, // $4,000.00
    features: [
      "Up to 6 custom pages",
      "Mobile-first responsive build",
      "SEO + analytics setup",
      "Two rounds of revisions",
    ],
    note: "One-time payment",
  },
  {
    id: "maintenance",
    name: "Monthly Maintenance",
    description: "Ongoing updates, fixes, and small improvements every month.",
    amount: 20000, // $200.00
    features: [
      "Content + copy updates",
      "Bug fixes and tweaks",
      "Dependency + security updates",
      "Priority email support",
    ],
    note: "Billed monthly — cancel anytime",
    interval: "month",
  },
];

export function getServicePackage(id: string): ServicePackage | undefined {
  return servicePackages.find((pkg) => pkg.id === id);
}

/** Format cents as a USD price string, e.g. 150000 -> "$1,500". */
export function formatPrice(amountInCents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amountInCents % 100 === 0 ? 0 : 2,
  }).format(amountInCents / 100);
}
