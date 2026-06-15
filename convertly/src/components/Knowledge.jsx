import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Users, Download, ChevronRight, Calendar, Clock,
  FileText, BookMarked, Building2, Target, Award, Leaf,
  Zap, Shield, Settings, ArrowRight, Play, ExternalLink, Search
} from 'lucide-react';

// Sample Blog Posts Data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Industrial Air Filtration: Trends for 2026',
    excerpt: 'Discover how Industry 4.0 integration and smart monitoring are revolutionizing air quality management in manufacturing facilities.',
    category: 'Industry Trends',
    date: 'June 5, 2026',
    readTime: '8 min read',
    image: '/assets/blog/air-filtration-future.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'How to Reduce CNC Machine Operating Costs by 40%',
    excerpt: 'A comprehensive guide on optimizing your filtration systems for maximum energy efficiency and minimal maintenance downtime.',
    category: 'Technical Guide',
    date: 'May 28, 2026',
    readTime: '12 min read',
    image: '/assets/blog/cnc-cost-reduction.jpg',
    featured: true
  },
  {
    id: 3,
    title: 'New EU Workplace Air Quality Regulations 2026',
    excerpt: 'Understanding the updated EN 15251 and ISO 17799 standards for indoor air quality in industrial environments.',
    category: 'Regulations',
    date: 'May 15, 2026',
    readTime: '6 min read',
    image: '/assets/blog/eu-regulations.jpg',
    featured: false
  },
  {
    id: 4,
    title: 'Electrostatic vs Mechanical Filtration: A Complete Comparison',
    excerpt: 'Which technology is right for your application? We break down the pros and cons of each filtration method.',
    category: 'Technical Guide',
    date: 'May 2, 2026',
    readTime: '10 min read',
    image: '/assets/blog/filtration-comparison.jpg',
    featured: false
  },
  {
    id: 5,
    title: 'Case Study: 60% Energy Savings at Mercedes-Benz Plant',
    excerpt: 'How a leading automotive manufacturer achieved significant cost savings with our smart filtration solutions.',
    category: 'Case Study',
    date: 'April 18, 2026',
    readTime: '7 min read',
    image: '/assets/blog/mercedes-case.jpg',
    featured: true
  },
  {
    id: 6,
    title: 'Oil Mist Health Risks: What Factory Workers Need to Know',
    excerpt: 'Understanding the health implications of prolonged exposure to oil mist and how proper filtration protects your workforce.',
    category: 'Health & Safety',
    date: 'April 5, 2026',
    readTime: '5 min read',
    image: '/assets/blog/health-safety.jpg',
    featured: false
  }
];

// About Us Data
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
  ]
};

// Downloads Data
const downloads = {
  catalogs: [
    { name: 'ECO AIR Cleaner Catalog', size: '4.2 MB', lang: 'EN', url: '/downloads/eco-air-catalog-en.pdf' },
    { name: 'ECO AIR Cleaner Katalog', size: '4.5 MB', lang: 'DE', url: '/downloads/eco-air-catalog-de.pdf' },
    { name: 'EARIA Electrostatic Catalog', size: '3.8 MB', lang: 'EN', url: '/downloads/earia-catalog-en.pdf' },
    { name: 'Full Product Range 2026', size: '12.5 MB', lang: 'EN', url: '/downloads/full-range-2026.pdf' }
  ],
  datasheets: [
    { name: 'EAC12-2 Technical Specs', size: '1.2 MB', type: 'PDF' },
    { name: 'EAC15-2 Technical Specs', size: '1.3 MB', type: 'PDF' },
    { name: 'EARIA Type 1000 Flex', size: '1.8 MB', type: 'PDF' },
    { name: 'HEPA Module Specifications', size: '0.8 MB', type: 'PDF' },
    { name: 'Control System Integration', size: '2.1 MB', type: 'PDF' },
    { name: 'Installation Guidelines', size: '3.4 MB', type: 'PDF' }
  ],
  guides: [
    { name: 'Maintenance Handbook', size: '5.2 MB', type: 'PDF' },
    { name: 'Troubleshooting Guide', size: '2.8 MB', type: 'PDF' },
    { name: 'Safety Precautions', size: '1.5 MB', type: 'PDF' },
    { name: 'Energy Optimization Tips', size: '1.9 MB', type: 'PDF' }
  ]
};

// Tab Configuration
const tabs = [
  { id: 'blog', label: 'Industry Insights', icon: BookOpen },
  { id: 'about', label: 'About Us', icon: Users },
  { id: 'downloads', label: 'Downloads', icon: Download }
];

const Knowledge = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [blogFilter, setBlogFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = blogFilter === 'all' || post.category === blogFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const blogCategories = ['All', 'Industry Trends', 'Technical Guide', 'Regulations', 'Case Study', 'Health & Safety'];

  return (
    <section id="knowledge" className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
            Resources &
            <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent"> Knowledge</span>
          </h2>
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
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-700 text-white shadow-lg'
                  : 'bg-white text-zinc-600 hover:bg-slate-100 hover:text-blue-700 border border-slate-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">

          {/* ========== INDUSTRY INSIGHTS (BLOG) ========== */}
          {activeTab === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Search & Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 focus:border-blue-500 focus:ring-0 transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setBlogFilter(category === 'All' ? 'all' : category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        (category === 'All' ? 'all' : category) === blogFilter
                          ? 'bg-blue-700 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                    <Award className="w-6 h-6 text-amber-500" />
                    Featured Articles
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredPosts.map((post) => (
                      <FeaturedBlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              <div>
                <h3 className="text-xl font-bold text-zinc-900 mb-6">Latest Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <motion.button
                  className="bg-white border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-blue-700 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Articles
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ========== ABOUT US ========== */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Story Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
                    <BookMarked className="w-8 h-8 text-blue-700" />
                    {aboutData.story.title}
                  </h3>
                  <p className="text-lg text-zlate-600 mb-8 leading-relaxed">
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
                    <Building2 className="w-20 h-20 text-blue-700 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">Based in Berlin, Germany</p>
                  </div>
                </div>
              </div>

              {/* Mission & Values */}
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
                  {aboutData.mission.title}
                </h3>
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
                        <value.icon className="w-6 h-6 text-blue-700" />
                      </div>
                      <h4 className="text-lg font-bold text-zinc-900 mb-2">{value.title}</h4>
                      <p className="text-slate-600 text-sm">{value.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trusted Clients */}
              <div className="bg-slate-100 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-zinc-900 mb-6 text-center">Trusted by Industry Leaders</h3>
                <div className="flex flex-wrap justify-center gap-8 items-center">
                  {aboutData.clients.map((client, idx) => (
                    <div
                      key={idx}
                      className="text-lg font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      {client}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== DOWNLOADS ========== */}
          {activeTab === 'downloads' && (
            <motion.div
              key="downloads"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Catalogs */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-blue-700" />
                  Product Catalogs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {downloads.catalogs.map((catalog, idx) => (
                    <motion.a
                      key={idx}
                      href={catalog.url}
                      className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors">
                        <FileText className="w-6 h-6 text-blue-700 group-hover:text-white transition-colors" />
                      </div>
                      <h4 className="font-semibold text-zinc-900 mb-1">{catalog.name}</h4>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>{catalog.size}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{catalog.lang}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Technical Datasheets */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-blue-700" />
                  Technical Datasheets
                </h3>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left px-6 py-4 font-semibold text-slate-900">Document</th>
                        <th className="text-center px-6 py-4 font-semibold text-slate-900">Type</th>
                        <th className="text-center px-6 py-4 font-semibold text-slate-900">Size</th>
                        <th className="text-center px-6 py-4 font-semibold text-slate-900">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {downloads.datasheets.map((sheet, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-slate-400" />
                              <span className="font-medium text-slate-900">{sheet.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              {sheet.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-slate-500">{sheet.size}</td>
                          <td className="px-6 py-4 text-center">
                            <button className="text-blue-700 hover:text-blue-900 font-medium inline-flex items-center gap-1">
                              Download <Download className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Installation & Maintenance Guides */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
                  <BookMarked className="w-6 h-6 text-blue-700" />
                  Installation & Maintenance Guides
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {downloads.guides.map((guide, idx) => (
                    <motion.a
                      key={idx}
                      href="#"
                      className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-lg hover:border-cyan-200 transition-all group flex items-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center group-hover:bg-cyan-600 transition-colors flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-cyan-700 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{guide.name}</h4>
                        <span className="text-sm text-slate-500">{guide.size}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Request Custom Documentation */}
              <motion.div
                className="bg-gradient-to-r from-blue-700 to-cyan-600 rounded-3xl p-8 md:p-12 text-white text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Need Custom Documentation?
                </h3>
                <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                  Can't find what you're looking for? Contact our technical team for custom datasheets, CAD drawings, or specific documentation for your application.
                </p>
                <motion.button
                  className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Technical Support
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Featured Blog Card Component
const FeaturedBlogCard = ({ post }) => (
  <motion.article
    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
    whileHover={{ y: -4 }}
  >
    <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <BookOpen className="w-20 h-20 text-blue-300" />
      </div>
      <div className="absolute top-4 left-4">
        <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {post.readTime}
        </span>
      </div>
      <h4 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-blue-700 transition-colors">
        {post.title}
      </h4>
      <p className="text-slate-600 mb-4">{post.excerpt}</p>
      <a href="#" className="text-blue-700 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
        Read More <ChevronRight className="w-4 h-4" />
      </a>
    </div>
  </motion.article>
);

// Regular Blog Card Component
const BlogCard = ({ post }) => (
  <motion.article
    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-slate-100"
    whileHover={{ y: -4 }}
  >
    <div className="h-40 bg-gradient-to-br from-slate-100 to-blue-50 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <BookOpen className="w-12 h-12 text-slate-300" />
      </div>
    </div>
    <div className="p-5">
      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full">
        {post.category}
      </span>
      <h4 className="text-lg font-bold text-zinc-900 mt-3 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
        {post.title}
      </h4>
      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
    </div>
  </motion.article>
);

export default Knowledge;