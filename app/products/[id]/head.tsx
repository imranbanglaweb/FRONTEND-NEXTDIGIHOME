import { Metadata } from 'next';
import { generateProductSchema } from '../../utils/seo';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nextdigihome.com";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_price: number | null;
  featured: boolean;
  category: string;
  stock: number;
  images: string[] | null;
  thumbnail: string | null;
  digital: boolean;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In a real app, you would fetch the product data here
  return {
    title: "Product | Next Digi Home",
    description: "Premium digital products for modern businesses.",
    alternates: {
      canonical: `${BASE_URL}/products/${params.id}`,
    },
  };
}

export default function ProductHead() {
  return null;
}