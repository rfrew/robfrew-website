import { Metadata } from "next";

// The work index page is a client component (filter state), so its metadata
// lives here in the segment layout instead.
export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Deep dives into major programs Rob Frew has led — from scaling Amazon's 9PB-daily security data lake to pioneering usage-based cost allocation frameworks.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
