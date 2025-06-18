// API Service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://v12backend-production.up.railway.app';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Helper method to make API requests
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Blog API methods
  async getAllBlogs() {
    return this.makeRequest('/blogs');
  }

  async getBlogByTitle(title: string) {
    return this.makeRequest(`/blogs/${encodeURIComponent(title)}`);
  }

  async generateBlog(searchQuery: string) {
    return this.makeRequest('/generate-blog', {
      method: 'POST',
      body: JSON.stringify({ search_query: searchQuery }),
    });
  }

  async generateBlogBackground(searchQuery: string) {
    return this.makeRequest('/generate-blog-background', {
      method: 'POST',
      body: JSON.stringify({ search_query: searchQuery }),
    });
  }

  async generateLLMComparison(comparisonQuery?: string) {
    return this.makeRequest('/generate-llm-comparison', {
      method: 'POST',
      body: JSON.stringify({ comparison_query: comparisonQuery }),
    });
  }

  async generatePredefinedComparison(comparisonType?: string) {
    return this.makeRequest('/generate-predefined-comparison', {
      method: 'POST',
      body: JSON.stringify({ comparison_type: comparisonType }),
    });
  }

  async getComparisonTypes() {
    return this.makeRequest('/comparison-types');
  }

  // Database API methods
  async getDatabaseBlogs() {
    return this.makeRequest('/database/blogs');
  }

  async getDatabaseStats() {
    return this.makeRequest('/database/stats');
  }

  async getBlogsSummary() {
    return this.makeRequest('/database/blogs/summary');
  }

  async getBlogById(blogId: number) {
    return this.makeRequest(`/database/blogs/${blogId}`);
  }

  async exportBlogs(exportFormat = 'json', includeContent = true) {
    return this.makeRequest('/database/export', {
      method: 'POST',
      body: JSON.stringify({ 
        export_format: exportFormat, 
        include_content: includeContent 
      }),
    });
  }

  async deleteBlogById(blogId: number) {
    return this.makeRequest(`/database/blogs/${blogId}`, {
      method: 'DELETE',
    });
  }

  // Dynamic content API methods
  async generateDynamicQuestions(topicFocus = 'AI developments', numQuestions = 20, category?: string) {
    return this.makeRequest('/generate-dynamic-questions', {
      method: 'POST',
      body: JSON.stringify({ 
        topic_focus: topicFocus, 
        num_questions: numQuestions,
        category: category
      }),
    });
  }

  async generateSEOTitle(questionOrTopic: string, contentPreview = '') {
    return this.makeRequest('/generate-seo-title', {
      method: 'POST',
      body: JSON.stringify({ 
        question_or_topic: questionOrTopic, 
        content_preview: contentPreview 
      }),
    });
  }

  async generateBlogWithQuestions(topicFocus = 'AI tools and trends', useComparisonAgent = false) {
    return this.makeRequest('/generate-blog-with-questions', {
      method: 'POST',
      body: JSON.stringify({ 
        topic_focus: topicFocus, 
        use_comparison_agent: useComparisonAgent 
      }),
    });
  }

  async generateContentCalendar(numDays = 30, topicsPerDay = 3) {
    return this.makeRequest('/generate-content-calendar', {
      method: 'POST',
      body: JSON.stringify({ 
        num_days: numDays, 
        topics_per_day: topicsPerDay 
      }),
    });
  }

  async getQuestionCategories() {
    return this.makeRequest('/question-categories');
  }

  async getQuestionsByCategory(category: string, numQuestions = 10) {
    return this.makeRequest(`/questions-by-category/${category}?num_questions=${numQuestions}`);
  }

  // Utility methods
  async healthCheck() {
    return this.makeRequest('/health');
  }

  async getSchedulerStatus() {
    return this.makeRequest('/scheduler-status');
  }

  async manualBlogGeneration() {
    return this.makeRequest('/manual-blog-generation', {
      method: 'POST',
    });
  }

  async pingSearchEngines() {
    return this.makeRequest('/ping-search-engines', {
      method: 'POST',
    });
  }

  async getSitemapStats() {
    return this.makeRequest('/sitemap-stats');
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService; 