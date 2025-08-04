import axios from 'axios';
import { staticContent } from '../data/staticContent';

const API_BASE = '/api';

// Check if we're in production without backend
const isProductionWithoutBackend = () => {
  return !window.location.hostname.includes('localhost') && 
         !window.location.hostname.includes('127.0.0.1');
};

// GitHub raw content URLs
const GITHUB_BASE = 'https://raw.githubusercontent.com/onwajunior/Hausset/main/content';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.config?.url} - ${error.response?.status}`, error.message);
    return Promise.reject(error);
  }
);

// Fetch content from GitHub raw files
const fetchFromGitHub = async () => {
  try {
    console.log('🔄 Fetching content from GitHub...');
    
    const [configRes, problemsRes, productsRes] = await Promise.all([
      fetch(`${GITHUB_BASE}/config/site.json`),
      fetch(`${GITHUB_BASE}/problems/problems.json`),
      fetch(`${GITHUB_BASE}/products/screenshots.json`)
    ]);

    if (!configRes.ok || !problemsRes.ok || !productsRes.ok) {
      throw new Error('Failed to fetch from GitHub');
    }

    const [config, problems, products] = await Promise.all([
      configRes.json(),
      problemsRes.json(),
      productsRes.json()
    ]);

    console.log('✅ Successfully fetched content from GitHub');
    return { config, problems, products };
  } catch (error) {
    console.error('❌ Failed to fetch from GitHub:', error);
    throw error;
  }
};

export const contentService = {
  // Get all content in one request
  async getAllContent() {
    try {
      // First try local API (development)
      const response = await apiClient.get('/content/all');
      return response.data;
    } catch (error) {
      // If local API fails, try GitHub in production
      if (isProductionWithoutBackend()) {
        try {
          const githubContent = await fetchFromGitHub();
          return githubContent;
        } catch (githubError) {
          console.error('GitHub fetch failed, using static content:', githubError);
          return staticContent;
        }
      }
      throw new Error('Failed to load content');
    }
  },

  // Get site configuration
  async getConfig() {
    try {
      const response = await apiClient.get('/content/config');
      return response.data;
    } catch (error) {
      if (isProductionWithoutBackend()) {
        try {
          const response = await fetch(`${GITHUB_BASE}/config/site.json`);
          if (!response.ok) throw new Error('Failed to fetch config from GitHub');
          return await response.json();
        } catch (githubError) {
          return staticContent.config;
        }
      }
      throw new Error('Failed to load site configuration');
    }
  },

  // Get problems data
  async getProblems() {
    try {
      const response = await apiClient.get('/content/problems');
      return response.data;
    } catch (error) {
      if (isProductionWithoutBackend()) {
        try {
          const response = await fetch(`${GITHUB_BASE}/problems/problems.json`);
          if (!response.ok) throw new Error('Failed to fetch problems from GitHub');
          return await response.json();
        } catch (githubError) {
          return staticContent.problems;
        }
      }
      throw new Error('Failed to load problems data');
    }
  },

  // Get products data
  async getProducts() {
    try {
      const response = await apiClient.get('/content/products');
      return response.data;
    } catch (error) {
      if (isProductionWithoutBackend()) {
        try {
          const response = await fetch(`${GITHUB_BASE}/products/screenshots.json`);
          if (!response.ok) throw new Error('Failed to fetch products from GitHub');
          return await response.json();
        } catch (githubError) {
          return staticContent.products;
        }
      }
      throw new Error('Failed to load products data');
    }
  },

  // Get available images
  async getImages() {
    try {
      const response = await apiClient.get('/content/images');
      return response.data;
    } catch (error) {
      throw new Error('Failed to load images');
    }
  },

  // Submit contact form
  async submitContact(formData) {
    // In production without backend, provide fallback
    if (isProductionWithoutBackend()) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return success response
      return {
        success: true,
        message: 'Thank you for your interest! Please contact us directly at hello@calyptor.net or call +1 (267) 319-9196'
      };
    }

    try {
      const response = await apiClient.post('/contact', formData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.details) {
        // Validation errors
        throw new Error(error.response.data.details.map(d => d.msg).join(', '));
      }
      throw new Error(error.response?.data?.error || 'Failed to send message');
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Health check failed');
    }
  }
};