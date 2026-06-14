import { Metadata } from "next";
import { generateWebsiteSchema, generateBreadcrumbSchema, StructuredData } from '../utils/seo';
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Digital Products Insights & Business Tips | Next Digi Home",
  description: "Discover expert insights on digital products, templates, and business growth strategies. Learn from industry professionals.",
  keywords: ["digital products blog", "business tips", "templates guide", "UI kits", "marketing tools"],
  alternates: {
    canonical: "https://nextdigihome.com/blog",
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
]);

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      slug: "premier-ui-kit-trends-2025",
      title: "UI Kit Trends to Watch in 2025",
      excerpt: "Explore the latest UI kit design trends shaping the digital product landscape this year.",
      date: "2025-01-15",
      author: "Next Digi Home Team",
      category: "Design",
    },
    {
      id: 2,
      slug: "boost-productivity-with-templates",
      title: "How to Boost Your Productivity with Premium Templates",
      excerpt: "Learn how the right templates can save you hours of work every week.",
      date: "2025-01-10",
      author: "Productivity Team",
      category: "Business",
    },
    {
      id: 3,
      slug: "essential-business-tools-digital-marketing",
      title: "Essential Digital Marketing Tools for 2025",
      excerpt: "A comprehensive guide to must-have tools for your digital marketing toolkit.",
      date: "2025-01-05",
      author: "Marketing Team",
      category: "Marketing",
    },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <div className="min-h-screen bg-[#0f0f12]">
        <div className="relative py-14 sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/10 via-transparent to-[#8b5cf6]/10" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text text-center">
              Blog
            </h1>
            <p className="text-xl text-[#737373] max-w-3xl mx-auto text-center mb-16">
              Insights, tips, and industry trends for digital professionals
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="glass-card rounded-2xl p-6 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-all">
                  <span className="text-xs text-[#00d4aa] font-medium uppercase tracking-wider">{post.category}</span>
                  <h2 className="text-xl font-bold text-[#fafafa] mt-3 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#737373] mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#737373]">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>by {post.author}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-[#00d4aa] font-medium hover:text-[#8b5cf6] transition-colors">
                    Read More →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
