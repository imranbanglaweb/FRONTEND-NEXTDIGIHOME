import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApiUrl } from "../../utils/api";
import { generateBreadcrumbSchema, StructuredData } from "../../utils/seo";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nextdigihome.com").replace(/\/$/, "");
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;

type BlogPost = {
  slug: string;
  title: string;
  content: string;
  excerpt?: string | null;
  description?: string | null;
  date?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  author?: string | null;
  image?: string | null;
  thumbnail?: string | null;
};

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const fallbackBlogPosts: Record<string, BlogPost> = {
  "premier-ui-kit-trends-2025": {
    slug: "premier-ui-kit-trends-2025",
    title: "UI Kit Trends to Watch in 2025",
    content: "Explore the latest UI kit design trends shaping the digital product landscape this year...",
    date: "2025-01-15",
    author: "Next Digi Home Team",
  },
  "boost-productivity-with-templates": {
    slug: "boost-productivity-with-templates",
    title: "How to Boost Your Productivity with Premium Templates",
    content: "Learn how the right templates can save you hours of work every week...",
    date: "2025-01-10",
    author: "Productivity Team",
  },
};

const stripHtml = (content: string): string =>
  content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (content: string, maxLength: number): string => {
  if (content.length <= maxLength) return content;
  return `${content.slice(0, maxLength - 1).trim()}...`;
};

const unwrapPost = (data: unknown): BlogPost | null => {
  if (!data || typeof data !== "object") return null;
  const root = data as { data?: unknown };
  const candidate = root.data && typeof root.data === "object" ? root.data : data;
  if (!candidate || typeof candidate !== "object") return null;

  const post = candidate as Partial<BlogPost>;
  if (!post.slug || !post.title) return null;

  return {
    slug: post.slug,
    title: post.title,
    content: post.content || post.description || post.excerpt || "",
    excerpt: post.excerpt,
    description: post.description,
    date: post.date,
    published_at: post.published_at,
    updated_at: post.updated_at,
    author: post.author,
    image: post.image,
    thumbnail: post.thumbnail,
  };
};

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(getApiUrl(`blog/${encodeURIComponent(slug)}`), {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const post = unwrapPost(await response.json());
      if (post) return post;
    }
  } catch {}

  return fallbackBlogPosts[slug] || null;
}

const getDescription = (post: BlogPost): string => {
  const rawDescription = post.description || post.excerpt || post.content;
  return truncate(stripHtml(rawDescription), 160);
};

const getPublishedDate = (post: BlogPost): string => post.published_at || post.date || new Date().toISOString();

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Next Digi Home",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const description = getDescription(post);
  const image = post.image || post.thumbnail || DEFAULT_IMAGE;

  return {
    title: `${post.title} | Next Digi Home Blog`,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      siteName: "Next Digi Home",
      publishedTime: getPublishedDate(post),
      modifiedTime: post.updated_at || getPublishedDate(post),
      authors: [post.author || "Next Digi Home Team"],
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const description = getDescription(post);
  const image = post.image || post.thumbnail || DEFAULT_IMAGE;
  const publishedDate = getPublishedDate(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blog" },
    { label: post.title, path: `/blog/${slug}` },
  ]);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    image: [image],
    datePublished: publishedDate,
    dateModified: post.updated_at || publishedDate,
    author: {
      "@type": "Organization",
      name: post.author || "Next Digi Home",
    },
    publisher: {
      "@type": "Organization",
      name: "Next Digi Home",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={articleSchema} />
      <article className="min-h-screen bg-[#0f0f12] py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="text-[#00d4aa] hover:underline mb-8 inline-block">
            Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex gap-4 text-sm text-gray-400 mb-12">
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
            <span>by {post.author || "Next Digi Home Team"}</span>
          </div>
          <div className="prose prose-invert max-w-none">
            <div
              className="text-lg text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
    </>
  );
}
