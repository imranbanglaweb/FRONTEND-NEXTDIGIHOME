import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Next Digi Home",
  alternates: {
    canonical: "/checkout",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
