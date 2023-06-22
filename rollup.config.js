// const commonjs from '@rollup/plugin-commonjs';
// import typescript from '@rollup/plugin-typescript';

// import postcss from "rollup-plugin-postcss";
// import visualizer from 'rollup-plugin-visualizer';
// import { terser } from 'rollup-plugin-terser';

// import fs from 'fs';
const wpResolve = require("rollup-plugin-wp-resolve");
const babel = require("rollup-plugin-babel");
const postcssModule = require("postcss");
const cssnanoMachines = require("cssnano");

const postcss = require('rollup-plugin-postcss');

const autoprefixer = require("autoprefixer");
const nodeResolve = require("@rollup/plugin-node-resolve");
const scss = require("rollup-plugin-scss");
const json = require("@rollup/plugin-json");
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const visualizer = require("rollup-plugin-visualizer").visualizer;
const { terser } = require("rollup-plugin-terser");
const fs = require("fs");

const getFiles = (entry, extensions = [], excludeExtensions = []) => {
  let fileNames = [];
  const dirs = fs.readdirSync(entry);

  dirs.forEach((dir) => {
    const path = `${entry}/${dir}`;

    if (fs.lstatSync(path).isDirectory()) {
      fileNames = [
        ...fileNames,
        ...getFiles(path, extensions, excludeExtensions),
      ];

      return;
    }

    if (
      !excludeExtensions.some((exclude) => dir.endsWith(exclude)) &&
      extensions.some((ext) => dir.endsWith(ext))
    ) {
      fileNames.push(path);
    }
  });

  return fileNames;
};

export default {
  input: [...getFiles("./src", [".ts", ".tsx", ".json", ".scss"])],
  output: {
    dir: "dist",

    // format that has no imports/exports
    format: "esm",
    preserveModules: true,

    sourcemap: true,
  },
  plugins: [
   
    scss({
      output: "dist/style-index.css",
      processor: () =>
        postcssModule([
          autoprefixer(),
          cssnanoMachines({
            preset: "default",
          }),
        ]),
      include: ["src/style.scss"],
    }),
    scss({
      output: "dist/index.css",
      processor: () =>
        postcssModule([
          autoprefixer(),
          cssnanoMachines({
            preset: "default",
          }),
        ]),
      include: ["src/editor.scss"],
    }),
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "dist",
    }),
    terser(),
    visualizer({
      filename: "bundle-analysis.html",
      open: true,
    }),
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    babel({
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    wpResolve(),

    postcss({
      modules: true,
      cssnano: {
        preset: "default",
      },
    })
  ],
};
