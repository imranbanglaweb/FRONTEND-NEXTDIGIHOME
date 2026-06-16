import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Next Digi Home",
  alternates: {
    canonical: "/signup",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
