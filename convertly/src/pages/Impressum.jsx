import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const SITE_URL = 'https://emifree.com';

export default function Impressum() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    const pageUrl = `${SITE_URL}/impressum`;
    const title = 'Impressum · Emifree GmbH';
    const description =
      'Legal notice for Emifree GmbH, Berlin — Managing Director Ingo Wagner, HRB 133977 B, VAT DE 815286735.';

    document.title = title;

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

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;

    // WebPage JSON-LD for legal pages. AI Overviews and Perplexity
    // surface Impressum pages with structured data reliably; this
    // schema also helps crawlers confirm the publisher identity
    // matches the homepage Organization schema.
    const oldScript = document.getElementById('emifree-impressum-schema');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'emifree-impressum-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Impressum',
      url: pageUrl,
      inLanguage: 'en',
      description,
      publisher: {
        '@type': 'Organization',
        name: 'Emifree GmbH',
        url: SITE_URL,
      },
    });
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('emifree-impressum-schema');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to home
          </Link>

          <nav aria-label="breadcrumb" className="mb-6 text-sm text-zinc-500">
            <Link to="/" className="hover:text-blue-700">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-zinc-700">Impressum</span>
          </nav>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Legal Notice (Impressum)
          </motion.h1>
        </div>
      </div>

      <motion.article
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-zinc-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <p className="text-lg leading-relaxed mb-6">
          <strong>Information pursuant to § 5 TMG (German Telemedia Act) / § 2 DL-InfoV:</strong>
        </p>
        <p className="text-lg leading-relaxed mb-10">
          Emifree GmbH Produktion von Filteranlagen
          <br />
          Pestalozzistraße 13
          <br />
          12557 Berlin, Germany
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">
          Represented by the Managing Director
        </h2>
        <p className="text-lg leading-relaxed mb-6">Ingo Wagner</p>

        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">Contact Information</h2>
        <ul className="text-lg leading-relaxed mb-6 space-y-1">
          <li>
            <strong>Phone:</strong> <a href="tel:+493076283520" className="text-blue-700 hover:text-blue-800">+49 3076283520</a>
          </li>
          <li>
            <strong>E-Mail:</strong> <a href="mailto:info@emifree.com" className="text-blue-700 hover:text-blue-800">info@emifree.com</a>
          </li>
          <li>
            <strong>Internet:</strong> <a href="https://www.emifree.com" className="text-blue-700 hover:text-blue-800">www.emifree.com</a>
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">Register Entry</h2>
        <p className="text-lg leading-relaxed mb-6">
          Commercial Register Entry.
          <br />
          <strong>Registration Court:</strong> District Court (Amtsgericht) Berlin (Charlottenburg)
          <br />
          <strong>Registration Number:</strong> HRB 133977 B
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">VAT ID</h2>
        <p className="text-lg leading-relaxed mb-6">
          Value Added Tax Identification Number pursuant to § 27 a Value Added Tax Act:
          <br />
          <strong>DE 815286735</strong>
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">
          Important Notice for Consumers (B2B Exclusivity)
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          This website and the goods displayed and published herein by Emifree GmbH are
          directed exclusively at commercial entities / traders (as defined by § 14 BGB,
          § 1 Paragraph 2 HGB, and § 15 II EStG). The conclusion of purchase contracts
          and the sale of goods to private individuals / consumers pursuant to § 13 BGB
          is strictly excluded.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 mt-10 mb-4">
          Person Responsible for Content pursuant to § 18 Paragraph 2 MStV
        </h2>
        <p className="text-lg leading-relaxed mb-10">
          Ingo Wagner
          <br />
          Pestalozzistraße 13
          <br />
          12557 Berlin, Germany
        </p>

        <hr className="my-10 border-slate-200" />
        <p className="text-sm text-zinc-500 italic">
          Note: The domain www.emifree.com and other domains accessing this legal
          notice are the legal property of Emifree GmbH.
        </p>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </motion.article>
    </div>
  );
}