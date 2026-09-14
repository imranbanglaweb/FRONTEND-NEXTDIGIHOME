import { redirect } from 'next/navigation';

export default async function StoreProductRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/products/${encodeURIComponent(id)}`);
}
