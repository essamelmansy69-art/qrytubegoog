import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'inline-css-plugin',
        apply: 'build',
        enforce: 'post',
        generateBundle(options, bundle) {
          // Identify all stylesheet CSS assets compiled during the build phase
          const cssAssets = Object.keys(bundle).filter(key => key.endsWith('.css'));
          let inlineStyle = '';
          for (const key of cssAssets) {
            const asset = bundle[key];
            if (asset && asset.type === 'asset' && typeof asset.source === 'string') {
              inlineStyle += asset.source;
              // Safely remove the external css resource from emitting to avoid render blocking downloads
              delete bundle[key];
            }
          }
          
          // Get the HTML bundle and inject CSS styles directly into it
          const htmlAsset = bundle['index.html'];
          if (htmlAsset && htmlAsset.type === 'asset' && typeof htmlAsset.source === 'string') {
            let html = htmlAsset.source;
            
            // Regex to target and eliminate stylesheet links dynamically created by the build system
            html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="\/assets\/[^"]+\.css"[^>]*>/gi, '');
            html = html.replace(/<link[^>]*href="\/assets\/[^"]+\.css"[^>]*rel="stylesheet"[^>]*>/gi, '');
            html = html.replace(/<link[^>]*rel="preload"[^>]*href="\/assets\/[^"]+\.css"[^>]*as="style"[^>]*>/gi, '');
            html = html.replace(/<link[^>]*as="style"[^>]*href="\/assets\/[^"]+\.css"[^>]*rel="preload"[^>]*>/gi, '');
            
            // Clean up other absolute or relative build CSS references, in case Vite uses different configurations
            html = html.replace(/<link\s+[^>]*href="[^"]+\.css"[^>]*>/gi, (match) => {
              if (match.includes('rel="stylesheet"') || match.includes('as="style"')) {
                return '';
              }
              return match;
            });

            // Write the inlined compiled styles straight into the document head
            if (inlineStyle) {
              const cleanedStyle = inlineStyle.trim();
              html = html.replace('</head>', `<style id="critical-compiled-css">${cleanedStyle}</style></head>`);
            }
            
            htmlAsset.source = html;
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router') || id.includes('scheduler')) {
                return 'vendor-react';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              return 'vendor-libs';
            }
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
