import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateBreadcrumbSchema, StructuredData } from '../../utils/seo';
import Link from "next/link";

const blogPosts: Record<string, { title: string; content: string; date: string; author: string }> = {
  "premier-ui-kit-trends-2025": {
    title: "UI Kit Trends to Watch in 2025",
    content: "Explore the latest UI kit design trends shaping the digital product landscape this year...",
    date: "2025-01-15",
    author: "Next Digi Home Team",
  },
  "boost-productivity-with-templates": {
    title: "How to Boost Your Productivity with Premium Templates",
    content: "Learn how the right templates can save you hours of work every week...",
    date: "2025-01-10",
    author: "Productivity Team",
  },
};

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {
      title: "Blog Post Not Found | Next Digi Home",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: `${post.title} | Next Digi Home Blog`,
    description: post.content.substring(0, 160),
    alternates: {
      canonical: `https://nextdigihome.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blog" },
    { label: post.title, path: `/blog/${slug}` },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <article className="min-h-screen bg-[#0f0f12] py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="text-[#00d4aa] hover:underline mb-8 inline-block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex gap-4 text-sm text-gray-400 mb-12">
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>by {post.author}</span>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed">{post.content}</p>
          </div>
        </div>
      </article>
    </>
  );
}
