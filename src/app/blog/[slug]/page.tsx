import * as React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, ChevronRight, ArrowLeft, Share2, Sparkles, CheckCircle2 } from "lucide-react";
import { blogPosts } from "@/data/posts";
import { getBlogPostBySlug } from "@/services/blog-service";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site.config";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | " + siteConfig.name,
    };
  }

  return {
    title: `${post.title} | ${siteConfig.name} Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recommendedPlants = products.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 3);

  // Article JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [post.coverImage],
    datePublished: post.publishedAt,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon.ico`,
      },
    },
  };

  return (
    <article className="min-h-screen bg-[var(--background)] py-10 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--ink-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--primary-green)] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-[var(--primary-green)] transition-colors">
            Journal
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-[var(--ink)] truncate max-w-[240px]">
            {post.title}
          </span>
        </div>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <Badge variant="primary" className="text-xs font-bold px-3 py-1">
              {post.category}
            </Badge>
            <div className="flex items-center gap-2 text-xs text-[var(--ink-muted)]">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
              <span>•</span>
              <Calendar className="h-3.5 w-3.5" />
              <span>{post.publishedAt}</span>
            </div>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-[var(--ink-muted)] leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Byline Card */}
          <div className="flex items-center justify-between pt-4 pb-2 border-y border-[var(--border-warm)]">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border border-[var(--border-warm)]">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--ink)]">{post.author.name}</p>
                <p className="text-[11px] text-[var(--ink-muted)]">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[var(--ink-muted)]">
              <Sparkles className="h-4 w-4 text-[var(--marigold)]" />
              <span className="font-semibold">Nursery Verified</span>
            </div>
          </div>
        </div>

        {/* Cover Image Frame */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[var(--surface-muted)] border border-[var(--border-warm)] mb-10 shadow-sm">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        {/* Editorial Body Content */}
        <div className="prose prose-stone max-w-none space-y-6 text-sm sm:text-base text-[var(--ink)] leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="text-base text-[var(--ink)]/90 leading-relaxed font-sans">
              {paragraph}
            </p>
          ))}

          {/* Botanist Pro-Tip Callout Box */}
          <div className="my-8 p-6 rounded-3xl bg-[var(--sage-tint)] border border-[var(--primary-green)]/30 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--primary-green-hover)]">
              <CheckCircle2 className="h-5 w-5" />
              <span>Lead Horticulturist&apos;s Golden Rule</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
              When in doubt regarding soil moisture, always insert a wooden skewer or your finger 2 inches into the soil. Damp soil cling indicates roots have adequate moisture; dry, powdery withdrawal signals it&apos;s time to hydrate.
            </p>
          </div>

          <p className="text-base text-[var(--ink)]/90 leading-relaxed font-sans">
            Remember that every urban microclimate is unique. Ambient room temperature, air conditioner airflow, and light angles change across seasons. Observe your specimen attentively during the first two weeks as it acclimates to its new sanctuary.
          </p>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap pt-8 pb-8 mt-8 border-t border-[var(--border-warm)]">
          <span className="text-xs font-semibold text-[var(--ink-muted)] mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-warm)] text-[var(--ink)]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Featured Plants for this Guide */}
        <div className="mt-12 pt-12 border-t border-[var(--border-warm)]">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary-green)]">
                Bring This Guide to Life
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--ink)] mt-1">
                Featured Specimens Mentioned
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold text-[var(--primary-green)] hover:underline"
            >
              Shop All Plants &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommendedPlants.map((plant) => (
              <ProductCard key={plant.id} product={plant} />
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--primary-green)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Care Articles
          </Link>
        </div>
      </div>
    </article>
  );
}
