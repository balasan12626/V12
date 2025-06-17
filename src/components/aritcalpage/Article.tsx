import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Interface for blog data structure
interface Blog {
  _id?: string;
  title: string;
  content: string;
  created_at: string;
  preview?: string;
}

interface BlogsResponse {
  status: string;
  blogs: Blog[];
  count: number;
}

interface SingleBlogResponse {
  status: string;
  blog: Blog;
}

const Article: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'single'>('list');
  const [readingProgress, setReadingProgress] = useState<number>(0);

  // Base API URL - adjust according to your FastAPI server
  const API_BASE_URL = 'https://v12backend-production.up.railway.app/blogs';

  // Reading progress bar functionality
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(Math.max(progress, 0), 100));
    };

    if (viewMode === 'single') {
      window.addEventListener('scroll', updateReadingProgress);
      return () => window.removeEventListener('scroll', updateReadingProgress);
    }
  }, [viewMode]);

  // Fetch all blogs from the backend
  const fetchAllBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/blogs`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success' && data.blogs) {
        // Transform the data to match our interface
        const transformedBlogs = data.blogs.map((blog: any, index: number) => ({
          _id: blog._id || `blog-${index}`,
          title: blog.title || extractTitle(blog.content),
          content: blog.content || '',
          created_at: blog.created_at || new Date().toISOString(),
          preview: blog.preview || ''
        }));
        setBlogs(transformedBlogs);
        setError('');
      } else {
        throw new Error('Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific blog by ID
  const fetchBlogById = async (blogId: string) => {
    try {
      setLoading(true);
      // First fetch all blogs, then find the specific one by index
      const response = await fetch(`${API_BASE_URL}/blogs`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success' && data.blogs) {
        const blogIndex = parseInt(blogId) - 1; // Convert to 0-based index
        if (blogIndex >= 0 && blogIndex < data.blogs.length) {
          const blog = data.blogs[blogIndex];
          const transformedBlog = {
            _id: blog._id || `blog-${blogIndex}`,
            title: blog.title || extractTitle(blog.content),
            content: blog.content || '',
            created_at: blog.created_at || new Date().toISOString(),
            preview: blog.preview || ''
          };
          setSelectedBlog(transformedBlog);
          setViewMode('single');
          setError('');
        } else {
          throw new Error('Blog not found');
        }
      } else {
        throw new Error('Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to load the requested blog.');
    } finally {
      setLoading(false);
    }
  };

  // Extract clean title from HTML content
  const extractTitle = (content: string): string => {
    if (!content) return 'Untitled';
    
    // Try to find H1 tag
    const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
      return h1Match[1].replace(/<[^>]*>/g, '').trim();
    }
    
    // Try to find title tag
    const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i);
    if (titleMatch) {
      return titleMatch[1].replace(/<[^>]*>/g, '').trim();
    }
    
    return 'Untitled';
  };

  // Clean HTML content for readable display
  const cleanHtmlContent = (content: string): string => {
    if (!content) return '';
    
    // Remove script and style tags completely
    let cleaned = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    // Convert HTML entities
    cleaned = cleaned.replace(/&nbsp;/g, ' ');
    cleaned = cleaned.replace(/&amp;/g, '&');
    cleaned = cleaned.replace(/&lt;/g, '<');
    cleaned = cleaned.replace(/&gt;/g, '>');
    cleaned = cleaned.replace(/&quot;/g, '"');
    
    return cleaned;
  };

  // Format date for display in Indian Standard Time (Kolkata)
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return 'Unknown date';
    }
  };

  // Create content preview
  const createPreview = (content: string, maxLength: number = 200): string => {
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    if (cleanContent.length > maxLength) {
      return cleanContent.substring(0, maxLength) + '...';
    }
    return cleanContent;
  };

  // Share functionality
  const shareArticle = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Initialize component
  useEffect(() => {
    if (id) {
      fetchBlogById(id);
    } else {
      fetchAllBlogs();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-indigo-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-ping mx-auto"></div>
          </div>
          <p className="text-slate-600 text-lg font-medium">Loading articles...</p>
          <p className="text-slate-400 text-sm mt-1">Please wait while we fetch the content</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-md border border-slate-200">
          <div className="text-red-500 mb-6">
            <svg className="w-20 h-20 mx-auto opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Unable to Load Articles</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Single blog view
  if (viewMode === 'single' && selectedBlog) {
    const title = selectedBlog.title || extractTitle(selectedBlog.content);
    const cleanContent = cleanHtmlContent(selectedBlog.content);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
          <div 
            className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Enhanced Header */}
        <header className="bg-gray-900/95 border-b border-gray-700 sticky top-0 z-40 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  navigate('/articles');
                  setViewMode('list');
                  setSelectedBlog(null);
                }}
                className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors duration-200 group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back to Articles</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {Math.ceil(selectedBlog.content.replace(/<[^>]*>/g, '').length / 1000)} min read
                </div>
                <button
                  onClick={() => shareArticle(title)}
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Article */}
          <article className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
            <div className="p-12">
              {/* Article Header */}
              <header className="mb-12 text-center border-b border-gray-600/30 pb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                  {title}
                </h1>
                <div className="flex items-center justify-center space-x-6 text-gray-400">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time dateTime={selectedBlog.created_at} className="font-medium">
                      {formatDate(selectedBlog.created_at)}
                    </time>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <section className="prose prose-lg prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: cleanContent }}
                  className="article-content text-gray-300 leading-relaxed"
                  style={{
                    lineHeight: '1.7',
                    fontSize: '1.125rem'
                  }}
                />
              </section>
            </div>

            {/* Article Footer */}
            <footer className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-t border-gray-600/30 p-8">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-white mb-2">Enjoyed this article?</h3>
                  <p className="text-gray-300">Share it with others or explore more content</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => shareArticle(title)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share Article
                  </button>
                  <button
                    onClick={() => {
                      setViewMode('list');
                      setSelectedBlog(null);
                    }}
                    className="bg-gray-700/50 text-gray-200 px-6 py-3 rounded-xl hover:bg-gray-600/50 transition-all duration-200 font-medium border border-gray-600/50 shadow-sm hover:shadow-md backdrop-blur-sm"
                  >
                    More Articles
                  </button>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    );
  }

  // Blog list view
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Enhanced Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-8 shadow-2xl">
            <div className="bg-gray-900 rounded-xl p-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Recent <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Articles</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover cutting-edge insights and analysis from our advanced AI content generation system
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <span className="flex items-center text-gray-400 font-medium">
              <svg className="w-5 h-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} available
            </span>
            <button
              onClick={fetchAllBlogs}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Articles
            </button>
          </div>
        </header>

        {/* Articles grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-8">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Articles Yet</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Our AI is working hard to generate fresh content. Check back soon for new articles!
            </p>
            <button
              onClick={fetchAllBlogs}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium"
            >
              Check for Updates
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => {
              const title = blog.title || extractTitle(blog.content);
              const preview = createPreview(blog.content);
              
              return (
                <article
                  key={blog._id || index}
                  className="group bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transform hover:-translate-y-2"
                  onClick={() => {
                    // Navigate to the article route so it can be shared via URL
                    navigate(`/articles/${index + 1}`);
                  }}
                >
                  {/* Article Header */}
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                  
                  <div className="p-8">
                    <header className="mb-6">
                      <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors duration-200 leading-tight">
                        {title}
                      </h2>
                      <div className="flex items-center text-sm text-gray-400 space-x-4">
                        <time dateTime={blog.created_at} className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(blog.created_at)}
                        </time>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {Math.ceil(blog.content.replace(/<[^>]*>/g, '').length / 1000)} min read
                        </div>
                      </div>
                    </header>
                    
                    <p className="text-gray-300 line-clamp-4 mb-6 leading-relaxed text-base">
                      {preview}
                    </p>
                    
                    <footer className="flex items-center justify-between">
                      <div className="flex items-center text-purple-400 group-hover:text-purple-300 font-semibold group-hover:translate-x-1 transition-all duration-200">
                        <span className="mr-2">Read Article</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </footer>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Footer CTA */}
        {blogs.length > 0 && (
          <footer className="mt-20 text-center">
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated with AI Insights
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Our AI continues to generate fresh, cutting-edge content on the latest developments in artificial intelligence and technology.
              </p>
              <button
                onClick={fetchAllBlogs}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Discover More Articles
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Article; 
