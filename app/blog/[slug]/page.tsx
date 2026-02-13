import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlugAndLang, getAvailableLanguagesForPost } from "../../../lib/blog";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { calculateReadingTime, formatReadingTime } from "../../../lib/readingTime";
import ThumbsUpButton from "../../../components/ThumbsUpButton";
import ClientButtonWrapper from "../../../components/ClientButtonWrapper";

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang: searchLang } = await searchParams;

  const availableLangs = Array.from(new Set(getAvailableLanguagesForPost(slug)));
  const lang =
    searchLang && availableLangs.includes(searchLang)
      ? searchLang
      : availableLangs.includes("en")
        ? "en"
        : availableLangs[0];
  const post = lang ? getPostBySlugAndLang(slug, lang) : null;

  if (!post) {
    return {
      title: "Post not found",
      description: "The requested article could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cortexkernel.com";
  const canonicalPath = lang === "en" ? `/blog/${slug}` : `/blog/${slug}?lang=${lang}`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  const alternates: Record<string, string> = {};
  for (const language of availableLangs) {
    const path = language === "en" ? `/blog/${slug}` : `/blog/${slug}?lang=${language}`;
    alternates[language] = `${baseUrl}${path}`;
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: canonicalUrl,
      type: "article",
      images: post.image ? [post.image] : [],
    },
  };
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

export default async function BlogPostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { lang: searchLang } = await searchParams;
  const availableLangs = Array.from(new Set(getAvailableLanguagesForPost(slug)));
  const lang =
    searchLang && availableLangs.includes(searchLang)
      ? searchLang
      : availableLangs.includes("en")
        ? "en"
        : availableLangs[0];

  const post = lang ? getPostBySlugAndLang(slug, lang) : null;
  if (!post) return notFound();

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(post.content);
  const contentHtml = processedContent.toString();
  const publishDate = new Date(post.date);
  const publishLabel = Number.isNaN(publishDate.getTime())
    ? post.date
    : publishDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  return (
    <main className="home-shell blog-shell" aria-labelledby="post-title">
      <div className="home-noise" aria-hidden="true" />
      <div className="home-vignette" aria-hidden="true" />

      <div className="home-content blog-content">
        <section className="aura-hero blog-post-hero">
          <div className="aura-nav">
            <span className="aura-kicker">Article</span>
            <div className="aura-links" aria-label="Article navigation">
              <Link href="/">Home</Link>
              <Link href="/blog">All posts</Link>
            </div>
          </div>

          <div className="blog-post-header">
            <p className="aura-label">Published insight</p>
            <h1 id="post-title">{post.title}</h1>
            <p className="blog-post-summary">{post.summary}</p>
            <div className="blog-post-meta">
              <span>{publishLabel}</span>
              <span>{formatReadingTime(calculateReadingTime(post.content))} read</span>
              <span>{post.lang.toUpperCase()}</span>
            </div>

            <div className="blog-entry-tags" aria-label="Post tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {availableLangs.length > 1 && (
            <div className="blog-lang-switcher" aria-label="Language switcher">
              {availableLangs.map((language) => (
                <Link
                  key={language}
                  href={language === "en" ? `/blog/${slug}` : `/blog/${slug}?lang=${language}`}
                  className={`blog-lang-chip${language === post.lang ? " active" : ""}`}
                  aria-label={`Switch to ${language.toUpperCase()}`}
                >
                  {language.toUpperCase()}
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="home-section blog-post-body">
          <article className="markdown-content blog-prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </section>

        <section className="home-section blog-feedback">
          <div className="blog-feedback-row">
            <div>
              <p>Did this article help?</p>
              <span>Feedback helps prioritize what to publish next.</span>
            </div>
            <ClientButtonWrapper>
              <ThumbsUpButton postId={slug} large />
            </ClientButtonWrapper>
          </div>
        </section>
      </div>
    </main>
  );
}
