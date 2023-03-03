#!/usr/bin/env node
const stylePlugin = require('esbuild-style-plugin');
require('esbuild').build({
  entryPoints: ['./src/webApp/index.jsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  watch: true,
  plugins: [stylePlugin()],
  loader: {
    '.jpg': 'file',
    '.png': 'dataurl'
  },
  outfile: './dist/webapp-bundle.js',
})
  .then(() => {
    console.log("Web App Build ⚡ Done");
    process.exit(0);
  })
  .catch(() => process.exit(1));
