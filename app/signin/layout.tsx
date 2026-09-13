import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | NEXTDIGIHOME",
  alternates: {
    canonical: "/signin",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
