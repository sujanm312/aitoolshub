import React, { useState, useRef } from 'react';
import { BlogPost } from '../../types';
import { RichContent } from '../blog/RichContent';
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Tag,
  Image as ImageIcon,
  Bold,
  Italic,
  Link as LinkIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Check,
  X,
  Sparkles,
  RotateCcw,
  Calendar,
  Clock,
  User,
  Search,
  ExternalLink,
  Save,
} from 'lucide-react';

interface BlogManagerProps {
  blogs: BlogPost[];
  onCreateBlog: (blog: BlogPost) => void;
  onUpdateBlog: (blog: BlogPost) => void;
  onDeleteBlog: (blogId: string) => void;
  onResetBlogs: () => void;
  onNavigate: (path: string) => void;
}

const PRESET_IMAGES = [
  {
    label: 'Stock Market & Charts',
    url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Compounding & Growth',
    url: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Home Loan & Property',
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Tax & Salaried Employee',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Sovereign Savings & Piggy Bank',
    url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Coins & Wealth Planning',
    url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
  },
];

const SUGGESTED_TAGS = [
  'Budget 2024',
  'SIP',
  'Mutual Funds',
  'Tax Planning',
  'Home Loan',
  'EMI',
  'Gratuity',
  'PPF',
  'Fixed Deposit',
  'Compounding',
  'Section 80C',
  'Retirement',
];

export const BlogManager: React.FC<BlogManagerProps> = ({
  blogs,
  onCreateBlog,
  onUpdateBlog,
  onDeleteBlog,
  onResetBlogs,
  onNavigate,
}) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Form State
  const [title, setTitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [category, setCategory] = useState<string>('Investing');
  const [excerpt, setExcerpt] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [featuredImage, setFeaturedImage] = useState<string>(PRESET_IMAGES[0].url);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('aitoolshub Research Desk');
  const [authorRole, setAuthorRole] = useState<string>('Financial Markets Analyst');
  const [publishedAt, setPublishedAt] = useState<string>('');
  const [readTime, setReadTime] = useState<string>('5 min read');
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  // Editor Sub-tabs: 'edit' or 'preview'
  const [editorViewMode, setEditorViewMode] = useState<'edit' | 'preview'>('edit');

  // Hyperlink Modal State
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [linkText, setLinkText] = useState<string>('');
  const [linkUrl, setLinkUrl] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleOpenCreate = () => {
    setEditingBlogId(null);
    setTitle('');
    setSlug('');
    setCategory('Investing');
    setExcerpt('');
    setContent(`## 1. Overview & Context\n\nExplain the topic with **bold emphasis** on key numbers.\n\n## 2. Key Rules & Calculations\n\n- Rule 1: Always check eligibility\n- Rule 2: Calculate accurately using [our calculators](/calculators/sip-calculator)\n\n> **Key Takeaway**: Plan early to benefit from compounding.\n\n## 3. Final Recommendations\n\nSummarize practical next steps for Indian taxpayers and investors.`);
    setFeaturedImage(PRESET_IMAGES[0].url);
    setTags(['Investing', 'Tax Planning']);
    setAuthorName('aitoolshub Research Desk');
    setAuthorRole('Financial Markets Analyst');
    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setPublishedAt(today);
    setReadTime('5 min read');
    setIsFeatured(false);
    setEditorViewMode('edit');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setSlug(blog.slug);
    setCategory(blog.category);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setFeaturedImage(blog.featuredImage);
    setTags([...blog.tags]);
    setAuthorName(blog.author.name);
    setAuthorRole(blog.author.role);
    setPublishedAt(blog.publishedAt);
    setReadTime(blog.readTime);
    setIsFeatured(!!blog.isFeatured);
    setEditorViewMode('edit');
    setIsFormOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingBlogId) {
      setSlug(generateSlug(val));
    }
  };

  // Tag Helpers
  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, '');
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleQuickAddTag = (t: string) => {
    if (!tags.includes(t)) {
      setTags([...tags, t]);
    }
  };

  // Formatting helpers for content textarea
  const insertFormatting = (prefix: string, suffix: string = '', defaultPlaceholder: string = 'text') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;

    const selectedText = currentVal.substring(start, end) || defaultPlaceholder;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newVal = currentVal.substring(0, start) + replacement + currentVal.substring(end);
    setContent(newVal);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 10);
  };

  const handleBoldClick = () => {
    insertFormatting('**', '**', 'bold text');
  };

  const handleItalicClick = () => {
    insertFormatting('*', '*', 'italic text');
  };

  const handleHeading2Click = () => {
    insertFormatting('\n## ', '\n', 'Heading 2 Title');
  };

  const handleHeading3Click = () => {
    insertFormatting('\n### ', '\n', 'Heading 3 Subtitle');
  };

  const handleBulletListClick = () => {
    insertFormatting('\n- ', '\n', 'List item point');
  };

  const handleNumberedListClick = () => {
    insertFormatting('\n1. ', '\n', 'Numbered step');
  };

  const handleQuoteClick = () => {
    insertFormatting('\n> **Key Takeaway**: ', '\n', 'Important financial advice point');
  };

  const handleInsertLinkPrompt = () => {
    const textarea = textareaRef.current;
    const selected = textarea ? textarea.value.substring(textarea.selectionStart, textarea.selectionEnd) : '';
    setLinkText(selected || '');
    setLinkUrl('');
    setIsLinkModalOpen(true);
  };

  const handleApplyLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;

    const textToUse = linkText.trim() || linkUrl.trim();
    const markdownLink = `[${textToUse}](${linkUrl.trim()})`;

    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentVal = textarea.value;
      const newVal = currentVal.substring(0, start) + markdownLink + currentVal.substring(end);
      setContent(newVal);
    } else {
      setContent((prev) => prev + ` ${markdownLink}`);
    }

    setIsLinkModalOpen(false);
    setLinkText('');
    setLinkUrl('');
  };

  // Save Blog
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a blog title.');
      return;
    }

    const cleanSlug = slug.trim() ? generateSlug(slug) : generateSlug(title);

    const blogPayload: BlogPost = {
      id: editingBlogId || `blog-${Date.now()}`,
      slug: cleanSlug,
      title: title.trim(),
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim(),
      featuredImage: featuredImage.trim() || PRESET_IMAGES[0].url,
      tags: tags.length > 0 ? tags : ['Finance'],
      category: category || 'General',
      author: {
        name: authorName.trim() || 'aitoolshub Desk',
        role: authorRole.trim() || 'Financial Analyst',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      },
      publishedAt:
        publishedAt.trim() ||
        new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      readTime: readTime.trim() || '5 min read',
      isFeatured: isFeatured,
    };

    if (editingBlogId) {
      onUpdateBlog(blogPayload);
      showToast('Blog post updated successfully!');
    } else {
      onCreateBlog(blogPayload);
      showToast('New blog post published successfully!');
    }

    setIsFormOpen(false);
  };

  // Delete handler
  const handleConfirmDelete = (id: string) => {
    onDeleteBlog(id);
    setDeleteConfirmId(null);
    showToast('Blog post deleted.');
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="py-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Controls Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF671F]" />
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Daily Blog & Article Publisher
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Create, edit, and manage daily Indian financial blogs with rich bold styling, hyperlinks, tag taxonomy & featured imagery.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleOpenCreate}
            className="w-full md:w-auto px-4 py-2.5 rounded-xl text-white font-bold text-xs btn-3d-saffron flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Blog</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Reset all blogs to original 5 default articles? This will erase custom additions.')) {
                onResetBlogs();
                showToast('Reset to default blogs.');
              }
            }}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="Restore initial seed articles"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search published blogs..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
          />
        </div>

        <div className="text-xs text-slate-400 font-semibold">
          Showing {filteredBlogs.length} of {blogs.length} Blogs
        </div>
      </div>

      {/* BLOGS TABLE / LIST */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Blog Article</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Tags</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No matching blogs found.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/70 transition">
                    {/* Article Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                        <div className="min-w-0 max-w-sm">
                          <div className="flex items-center gap-1.5">
                            {blog.isFeatured && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-black uppercase">
                                Featured
                              </span>
                            )}
                            <h4 className="font-bold text-slate-900 truncate">
                              {blog.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                            /blog/{blog.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 font-bold text-slate-700 text-[11px]">
                        {blog.category}
                      </span>
                    </td>

                    {/* Tags Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {blog.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-orange-50 text-[#FF671F] font-semibold text-[10px]"
                          >
                            #{t}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="text-[10px] text-slate-400 font-bold">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Date Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                      {blog.publishedAt}
                    </td>

                    {/* Actions Column */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onNavigate(`/blog/${blog.slug}`)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#06038D] hover:bg-slate-100 transition cursor-pointer"
                          title="View Live Article"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(blog)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                          title="Edit Blog"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(blog.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl text-center animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete this blog post?</h3>
            <p className="text-xs text-slate-500 mt-1">
              This will permanently delete the post from your local storage and live blog directory.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConfirmDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-xs font-bold text-white hover:bg-rose-700 transition cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT BLOG MODAL / FULL PANEL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl border border-slate-200 shadow-2xl my-6 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#FF671F]" />
                  <span>{editingBlogId ? 'Edit Blog Post' : 'Create New Daily Blog Post'}</span>
                </h3>
                <span className="text-[11px] text-slate-500">
                  Fill in article details, select featured image, and format text using toolbar.
                </span>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveBlog} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Budget 2024 Capital Gains Tax Overhaul: Mutual Funds Impact"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="budget-2024-capital-gains"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  />
                </div>
              </div>

              {/* Row 2: Category, Published Date, Read Time, Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  >
                    <option value="Investing">Investing & SIP</option>
                    <option value="Tax Planning">Tax Planning</option>
                    <option value="Loans & Debt">Loans & Debt</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Sovereign Savings">Sovereign Savings</option>
                    <option value="Daily Market Insights">Daily Market Insights</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Publish Date
                  </label>
                  <input
                    type="text"
                    placeholder="September 3, 2026"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    placeholder="5 min read"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-[#FF671F] focus:ring-[#FF671F]"
                    />
                    <span className="text-xs font-bold text-slate-700">
                      Feature on Home / Hero
                    </span>
                  </label>
                </div>
              </div>

              {/* Row 3: Author Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    placeholder="CA Rajesh Varma"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Author Role / Credential
                  </label>
                  <input
                    type="text"
                    placeholder="Senior Tax Counsel & Columnist"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  />
                </div>
              </div>

              {/* Row 4: Featured Image URL + Presets */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#FF671F]" />
                    <span>Featured Image URL</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Pick a financial preset or paste any custom image URL
                  </span>
                </div>

                <div className="flex gap-3">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  />
                  {featuredImage && (
                    <div className="w-14 h-9 rounded-lg overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                      <img
                        src={featuredImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Preset image buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">
                    Presets:
                  </span>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setFeaturedImage(img.url)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
                        featuredImage === img.url
                          ? 'bg-[#FF671F] text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Tags Manager */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Tags & Taxonomies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Type tag and press Enter (e.g. Budget 2024, SIP, EMI)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 transition cursor-pointer"
                  >
                    Add Tag
                  </button>
                </div>

                {/* Active Tags Chips */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-[#FF671F] text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>#{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="hover:text-rose-600 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Suggested Quick Tags */}
                <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-400">
                  <span className="font-semibold mr-1">Quick Add:</span>
                  {SUGGESTED_TAGS.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleQuickAddTag(st)}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                    >
                      +{st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 6: Excerpt */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Excerpt / Lead Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="2–3 sentences summarizing the key financial takeaway for readers..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                />
              </div>

              {/* Row 7: Content Area with Formatting Toolbar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <span>Article Content</span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      (Supports Markdown, Bold Text, Hyperlinks, Lists & Quotes)
                    </span>
                  </label>

                  {/* Edit vs Preview Toggle */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setEditorViewMode('edit')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        editorViewMode === 'edit'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorViewMode('preview')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        editorViewMode === 'preview'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {/* Formatting Toolbar */}
                <div className="bg-slate-50 p-2 rounded-t-2xl border border-slate-300 border-b-0 flex flex-wrap items-center gap-1.5 text-slate-700">
                  <button
                    type="button"
                    onClick={handleBoldClick}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 font-black transition cursor-pointer flex items-center gap-1 text-xs"
                    title="Bold Text (**text**)"
                  >
                    <Bold className="w-3.5 h-3.5" />
                    <span className="font-bold">Bold</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleItalicClick}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 italic transition cursor-pointer flex items-center gap-1 text-xs"
                    title="Italic Text (*text*)"
                  >
                    <Italic className="w-3.5 h-3.5" />
                    <span>Italic</span>
                  </button>

                  <div className="h-4 w-px bg-slate-300 mx-1" />

                  <button
                    type="button"
                    onClick={handleInsertLinkPrompt}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-[#06038D] font-bold transition cursor-pointer flex items-center gap-1 text-xs"
                    title="Add Hyperlink [text](url)"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>+ Add Hyperlink</span>
                  </button>

                  <div className="h-4 w-px bg-slate-300 mx-1" />

                  <button
                    type="button"
                    onClick={handleHeading2Click}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 font-bold transition cursor-pointer flex items-center gap-1 text-xs"
                    title="Heading 2 (## Heading)"
                  >
                    <Heading2 className="w-3.5 h-3.5" />
                    <span>H2</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleHeading3Click}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 font-bold transition cursor-pointer flex items-center gap-1 text-xs"
                    title="Heading 3 (### Heading)"
                  >
                    <Heading3 className="w-3.5 h-3.5" />
                    <span>H3</span>
                  </button>

                  <div className="h-4 w-px bg-slate-300 mx-1" />

                  <button
                    type="button"
                    onClick={handleBulletListClick}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition cursor-pointer flex items-center gap-1 text-xs"
                    title="Bullet List (- item)"
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Bullets</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNumberedListClick}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition cursor-pointer flex items-center gap-1 text-xs"
                    title="Numbered List (1. item)"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                    <span>Numbered</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleQuoteClick}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition cursor-pointer flex items-center gap-1 text-xs"
                    title="Callout Quote (> quote)"
                  >
                    <Quote className="w-3.5 h-3.5" />
                    <span>Quote</span>
                  </button>

                  {/* Quick Internal Calculator Links */}
                  <div className="ml-auto flex items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
                      Quick Calc Link:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        insertFormatting('[SIP Calculator](/calculators/sip-calculator)', '', '');
                      }}
                      className="px-2 py-0.5 rounded bg-orange-100 text-[#FF671F] font-bold text-[10px] hover:bg-orange-200 transition cursor-pointer"
                    >
                      +SIP Link
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        insertFormatting('[EMI Calculator](/calculators/emi-calculator)', '', '');
                      }}
                      className="px-2 py-0.5 rounded bg-indigo-100 text-[#06038D] font-bold text-[10px] hover:bg-indigo-200 transition cursor-pointer"
                    >
                      +EMI Link
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        insertFormatting('[Gratuity Calculator](/calculators/gratuity-calculator)', '', '');
                      }}
                      className="px-2 py-0.5 rounded bg-emerald-100 text-[#046A38] font-bold text-[10px] hover:bg-emerald-200 transition cursor-pointer"
                    >
                      +Gratuity Link
                    </button>
                  </div>
                </div>

                {/* Editor or Preview Pane */}
                {editorViewMode === 'edit' ? (
                  <textarea
                    ref={textareaRef}
                    rows={14}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write article content using markdown. Use toolbar buttons to bold text, add hyperlinks, and format headings..."
                    className="w-full p-4 rounded-b-2xl border border-slate-300 font-mono text-xs leading-relaxed text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-white shadow-inner"
                  />
                ) : (
                  <div className="p-6 rounded-b-2xl border border-slate-300 bg-white min-h-[350px] overflow-y-auto">
                    <RichContent content={content} onNavigate={onNavigate} />
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-white font-bold text-xs btn-3d-navy flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingBlogId ? 'Save Changes' : 'Publish Blog Post'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD HYPERLINK MODAL */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#FF671F]" />
                <span>Insert Hyperlink</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplyLink} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Anchor Text (Text to display)
                </label>
                <input
                  type="text"
                  placeholder="e.g. aitoolshub SIP Calculator"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Hyperlink URL (Web Address or Path) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /calculators/sip-calculator or https://incometax.gov.in"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Tip: Use <code className="text-blue-600">/calculators/sip-calculator</code> for internal links or <code className="text-blue-600">https://...</code> for external links.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLinkModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#06038D] text-white text-xs font-bold hover:bg-slate-900 transition cursor-pointer"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
