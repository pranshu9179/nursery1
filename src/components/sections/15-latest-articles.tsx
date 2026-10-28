"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";
import { blogPosts } from "@/data/posts";
import { formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";

export function LatestArticlesSection() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary-green-hover)] mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[var(--marigold)]" />
              <span>Plant Doctor Journal</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)]">
              Latest Botanical Care Guides
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-[var(--primary-green)] hover:underline inline-flex items-center gap-1 group"
          >
            <span>View All Guides & Articles</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col rounded-2xl bg-[var(--background)] border border-[var(--border-warm)] overflow-hidden shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300"
            >
              {/* Cover Image */}
              <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] w-full overflow-hidden block">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="primary" className="text-[10px] font-bold">
                    {post.category}
                  </Badge>
                </div>
              </Link>

              {/* Content Body */}
              <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-[var(--ink-muted)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-display font-semibold text-lg text-[var(--ink)] group-hover:text-[var(--primary-green)] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[var(--ink-muted)] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read Link */}
                <div className="pt-2 border-t border-[var(--border-warm)] flex items-center justify-between">
                  <span className="text-xs text-[var(--ink-muted)] font-medium">
                    By {post.author.name}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-[var(--primary-green)] group-hover:text-[var(--primary-green-hover)] inline-flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
