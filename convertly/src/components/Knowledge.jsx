import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Users, Download, ChevronRight, Calendar, Clock,
  FileText, BookMarked, Building2, Target, Award, Leaf,
  Zap, Shield, Settings, ArrowRight, Play, ExternalLink, Search,
  HelpCircle, TrendingUp, Heart
} from 'lucide-react';

// Sample Blog Posts Data (with SEO-friendly slugs and meta)
const blogPosts = [
  {
    id: 1,
    slug: "future-industrial-air-filtration-trends-2026",
    title: "The Future of Industrial Air Filtration: Trends for 2026",
    excerpt: "Discover how Industry 4.0 integration and smart monitoring are revolutionizing air quality management in manufacturing facilities.",
    category: "Industry Trends",
    date: "2026-06-05",
    formattedDate: "June 5, 2026",
    readTime: "8 min read",
    featured: true,
    author: "Dr. Markus Weber",
    authorTitle: "CTO, Emifree GmbH"
  },
  {
    id: 2,
    slug: "reduce-cnc-machine-operating-costs-40-percent",
    title: "How to Reduce CNC Machine Operating Costs by 40%",
    excerpt: "A comprehensive guide on optimizing your filtration systems for maximum energy efficiency and minimal maintenance downtime.",
    category: "Technical Guide",
    date: "2026-05-28",
    formattedDate: "May 28, 2026",
    readTime: "12 min read",
    featured: true,
    author: "Anna Schmidt",
    authorTitle: "Product Manager"
  },
  {
    id: 3,
    slug: "new-eu-workplace-air-quality-regulations-2026",
    title: "New EU Workplace Air Quality Regulations 2026",
    excerpt: "Understanding the updated EN 15251 and ISO 17799 standards for indoor air quality in industrial environments.",
    category: "Regulations",
    date: "2026-05-15",
    formattedDate: "May 15, 2026",
    readTime: "6 min read",
    featured: false,
    author: "Klaus Hoffmann",
    authorTitle: "Compliance Specialist"
  },
  {
    id: 4,
    slug: "electrostatic-vs-mechanical-filtration-comparison",
    title: "Electrostatic vs Mechanical Filtration: A Complete Comparison",
    excerpt: "Which technology is right for your application? We break down the pros and cons of each filtration method.",
    category: "Technical Guide",
    date: "2026-05-02",
    formattedDate: "May 2, 2026",
    readTime: "10 min read",
    featured: false,
    author: "Dr. Markus Weber",
    authorTitle: "CTO, Emifree GmbH"
  },
  {
    id: 5,
    slug: "mercedes-benz-energy-savings-case-study",
    title: "Case Study: 60% Energy Savings at Mercedes-Benz Plant",
    excerpt: "How a leading automotive manufacturer achieved significant cost savings with our smart filtration solutions.",
    category: "Case Study",
    date: "2026-04-18",
    formattedDate: "April 18, 2026",
    readTime: "7 min read",
    featured: true,
    author: "Thomas Bauer",
    authorTitle: "Senior Solutions Architect"
  },
  {
    id: 6,
    slug: "oil-mist-health-risks-factory-workers",
    title: "Oil Mist Health Risks: What Factory Workers Need to Know",
    excerpt: "Understanding the health implications of prolonged exposure to oil mist and how proper filtration protects your workforce.",
    category: "Health & Safety",
    date: "2026-04-05",
    formattedDate: "April 5, 2026",
    readTime: "5 min read",
    featured: false,
    author: "Dr. Elena Petrova",
    authorTitle: "Industrial Hygienist"
  }
];

// Helper function to get icon based on category
const getCategoryIcon = (category) => {
  switch(category) {
    case 'Industry Trends':
      return TrendingUp;
    case 'Technical Guide':
      return Settings;
    case 'Regulations':
      return Shield;
    case 'Case Study':
      return Award;
    case 'Health & Safety':
      return Heart;
    default:
      return BookOpen;
  }
};

// About Us Data (expanded for SEO)
const aboutData = {
  story: {
    title: 'Our Story',
    content: 'Founded in Berlin in 2010, Emifree GmbH emerged from a vision to create filtration solutions that balance industrial performance with environmental responsibility. What started as a small engineering team focused on CNC machining applications has grown into a global leader in air filtration technology.',
    stats: [
      { value: '2010', label: 'Founded' },
      { value: '500+', label: 'Clients Worldwide' },
      { value: '15+', label: 'Countries' }
    ]
  },
  mission: {
    title: 'Our Mission',
    content: 'We believe that clean air is a fundamental right in every workplace. Our mission is to develop innovative filtration technologies that protect workers, reduce environmental impact, and help industries operate more sustainably.',
    values: [
      { icon: Leaf, title: 'Sustainability', desc: 'Designing products that minimize environmental footprint' },
      { icon: Shield, title: 'Safety First', desc: 'Protecting worker health with proven filtration efficiency' },
      { icon: Settings, title: 'Innovation', desc: 'Continuously improving our technology and processes' },
      { icon: Target, title: 'Reliability', desc: 'Delivering consistent performance our customers can trust' }
    ]
  },
  clients: [
    'Mercedes-Benz', 'BMW', 'General Motors', 'NSK Bearings',
    'Knorr-Bremse', 'Siemens', 'Bosch', 'ThyssenKrupp'
  ],
  faqs: [
    {
      question: "How often should industrial air filters be replaced?",
      answer: "Filter replacement intervals vary by application and usage. Typically, our ECO AIR Cleaner filters last 6-12 months, while electrostatic cells require cleaning every 3-6 months. Our smart monitoring system provides real-time maintenance alerts."
    },
    {
      question: "What is the typical ROI for an air filtration system?",
      answer: "Most industrial clients see ROI within 12-24 months through reduced energy costs (up to 40%), lower maintenance downtime, improved worker productivity, and reduced health-related absenteeism."
    },
    {
      question: "Do you offer custom filtration solutions for unique applications?",
      answer: "Yes! Our engineering team designs custom solutions for specialized manufacturing processes, including high-oil-mist environments, pharmaceutical cleanrooms, and chemical processing facilities."
    }
  ]
};

// Downloads Data - simplified to 4 brochures
const downloads = {
  catalogs: [
    { name: 'ECO AIR Cleaner Catalog', size: '4.2 MB', lang: 'EN', url: '/downloads/eco-air-catalog-en.pdf', type: 'catalog' },
    { name: 'ECO AIR Cleaner Katalog', size: '4.5 MB', lang: 'DE', url: '/downloads/eco-air-catalog-de.pdf', type: 'catalog' },
    { name: 'EARIA Electrostatic Catalog', size: '3.8 MB', lang: 'EN', url: '/downloads/earia-catalog-en.pdf', type: 'catalog' },
    { name: 'Full Product Range 2026', size: '12.5 MB', lang: 'EN', url: '/downloads/full-range-2026.pdf', type: 'catalog' }
  ]
};

// Tab Configuration
const tabs = [
  { id: 'blog', label: 'Industry Insights', icon: BookOpen, ariaLabel: 'View blog articles and industry insights' },
  { id: 'about', label: 'About Us', icon: Users, ariaLabel: 'Learn about Emifree company and mission' },
  { id: 'downloads', label: 'Downloads', icon: Download, ariaLabel: 'Download product catalogs and technical documentation' }
];

const Knowledge = () => {
  const [activeTab, setActiveTab] = useState('blog');

  // SEO: Dynamic meta tags and structured data
  useEffect(() => {
    const titles = {
      blog: 'Industry Insights & Air Filtration Blog | Emifree',
      about: 'About Emifree | Industrial Air Filtration Company Berlin',
      downloads: 'Technical Downloads & Resources | Emifree Air Filtration'
    };
    const descriptions = {
      blog: 'Expert insights on industrial air filtration, CNC mist collection, EU regulations, and energy-saving technologies. Read case studies and technical guides.',
      about: 'German engineering since 2010. Emifree develops sustainable, high-efficiency air filtration solutions for manufacturing. Trusted by Mercedes-Benz, BMW, and Siemens.',
      downloads: 'Download product catalogs, brochures, and technical documentation for ECO AIR Cleaner and EARIA electrostatic filters.'
    };
    
    document.title = titles[activeTab] || 'Emifree Knowledge Hub';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = descriptions[activeTab];
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href.split('#')[0].split('?')[0];
    
    const removeOldSchema = () => {
      const oldScript = document.getElementById('emifree-schema');
      if (oldScript) oldScript.remove();
    };
    
    removeOldSchema();
    
    const schemaScript = document.createElement('script');
    schemaScript.id = 'emifree-schema';
    schemaScript.type = 'application/ld+json';
    
    let schemaData = {};
    if (activeTab === 'blog') {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Industrial Air Filtration Blog Posts",
        "description": "Latest articles about air quality management, filtration technology, and industry regulations",
        "numberOfItems": blogPosts.length,
        "itemListElement": blogPosts.map((post, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "url": `https://emifree.com/blog/${post.slug}`,
          "name": post.title
        }))
      };
    } else if (activeTab === 'about') {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Emifree GmbH",
        "url": "https://emifree.com",
        "logo": "https://emifree.com/logo.png",
        "foundingDate": "2010",
        "foundingLocation": "Berlin, Germany",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Berlin",
          "addressCountry": "DE"
        },
        "knowsAbout": ["Industrial Air Filtration", "CNC Mist Collection", "Electrostatic Precipitators", "Workplace Safety"],
        "description": aboutData.mission.content
      };
    } else if (activeTab === 'downloads') {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "DataCatalog",
        "name": "Emifree Product Brochures",
        "description": "Product catalogs and brochures",
        "hasPart": downloads.catalogs.map(doc => ({
          "@type": "CreativeWork",
          "name": doc.name,
          "encodingFormat": "application/pdf",
          "contentSize": doc.size
        }))
      };
    }
    
    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);
    
    return () => {
      if (document.getElementById('emifree-schema')) {
        document.getElementById('emifree-schema').remove();
      }
    };
  }, [activeTab]);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="knowledge" className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50" aria-label="Knowledge Center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
            Resources &amp;
            <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent"> Knowledge</span>
          </h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            Explore our latest insights, company updates, and technical resources to stay informed about industrial air filtration.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          role="tablist"
          aria-label="Knowledge center sections"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === tab.id
                  ? 'bg-blue-700 text-white shadow-lg'
                  : 'bg-white text-zinc-600 hover:bg-slate-100 hover:text-blue-700 border border-slate-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-5 h-5" aria-hidden="true" />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          {/* ========== INDUSTRY INSIGHTS (BLOG) - NO SEARCH/FILTER, ICON ONLY ========== */}
          {activeTab === 'blog' && (
            <motion.div
              key="blog"
              role="tabpanel"
              id="panel-blog"
              aria-labelledby="tab-blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                    <Award className="w-6 h-6 text-amber-500" aria-hidden="true" />
                    Featured Articles
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredPosts.map((post) => (
                      <FeaturedBlogCard key={post.id} post={post} getIcon={getCategoryIcon} />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              <div>
                <h2 className="text-xl font-bold text-zinc-900 mb-6">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <BlogCard key={post.id} post={post} getIcon={getCategoryIcon} />
                  ))}
                </div>
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <motion.a
                  href="/blog"
                  className="bg-white border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View all blog articles"
                >
                  View All Articles
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </motion.a>
              </div>
            </motion.div>
          )}

          {/* ========== ABOUT US (unchanged) ========== */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              role="tabpanel"
              id="panel-about"
              aria-labelledby="tab-about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
                    <BookMarked className="w-8 h-8 text-blue-700" aria-hidden="true" />
                    {aboutData.story.title}
                  </h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {aboutData.story.content}
                  </p>
                  <div className="grid grid-cols-3 gap-6">
                    {aboutData.story.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-3xl font-bold text-blue-700 mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-50 rounded-3xl p-8 flex items-center justify-center aspect-video">
                  <div className="text-center">
                    <Building2 className="w-20 h-20 text-blue-700 mx-auto mb-4" aria-hidden="true" />
                    <p className="text-slate-600 font-medium">Based in Berlin, Germany</p>
                    <p className="text-sm text-slate-500 mt-2">Serving industry worldwide since 2010</p>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
                  {aboutData.mission.title}
                </h2>
                <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-12">
                  {aboutData.mission.content}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {aboutData.mission.values.map((value, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <value.icon className="w-6 h-6 text-blue-700" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 mb-2">{value.title}</h3>
                      <p className="text-slate-600 text-sm">{value.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-100 rounded-3xl p-8 mb-16">
                <h2 className="text-xl font-bold text-zinc-900 mb-6 text-center">Trusted by Industry Leaders</h2>
                <div className="flex flex-wrap justify-center gap-8 items-center">
                  {aboutData.clients.map((client, idx) => (
                    <div key={idx} className="text-lg font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                      {client}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-zinc-900 mb-8 text-center flex items-center justify-center gap-2">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                  Frequently Asked Questions
                </h2>
                <div className="max-w-4xl mx-auto space-y-4">
                  {aboutData.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                      <h3 className="text-lg font-semibold text-zinc-900 mb-2 flex items-start gap-2">
                        <span className="text-blue-600 font-bold">Q:</span> {faq.question}
                      </h3>
                      <div className="text-slate-600 pl-6">
                        <span className="font-medium text-blue-600">A:</span> {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <a href="/contact" className="text-blue-700 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Have more questions? Contact our team <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== DOWNLOADS (simplified: only 4 brochures) ========== */}
          {activeTab === 'downloads' && (
            <motion.div
              key="downloads"
              role="tabpanel"
              id="panel-downloads"
              aria-labelledby="tab-downloads"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-blue-700" aria-hidden="true" />
                  Product Brochures
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {downloads.catalogs.map((catalog, idx) => (
                    <motion.a
                      key={idx}
                      href={catalog.url}
                      download
                      className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors">
                        <FileText className="w-6 h-6 text-blue-700 group-hover:text-white transition-colors" aria-hidden="true" />
                      </div>
                      <h3 className="font-semibold text-zinc-900 mb-1">{catalog.name}</h3>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>{catalog.size}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{catalog.lang}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div
                className="bg-gradient-to-r from-blue-700 to-cyan-600 rounded-3xl p-8 md:p-12 text-white text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need Custom Documentation?
                </h2>
                <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                  Can't find what you're looking for? Contact our technical team for custom datasheets, CAD drawings, or specific documentation for your application.
                </p>
                <motion.a
                  href="/contact"
                  className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Technical Support
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Featured Blog Card Component - Icons only, no images
const FeaturedBlogCard = ({ post, getIcon }) => {
  const IconComponent = getIcon(post.category);
  return (
    <motion.article
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
      whileHover={{ y: -4 }}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <meta itemProp="datePublished" content={post.date} />
      <meta itemProp="author" content={post.author} />
      <link itemProp="url" href={`/blog/${post.slug}`} />
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 relative flex items-center justify-center">
        <IconComponent className="w-20 h-20 text-blue-500/40 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
        <div className="absolute top-4 left-4">
          <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            {post.formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>
        <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-blue-700 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-600 mb-4">{post.excerpt}</p>
        <a href={`/blog/${post.slug}`} className="text-blue-700 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
          Read More <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
};

// Regular Blog Card Component - Icons only, no images
const BlogCard = ({ post, getIcon }) => {
  const IconComponent = getIcon(post.category);
  return (
    <motion.article
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-slate-100"
      whileHover={{ y: -4 }}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <meta itemProp="datePublished" content={post.date} />
      <div className="h-40 bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
        <IconComponent className="w-16 h-16 text-blue-500/40 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full">
          {post.category}
        </span>
        <h3 className="text-lg font-bold text-zinc-900 mt-3 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{post.formattedDate}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </motion.article>
  );
};

export default Knowledge;