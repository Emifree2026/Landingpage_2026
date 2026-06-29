import React, { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';

import { getPostBySlug, getAllPosts } from '../data/blogPosts.jsx';

const SITE_URL = 'https://emifree.com';

export default function BlogPost() {
  const { slug } = useParams();
  const post = useMemo(() => getPostBySlug(slug), [slug]);

  // Compute the "read next" suggestion once — pick the most recent other post.
  const nextPost = useMemo(() => {
    if (!post) return null;
    return getAllPosts().find((p) => p.id !== post.id) ?? null;
  }, [post]);

  useEffect(() => {
    if (!post) return;

    // Reset scroll to top so a deep link lands at the article header,
    // not wherever the user was on the previous page.
    window.scrollTo({ top: 0, behavior: 'auto' });

    const articleUrl = `${SITE_URL}/blog/${post.slug}`;
    const ogTitle = `${post.title} | Emifree Engineering Blog`;
    const ogDesc = post.excerpt;

    document.title = ogTitle;

    const setMeta = (selector, attr, attrValue, content) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (attr === 'name') tag.name = attrValue;
        else tag.setAttribute('property', attrValue);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setMeta('meta[name="description"]', 'name', 'description', ogDesc);
    setMeta('meta[property="og:title"]', 'property', 'og:title', ogTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', ogDesc);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'article');
    setMeta('meta[property="og:url"]', 'property', 'og:url', articleUrl);
    setMeta('meta[property="article:published_time"]', 'property', 'article:published_time', post.date);
    setMeta('meta[property="article:author"]', 'property', 'article:author', post.author);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', ogTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', ogDesc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = articleUrl;

    // Per-post BlogPosting JSON-LD — what AI Overviews and Perplexity scrape
    // to cite this article. Author entity, publisher, datePublished are
    // the structured fields Google weights for content quality scoring.
    const oldScript = document.getElementById('emifree-blogpost-schema');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'emifree-blogpost-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
        worksFor: {
          '@type': 'Organization',
          name: 'Emifree GmbH',
        },
      },
      publisher: {
        '@type': 'Organization',
        name: 'Emifree GmbH',
        url: SITE_URL,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      url: articleUrl,
      keywords: post.category,
    });
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('emifree-blogpost-schema');
      if (s) s.remove();
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header band */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back to home — top-of-page exit for readers who landed deep. */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to home
          </Link>

          {/* Breadcrumb — semantic nav, ARIA-labelled, links are real <Link>s */}
          <nav aria-label="breadcrumb" className="mb-6 text-sm text-zinc-500">
            <Link to="/" className="hover:text-blue-700">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link to="/blog" className="hover:text-blue-700">Blog</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-zinc-700">{post.category}</span>
          </nav>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {post.title}
          </motion.h1>

          {/* Byline row */}
          <motion.div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4" aria-hidden="true" />
              <span>
                <span className="font-semibold text-zinc-900">{post.author}</span>
                <span className="text-zinc-500"> · {post.authorRole}</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={post.date}>{post.formattedDate}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {post.readTime}
            </span>
            <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">
              {post.category}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Article body — semantic <article> with prose-like styling */}
      <motion.article
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <meta itemProp="datePublished" content={post.date} />
        <meta itemProp="author" content={post.author} />
        <link itemProp="url" href={`${SITE_URL}/blog/${post.slug}`} />

        <div className="text-zinc-700">{post.body}</div>

        {/* Article footer */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to all articles
            </Link>
          </div>

          {nextPost && (
            <Link
              to={`/blog/${nextPost.slug}`}
              className="group block bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
                Read next
              </p>
              <p className="text-lg font-bold text-zinc-900 group-hover:text-blue-800 leading-snug">
                {nextPost.title}
              </p>
              <p className="text-sm text-zinc-600 mt-2 line-clamp-2">{nextPost.excerpt}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-blue-700 group-hover:gap-2 transition-all">
                Continue reading
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>
          )}
        </div>
      </motion.article>
    </div>
  );
}