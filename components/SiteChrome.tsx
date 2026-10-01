"use client";

import { usePathname } from "next/navigation";
import { traction } from "@/data/traction";

interface Props {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

// Wraps every page in the site header and footer — except the TrAction join
// pages. Agents reach those from their brokerage's link and have never heard
// of this site, so they get the TrAction frame alone (app/traction/layout.tsx).
export default function SiteChrome({ header, footer, children }: Props) {
  const bare = usePathname().startsWith(traction.joinPath);

  if (bare) return <main>{children}</main>;
  return (
    <>
      {header}
      <main className="pt-20">{children}</main>
      {footer}
    </>
  );
}
