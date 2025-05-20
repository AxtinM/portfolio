import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlugAndLang, getAvailableLanguagesForPost } from "../../../lib/blog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

// Dynamic metadata for SEO
export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const { lang: searchLang } = await searchParams;

  let availableLangs = Array.from(new Set(getAvailableLanguagesForPost(slug)));
  let lang = searchLang;
  if (!lang) {
    // Server-side only: cannot use navigator, so fallback to 'en' or first available
    lang = availableLangs.includes("en") ? "en" : availableLangs[0];
  }
  const post = getPostBySlugAndLang(slug, lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${baseUrl}/blog/${slug}?lang=${lang}`;
  const alternates: Record<string, string> = {};
  availableLangs.forEach((l) => {
    alternates[l] = `${baseUrl}/blog/${slug}?lang=${l}`;
  });

  return {
    title: post?.title || "",
    description: post?.summary || "",
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: post?.title || "",
      description: post?.summary || "",
      url: canonicalUrl,
      type: "article",
      images: post?.image ? [post.image] : [],
    },
  };
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

export default async function BlogPostPage({ params, searchParams }: Props) {
  // 1. Determine preferred language
  const { slug } = await params;
  const { lang: searchLang } = await searchParams;

  let lang = searchLang;
  let availableLangs = Array.from(new Set(getAvailableLanguagesForPost(slug)));

  // If no lang param, try browser (on client), else fallback to en, else first available
  if (!lang) {
    // Server-side only: cannot use navigator, so fallback to 'en' or first available
    lang = availableLangs.includes("en") ? "en" : availableLangs[0];
  }

  const post = getPostBySlugAndLang(slug, lang);
  if (!post) return notFound();

  // Convert markdown to HTML with a simpler pipeline
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false }) // Don't sanitize to allow HTML
    .process(post.content);
  
  const contentHtml = processedContent.toString();

  // SEO: canonical and alternate for all available languages
  // (handled in generateMetadata)

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      {/* Return Button */}
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-accent text-accent-foreground font-semibold shadow-lg border border-accent/60 hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d="M12.5 15L8 10.5L12.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Return to Blog
        </Link>
      </div>
      {/* Language Switcher */}
      {availableLangs.length > 1 && (
        <div className="mb-4 flex gap-2">
          {availableLangs.map((l) => (
            <Link
              key={l}
              href={`/blog/${slug}?lang=${l}`}
              className={`px-3 py-1 rounded border ${l === lang ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              aria-label={`Switch to ${l.toUpperCase()}`}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle className="text-3xl mb-2 group transition-colors">
            {post.title}
          </CardTitle>
          <div className="text-muted-foreground mb-4">{post.summary}</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
        </CardHeader>
        <CardContent>
          <article className="prose prose-invert max-w-none">
            <div className="markdown-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </article>
        </CardContent>
      </Card>
    </main>
  );
}

