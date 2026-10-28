import { blogPosts } from "@/data/posts";
import { BlogPost } from "@/types/blog";

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  if (limit) return blogPosts.slice(0, limit);
  return blogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = blogPosts.find((p) => p.slug === slug);
  return post || null;
}
