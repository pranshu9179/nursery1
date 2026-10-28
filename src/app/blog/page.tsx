"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Calendar, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { blogPosts } from "@/data/posts";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", "Care Guide", "Styling & Living", "Seasonal Guide"];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === selectedCategory);

  const featuredPost = filteredPosts[0] || blogPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-[var(--background)] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--primary-green)]/10 text-[var(--primary-green-hover)] text-xs font-bold mb-3 border border-[var(--primary-green)]/20">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Botanical Care Journal</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] tracking-tight">
            Nurture Your Greenery with Science
          </h1>
          <p className="text-sm sm:text-base text-[var(--ink-muted)] mt-3">
            Horticultural wisdom, repotting rituals, and biophilic design ideas penned by our nursery botanists.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`h-9 px-5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-[var(--primary-green)] text-white shadow-sm"
                  : "bg-[var(--surface)] text-[var(--ink-muted)] border border-[var(--border-warm)] hover:border-[var(--primary-green)] hover:text-[var(--ink)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Editorial Post */}
        {featuredPost && (
          <div className="mb-14">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] overflow-hidden shadow-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Image */}
                <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-7 overflow-hidden bg-[var(--surface-muted)]">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary" className="text-xs font-bold px-3 py-1">
                      Featured Guide
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-10 lg:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-[var(--ink-muted)]">
                      <span className="font-bold text-[var(--primary-green)] uppercase tracking-wider">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--ink)] group-hover:text-[var(--primary-green)] transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  {/* Author & CTA */}
                  <div className="pt-4 border-t border-[var(--border-warm)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border border-[var(--border-warm)]">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[var(--ink)]">
                          {featuredPost.author.name}
                        </p>
                        <p className="text-[10px] text-[var(--ink-muted)]">
                          {featuredPost.author.role}
                        </p>
                      </div>
                    </div>

                    <span className="h-9 w-9 rounded-full bg-[var(--primary-green)]/10 text-[var(--primary-green)] flex items-center justify-center group-hover:bg-[var(--primary-green)] group-hover:text-white transition-all">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* 3-Column Remaining Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {remainingPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-3xl bg-[var(--surface)] border border-[var(--border-warm)] overflow-hidden shadow-xs hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface-muted)]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="sage" className="text-[10px] font-bold">
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-[var(--ink-muted)]">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <Calendar className="h-3 w-3" />
                    <span>{post.publishedAt}</span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-[var(--ink)] group-hover:text-[var(--primary-green)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[var(--ink-muted)] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author footer */}
                <div className="pt-3 border-t border-[var(--border-warm)]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative h-7 w-7 rounded-full overflow-hidden border border-[var(--border-warm)]">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                        sizes="28px"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[var(--ink)]">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-[var(--primary-green)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
