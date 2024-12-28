import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
export default defineConfig(() => {
	return {
		build: {
			outDir: 'build',
		},
		plugins: [react(), svgr()],
		define: {
			'process.env.REACT_APP_BASE_URL': `"${process.env.REACT_APP_BASE_URL}"`,
		},
		server: {
			port: 3003,
		},
		css: {
			postcss: {
				config: './postcss.config.js',
			},
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'@components': path.resolve(__dirname, './src/component'),
				'@pages': path.resolve(__dirname, './src/pages'),
				'@api': path.resolve(__dirname, './src/services/api'),
			},
		},
	};
});
