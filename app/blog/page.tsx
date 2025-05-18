import Link from "next/link";
import { getAllPosts } from "../../lib/blog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RetroGrid } from "@/components/ui/retro-grid";

import type { BlogPost } from "../../lib/blog";

function dedupePostsBySlug(posts: BlogPost[], preferredLang = "en") {
  const map = new Map<string, BlogPost>();
  for (const post of posts) {
    if (!map.has(post.slug)) {
      map.set(post.slug, post);
    }
    // Prefer preferredLang, then en, then first available
    if (post.lang === preferredLang) {
      map.set(post.slug, post);
    } else if (post.lang === "en" && !Array.from(map.values()).some(p => p.slug === post.slug && p.lang === preferredLang)) {
      map.set(post.slug, post);
    }
  }
  return Array.from(map.values());
}

export default function BlogPage() {
  const allPosts = getAllPosts();
  // Try to get browser language if on client, otherwise default to en
  let preferredLang = "en";
  if (typeof window !== "undefined" && window.navigator.language) {
    preferredLang = window.navigator.language.slice(0, 2);
  }
  const posts = dedupePostsBySlug(allPosts, preferredLang);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-x-hidden">
      {/* RetroGrid Background */}
      <RetroGrid className="z-0" />

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Home Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-accent text-accent-foreground font-semibold shadow-lg border border-accent/60 hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M10 3L3 10H6V17H14V10H17L10 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Home
          </Link>
        </div>
        <section className="mb-12">
          <Card className="bg-background/90 border border-accent shadow-2xl backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-bold mb-2 text-accent-foreground">Blog</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Thoughts on tech, history, philosophy, and the journey of building in a fast-moving world. Here you'll find insights, lessons, and reflections from my work and interests.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
        <section>
          <div className="grid gap-8 md:grid-cols-2">
            {posts.length === 0 ? (
              <div className="col-span-2 text-center text-muted-foreground text-lg">
                No blog posts yet. Stay tuned for upcoming articles!
              </div>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block focus:outline-none"
                >
                  <Card className="transition-all hover:scale-[1.02] hover:shadow-lg bg-card border border-border">
                    <CardHeader>
                      <CardTitle
                        className="text-2xl group-hover:text-primary group-focus-within:text-primary transition-colors"
                        tabIndex={0}
                      >
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">{post.summary}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags.map((tag: string) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}