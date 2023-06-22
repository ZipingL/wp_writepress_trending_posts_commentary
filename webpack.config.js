const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const fs = require("fs");
const copy = require("rollup-plugin-copy");
const createTranform = require("rollup-copy-transform-css").createTranform;

const glob = require("glob");

const rename = () => {
  const { join } = path;

  const blockJsonFiles = glob.sync(
    join(process.cwd(), "build", "**", "block.json")
  );

  if (blockJsonFiles) {
    blockJsonFiles.forEach((filePath) => {
      let blockJson = require(filePath);
      console.log("hi", blockJson);
      if (blockJson?.editorScript) {
        blockJson.editorScript = blockJson.editorScript.replace(".tsx", ".js");
      }

      if (blockJson?.script) {
        blockJson.script = blockJson.script.replace(".tsx", ".js");
      }

      if (blockJson?.viewScript) {
        blockJson.viewScript = blockJson.viewScript.replace(".tsx", ".js");
      }

      if (blockJson?.editorStyle) {
        blockJson.editorStyle = blockJson.editorStyle.replace(".scss", ".css");
      }

      if (blockJson?.style) {
        blockJson.style = blockJson.style.replace(".scss", ".css");
      }

      fs.writeFile(
        filePath,
        JSON.stringify(blockJson, null, 2),
        function writeJSON(error) {
          if (error) {
            return console.log(error);
          }
        }
      );
    });
  }

  const cssFiles = glob.sync(join(process.cwd(), "dist", "*.css"));

  if (cssFiles) {
    cssFiles.forEach((filePath) => {
      // copy to build
      fs.copyFile(filePath, filePath.replace("dist", "build"), (err) => {
        if (err) throw err;
        console.log("source.txt was copied to destination.txt");
      });
    });
  }
};

module.exports = (env) => {
  // copy dist/src/*.css and map to build

  return {
    ...defaultConfig,

    module: {
      ...defaultConfig.module,

      rules: [
        ...defaultConfig.module.rules,
        {
          // handle source maps
          test: /\.js$/,
          use: ["source-map-loader"],
        },
      ],
    },

    entry: {
      index: "./dist/src/index.js",
    },

    plugins: [
      ...defaultConfig.plugins,

      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap("rename", rename);
        },
      },
    ],
  };
};
