#!/usr/bin/env node
const stylePlugin = require('esbuild-style-plugin');
require('esbuild').build({
  entryPoints: ['./src/controller/index.jsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  watch: true,
  plugins: [stylePlugin()],
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
