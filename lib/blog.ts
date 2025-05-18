import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  lang: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  image?: string;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const match = file.match(/^(.*)\.([a-z]{2})\.md$/);
      let slug = file.replace(/\.md$/, "");
      let lang = "en";
      if (match) {
        slug = match[1];
        lang = match[2];
      }
      return {
        slug,
        lang,
        title: data.title || "",
        date: data.date || "",
        tags: data.tags || [],
        summary: data.summary || "",
        image: data.image || "",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAvailableLanguagesForPost(slug: string): string[] {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.startsWith(`${slug}.`) && file.endsWith(".md"))
    .map((file) => {
      const match = file.match(/^(.*)\.([a-z]{2})\.md$/);
      return match ? match[2] : "en";
    });
}

export function getPostBySlugAndLang(slug: string, lang: string): BlogPost | null {
  // Try exact match first
  const filePath = path.join(BLOG_DIR, `${slug}.${lang}.md`);
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      lang,
      title: data.title || "",
      date: data.date || "",
      tags: data.tags || [],
      summary: data.summary || "",
      image: data.image || "",
      content,
    };
  }
  // Fallback to English if available
  const enPath = path.join(BLOG_DIR, `${slug}.en.md`);
  if (fs.existsSync(enPath)) {
    const fileContents = fs.readFileSync(enPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      lang: "en",
      title: data.title || "",
      date: data.date || "",
      tags: data.tags || [],
      summary: data.summary || "",
      image: data.image || "",
      content,
    };
  }
  // Fallback to first available language
  const files = fs.readdirSync(BLOG_DIR);
  const match = files.find((file) => file.startsWith(`${slug}.`) && file.endsWith(".md"));
  if (match) {
    const matchLang = match.match(/^(.*)\.([a-z]{2})\.md$/)?.[2] || "en";
    const fileContents = fs.readFileSync(path.join(BLOG_DIR, match), "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      lang: matchLang,
      title: data.title || "",
      date: data.date || "",
      tags: data.tags || [],
      summary: data.summary || "",
      image: data.image || "",
      content,
    };
  }
  return null;
}