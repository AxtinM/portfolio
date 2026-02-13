import Link from "next/link";
import VoteDisplay from "@/components/VoteDisplay";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/blog";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";

import type { BlogPost } from "@/lib/blog";

function dedupePostsBySlug(posts: BlogPost[], preferredLang = "en") {
  const map = new Map<string, BlogPost>();
  const rankFor = (lang: string) => {
    if (lang === preferredLang) return 0;
    if (lang === "en") return 1;
    return 2;
  };

  for (const post of posts) {
    const existing = map.get(post.slug);
    if (!existing || rankFor(post.lang) < rankFor(existing.lang)) {
      map.set(post.slug, post);
    }
  }

  return Array.from(map.values());
}

function formatDate(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return input;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = dedupePostsBySlug(getAllPosts(), "en");
  const totalTags = new Set(posts.flatMap((post) => post.tags)).size;

  return (
    <main className="home-shell blog-shell" aria-labelledby="blog-title">
      <div className="home-noise" aria-hidden="true" />
      <div className="home-vignette" aria-hidden="true" />

      <div className="home-content blog-content">
        <section className="aura-hero blog-hero">
          <div className="aura-nav">
            <span className="aura-kicker">Writing</span>
            <div className="aura-links" aria-label="Blog navigation">
              <Link href="/">Home</Link>
              <a href="#posts">Posts</a>
            </div>
          </div>

          <div className="blog-hero-copy">
            <p className="aura-label">Notes from the build loop</p>
            <h1 id="blog-title">Blog</h1>
            <p className="blog-hero-summary">
              Practical lessons from shipping AI products, backend architecture, and
              founder-led execution in production environments.
            </p>

            <dl className="aura-facts blog-facts">
              <div>
                <dt>Published posts</dt>
                <dd>{posts.length}</dd>
              </div>
              <div>
                <dt>Topics covered</dt>
                <dd>{totalTags}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Systems thinking</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="home-section" id="posts">
          <header className="section-head blog-section-head">
            <p>Latest writing</p>
            <h2>Detailed breakdowns and field notes.</h2>
          </header>

          {posts.length === 0 ? (
            <p className="blog-empty">No blog posts yet. New writing will appear here.</p>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => {
                const href =
                  post.lang === "en" ? `/blog/${post.slug}` : `/blog/${post.slug}?lang=${post.lang}`;

                return (
                  <article key={`${post.slug}-${post.lang}`} className="blog-entry">
                    <div className="blog-entry-meta">
                      <span>{formatDate(post.date)}</span>
                      <span>{formatReadingTime(calculateReadingTime(post.content))} read</span>
                    </div>

                    <h3>
                      <Link href={href} className="blog-entry-title-link">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="blog-entry-summary">{post.summary}</p>

                    <div className="blog-entry-tags" aria-label="Post tags">
                      {post.tags.map((tag) => (
                        <Badge key={tag} className="blog-tag">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="blog-entry-footer">
                      <Link href={href} className="cta-secondary blog-read-link">
                        Read article
                      </Link>
                      <div className="blog-vote-pill" aria-label="Article likes">
                        <VoteDisplay postId={post.slug} />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
