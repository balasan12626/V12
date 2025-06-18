import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import viteSitemap from './vite-sitemap-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Ensure Vite serves static files from the public directory
    publicDir: 'public',
    
    plugins: [
      // Custom plugin to handle sitemap.xml in development
      viteSitemap(),
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: env.VITE_APP_TITLE || 'Balakarthikeyan | Data Analyst & AI Developer',
            description: env.VITE_APP_DESCRIPTION || 'Professional Data Analyst and Power BI Developer specializing in Python, Machine Learning, and Data Visualization.',
            keywords: env.VITE_APP_KEYWORDS || 'Data Analyst, Power BI, Python, Machine Learning, Data Visualization, Portfolio',
            author: 'Balakarthikeyan',
            url: env.VITE_APP_URL || 'https://www.balakarthikeyan.me',
            image: env.VITE_APP_IMAGE || 'https://www.balakarthikeyan.me/og-image.jpg',
            twitter: '@balakarthi',
          },
        },
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Balakarthikeyan - Portfolio',
          short_name: 'Balakarthikeyan',
          description: 'Professional Data Analyst and Power BI Developer',
          theme_color: '#0a0a0a',
          background_color: '#0a0a0a',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: '/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
      viteCompression({
        verbose: true,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      viteCompression({
        verbose: true,
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 75,
        },
        pngquant: {
          quality: [0.65, 0.8],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: ['react', 'react-dom', 'react-router-dom'],
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            framer: ['framer-motion'],
          },
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
    },
    server: {
      host: true,
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'https://v12backend-production.up.railway.app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: true,
        },
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    preview: {
      port: 3000,
      open: true,
    },
  };
});
