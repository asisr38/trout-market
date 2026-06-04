// Tailwind CSS v4 PostCSS plugin. v4 handles imports + vendor prefixing itself,
// so no postcss-import / autoprefixer needed. Tailwind directives only live in
// app/tv2/tv2.css, so this only affects the /tv2 route — the rest of the site
// (which has no Tailwind directives) passes through untouched.
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
