import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nextdigihome.com').replace(/\/$/, '');

type ProductsSearchParams = Promise<{
  page?: string;
  category?: string;
  search?: string;
}>;

export async function generateMetadata({ searchParams }: { searchParams: ProductsSearchParams }): Promise<Metadata> {
  return {
    title: 'NextDigi Store | Digital Products & Resources',
    description: 'Explore practical digital products, templates, guides and resources designed to help you work smarter, build faster and grow online.',
    alternates: {
      canonical: `${SITE_URL}/store`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function ProductsPage({ searchParams }: { searchParams: ProductsSearchParams }) {
  const params = await searchParams;
  const q = new URLSearchParams();
  if (params.category) q.set('category', params.category);
  if (params.search) q.set('search', params.search);
  if (params.page && params.page !== '1') q.set('page', params.page);
  const queryStr = q.toString();
  redirect(queryStr ? `/store?${queryStr}` : '/store');
}
