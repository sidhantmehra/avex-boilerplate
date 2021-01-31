"use strict";
const { src, dest, watch } = require("gulp");
const changed = require("gulp-changed");
const filter = require("gulp-filter");
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

/**
 * Asset paths.
 */
const files = {
  mainPath: "/",
  fonts: [
    "./src/fonts/*.woff",
    "./src/fonts/*.woff2",
    "./src/fonts/*.ttf",
    "!./src/fonts/*.scss",
  ],
  vendor_scssPath: "./src/scss/vendor/*.*",
  templates_scssPath: "./src/scss/templates/*.scss",
  critical_scssPath: "./src/scss/critical.scss",
  common_scssPath: "./src/scss/common.scss",

  vendor_jsPath: "src/scripts/vendor/*.js",
  templates_jsPath: "src/scripts/templates/*.js",
  critical_jsPath: "src/scripts/critical.js",
  common_jsPath: "src/scripts/common.js",

  assetsDir: "./assets",
  snippetsDir: "./snippets",
};

/**
 * SCSS task
 */

function templates_scss() {
  return src(files.templates_scssPath)
    .pipe(filter(function(a){ return a.stat && a.stat.size }))
    // .pipe(changed(dest))
    .pipe(sass({
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename({ suffix: ".min", extname: ".css" }))
    .pipe(dest(files.assetsDir));
}

// Critical SCSS
function critical_scss() {
  return (
    src(files.critical_scssPath)
      .pipe(
        sass({
          outputStyle: "compressed"
        }).on("error", sass.logError)
      )
      .pipe(autoprefixer({ cascade: false }))
      .pipe(rename("critical-css.liquid"))
      .pipe(dest(files.snippetsDir))
  );
}

// Vendor CSS + Common SCSS
function common_scss() {
  return src([files.vendor_scssPath, files.common_scssPath])
    .pipe(sass({
      outputStyle: 'compressed'
    }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(concat("common.min.css"))
    .pipe(dest(files.assetsDir));
}

// JS task
function templates_js() {
  return src(files.templates_jsPath)
    .pipe(filter(function(a){ return a.stat && a.stat.size }))
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
        
      })
    )
    .pipe(rename({ suffix: ".min", extname: ".js" }))
    .pipe(uglify())
    .pipe(dest(files.assetsDir));
}


function critical_js() {
  return src(files.critical_jsPath)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(concat("critical.js"))
    .pipe(uglify())
    .pipe(rename("critical-js.liquid"))
    .pipe(dest(files.snippetsDir));
}

// Vendor JS + Common JS
function common_js() {
  return src([files.vendor_jsPath, files.common_jsPath])
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
        ignore: [files.vendor_jsPath]
      })
    )
    .pipe(concat("common.js"))
    .pipe(uglify())
    .pipe(rename("common.min.js"))
    .pipe(dest(files.assetsDir));
}


/**
 * Fonts
 */
function fonts() {
  return src(files.fonts)
    .pipe(changed(files.assetsDir)) // ignore unchanged files
    .pipe(dest(files.assetsDir));
}

/**
 * Watch task
 */
const watchTask = () => {
  watch(files.fonts, fonts);

  watch(files.templates_scssPath, templates_scss);
  watch(files.critical_scssPath, critical_scss);
  watch(files.common_scssPath, common_scss);
  watch(files.vendor_scssPath, common_scss);

  watch(files.templates_jsPath, templates_js);
  watch(files.critical_jsPath, critical_js);
  watch(files.common_jsPath, common_js);
  watch(files.vendor_jsPath, common_js);
};

/**
 * Default task
 */
//exports.default = series(parallel(scss));

/**
 * Watch task
 */
exports.watch = watchTask;
