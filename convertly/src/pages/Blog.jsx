import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

import { getAllPosts } from '../data/blogPosts.jsx';
import { BlogCard, getCategoryIcon } from '../components/Knowledge';

const SITE_URL = 'https://emifree.com';

export default function Blog() {
  const posts = getAllPosts();

  useEffect(() => {
    document.title = 'Emifree Engineering Blog — Industrial Air Filtration Insights';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      'Technical guides and field insights on industrial oil mist filtration, CNC air quality, mechanical vs electrostatic separation, and EU regulatory compliance. From the Emifree engineering team.';

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}/blog`;

    const setMeta = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta('og:title', 'Emifree Engineering Blog');
    setMeta('og:description', 'Technical guides on industrial oil mist filtration and CNC air quality.');
    setMeta('og:type', 'website');
    setMeta('og:url', `${SITE_URL}/blog`);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Emifree Engineering Blog');
    setMeta(
      'twitter:description',
      'Technical guides on industrial oil mist filtration and CNC air quality.',
    );

    // Blog listing JSON-LD — lets AI Overviews and Google cite this as a
    // canonical blog surface, not the Knowledge tab inside the homepage.
    const oldScript = document.getElementById('emifree-blog-schema');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'emifree-blog-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Emifree Engineering Blog',
      description:
        'Technical guides and field insights on industrial oil mist filtration from the Emifree engineering team.',
      url: `${SITE_URL}/blog`,
      publisher: {
        '@type': 'Organization',
        name: 'Emifree GmbH',
        url: SITE_URL,
      },
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: post.author,
          worksFor: { '@type': 'Organization', name: 'Emifree GmbH' },
        },
      })),
    });
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('emifree-blog-schema');
      if (s) s.remove();
    };
  }, [posts]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to home
          </Link>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Emifree Engineering Blog
          </motion.h1>
          <motion.p
            className="text-xl text-zinc-600 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Technical guides and field insights on industrial oil mist filtration, CNC air
            quality, and EU regulatory compliance — written by the engineers who build our
            systems.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 mb-8 text-zinc-700">
          <BookOpen className="w-5 h-5 text-blue-700" aria-hidden="true" />
          <h2 className="text-2xl font-bold">All articles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} getIcon={getCategoryIcon} />
          ))}
        </div>
      </div>
    </div>
  );
}