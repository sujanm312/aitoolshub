import React, { useState, useMemo } from 'react';
import { BlogPost, AdSettings } from '../../types';
import { AdSlot } from '../ui/AdSlot';
import {
  Search,
  Tag,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  Filter,
  X,
  Share2,
} from 'lucide-react';

interface BlogListViewProps {
  blogs: BlogPost[];
  adSettings: AdSettings;
  onNavigate: (path: string) => void;
}

export const BlogListView: React.FC<BlogListViewProps> = ({
  blogs,
  adSettings,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all categories and tags
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ['All', ...Array.from(set)];
  }, [blogs]);

  const allTags = useMemo(() => {
    const tagCountMap: Record<string, number> = {};
    blogs.forEach((b) => {
      b.tags.forEach((t) => {
        tagCountMap[t] = (tagCountMap[t] || 0) + 1;
      });
    });
    return Object.entries(tagCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, [blogs]);

  // Filtered list
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        blog.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || blog.category === selectedCategory;

      const matchesTag = !selectedTag || blog.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [blogs, searchQuery, selectedCategory, selectedTag]);

  const featuredBlog = useMemo(() => {
    return blogs.find((b) => b.isFeatured) || blogs[0];
  }, [blogs]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Top Banner Ad Unit */}
      <AdSlot
        slotId="blog-top-banner"
        position="top-banner"
        title="Sponsored Financial Insights"
        enabled={adSettings.topBanner}
      />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF671F] mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Daily Financial Analysis & Tax Updates</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Financial Intelligence & <span className="text-[#06038D]">Daily Blogs</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Timely Indian regulatory updates, mutual fund SIP strategies, home loan prepayment hacks, and statutory retirement rules curated by certified financial planners.
        </p>

        {/* Search Input */}
        <div className="mt-6 max-w-xl mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search daily blogs, tags (e.g. Budget 2024, SIP, EMI, PPF)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs & Tag Cloud */}
      <div className="mb-8 space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedTag(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 mr-1">
            <Tag className="w-3 h-3" /> Trending Topics:
          </span>
          {allTags.map((tag) => {
            const isTagActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isTagActive ? null : tag)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1 ${
                  isTagActive
                    ? 'bg-[#FF671F] text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>#{tag}</span>
                {isTagActive && <X className="w-3 h-3" />}
              </button>
            );
          })}
          {(selectedCategory !== 'All' || selectedTag || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTag(null);
                setSearchQuery('');
              }}
              className="text-xs text-rose-600 hover:underline font-bold ml-2 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* FEATURED HERO ARTICLE (if no search/filter active) */}
      {!searchQuery && selectedCategory === 'All' && !selectedTag && featuredBlog && (
        <div className="mb-12">
          <div
            onClick={() => onNavigate(`/blog/${featuredBlog.slug}`)}
            className="group cursor-pointer bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Featured Image */}
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full overflow-hidden bg-slate-100">
              <img
                src={featuredBlog.featuredImage}
                alt={featuredBlog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FF671F] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                  Featured Daily Post
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold">
                  {featuredBlog.category}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredBlog.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredBlog.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#06038D] transition">
                  {featuredBlog.title}
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                  {featuredBlog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {featuredBlog.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & CTA */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {featuredBlog.author.avatar ? (
                    <img
                      src={featuredBlog.author.avatar}
                      alt={featuredBlog.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-[#06038D] font-bold text-xs flex items-center justify-center">
                      {featuredBlog.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {featuredBlog.author.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {featuredBlog.author.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#FF671F] group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ALL BLOGS GRID */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#FF671F]" />
            <span>
              {selectedTag
                ? `Articles Tagged: #${selectedTag}`
                : selectedCategory !== 'All'
                ? `${selectedCategory} Articles`
                : 'All Daily Articles'}
            </span>
            <span className="text-sm font-bold text-slate-400 font-mono">
              ({filteredBlogs.length})
            </span>
          </h3>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-800">No blog posts found</h4>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              No daily articles match your search or filter criteria. Try clearing search filters to view all publications.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTag(null);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => onNavigate(`/blog/${blog.slug}`)}
                className="group cursor-pointer bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {blog.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-[#06038D] transition line-clamp-2 leading-snug">
                      {blog.title}
                    </h4>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTag(tag);
                          }}
                          className="px-2 py-0.5 rounded bg-slate-100 hover:bg-orange-100 text-slate-600 hover:text-[#FF671F] text-[10px] font-medium transition cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author & Read Link */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {blog.author.avatar ? (
                        <img
                          src={blog.author.avatar}
                          alt={blog.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-indigo-50 text-[#06038D] font-bold text-[10px] flex items-center justify-center">
                          {blog.author.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">
                        {blog.author.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#FF671F] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Read →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Ad Unit */}
      <AdSlot
        slotId="blog-bottom-banner"
        position="in-article"
        title="Featured Investment & Market Opportunities"
        enabled={adSettings.bottomInArticle}
      />
    </div>
  );
};
