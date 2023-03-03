#!/usr/bin/env node
const stylePlugin = require('esbuild-style-plugin');
require('esbuild').build({
  entryPoints: ['./src/game/main.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  watch: true,
  plugins: [stylePlugin()],
  loader: {
    '.jpg': 'file',
    '.png': 'dataurl'
  },
  outfile: './dist/game-bundle.js',
})
  .then(() => {
    console.log("Game Build ⚡ Done");
    process.exit(0);
  })
  .catch(() => process.exit(1));
