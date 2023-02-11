#!/usr/bin/env node
require('esbuild').build({
  entryPoints: ['./src/controller/index.jsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  watch: true,
  plugins: [],
  loader: {
    '.jpg': 'file',
    '.png': 'dataurl'
  },
  outfile: './dist/controller-bundle.js',
})
  .then(() => {
    console.log("Controller Build ⚡ Done");
    process.exit(0);
  })
  .catch(() => process.exit(1));
