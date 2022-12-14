import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// import envCompatible from 'vite-plugin-env-compatible';
import macros from 'vite-plugin-babel-macros';
import windiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [macros(), windiCSS(), svgr(), react()]
});
