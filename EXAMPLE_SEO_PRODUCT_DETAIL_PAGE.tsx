import type { Metadata } from "next";
import { generatePageMetadata, StructuredData, generateProductSchema, generateBreadcrumbSchema } from "@/app/utils/seo";

// Example: Update /app/products/[id]/page.tsx with this structure

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Server component to fetch product data for metadata
async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Dynamic metadata generation
export async function generateMetadata(
  props: ProductPageProps
): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return generatePageMetadata({
    title: `${product.name} | Buy Premium Product`,
    description: `${product.description.substring(0, 150)}... Get premium ${product.name} at Next Digi Home. High-quality, instant download.`,
    keywords: [
      product.name,
      "premium",
      "template",
      "download",
      "business",
      "digital product"
    ],
    path: `/products/${product.id}`,
    image: product.image || "https://nextdigihome.com/og-image.svg",
    type: "product",
  });
}

export default async function ProductDetailPage(props: ProductPageProps) {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <main>
        <h1>Product Not Found</h1>
        <p>Sorry, the product you're looking for doesn't exist.</p>
      </main>
    );
  }

  // Breadcrumb Schema
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: product.name, url: `/products/${product.id}` },
  ];

  // Product Schema
  const productSchema = generateProductSchema({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    currency: "USD",
    image: product.image,
    rating: product.rating,
    ratingCount: 100,
    availability: "InStock",
  });

  return (
    <main>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <ol>
          {breadcrumbs.map((crumb, index) => (
            <li key={index}>
              <a href={crumb.url}>{crumb.name}</a>
              {index < breadcrumbs.length - 1 && " / "}
            </li>
          ))}
        </ol>
      </nav>

      {/* Product Content */}
      <article>
        <h1>{product.name}</h1>
        
        {/* Product Image with Alt Text */}
        <img
          src={product.image}
          alt={`${product.name} - Premium Digital Product`}
          width={600}
          height={400}
        />

        {/* Product Description */}
        <section>
          <h2>About This Product</h2>
          <p>{product.description}</p>
        </section>

        {/* Pricing and Purchase */}
        <section>
          <h2>Product Details</h2>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}/5 stars</p>
          <button>Buy Now</button>
        </section>

        {/* Additional Details */}
        <section>
          <h2>Why Choose This Product?</h2>
          <ul>
            <li>High quality and professionally designed</li>
            <li>Instant download after purchase</li>
            <li>Full commercial license included</li>
            <li>Lifetime updates and support</li>
          </ul>
        </section>
      </article>

      {/* Structured Data */}
      <StructuredData data={productSchema} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
