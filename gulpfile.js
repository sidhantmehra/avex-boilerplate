'use strict';
var fs = require('fs');
var path = require('path');
const { src, dest, watch, series, parallel } = require('gulp');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const changed = require('gulp-changed');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
//const scsslint = require('gulp-scss-lint');
const tildeImporter = require('node-sass-tilde-importer');

// Vendor files
// const jsFiles = [
// 	'./node_modules/jquery/dist/jquery.min.js',
// 	'./node_modules/lazysizes/lazysizes.min.js'
// ];

/**
 * Asset paths.
 */
const files = {
	mainPath: '/',
	
	imagesPath: ['src/images/**/*', '!src/images/temp/**/*'],
	
	others_scssPath: './src/scss/others/*.scss',
	templates_scssPath: './src/scss/templates/*.scss',
	critical_scssPath: './src/scss/critical.scss',
	common_scssPath: './src/scss/common.scss',
	
	others_jsPath: 'src/scripts/others/*.js',	
	templates_jsPath: 'src/scripts/templates/*.js',	
	critical_jsPath: 'src/scripts/critical.js',
	common_jsPath: 'src/scripts/common.js',

	assetsDir: './assets',
	snippetsDir: './snippets'
}


/**
 * SCSS task
 */


function scss() {
	return src(files.templates_scssPath)
        .pipe(autoprefixer({ cascade : false }))
        .pipe(rename({ suffix: ".scss", extname: ".liquid" }))
        .pipe(dest(files.assetsDir));	
}

// Critical SCSS
function critical_scss() {
	return src(files.critical_scssPath)
				// .pipe(scsslint())
				.pipe(sass({outputStyle: 'compressed', includePaths: ['./node_modules']}).on('error', sass.logError))
        .pipe(autoprefixer({ cascade : false }))
        .pipe(rename('critical-css.liquid'))
        .pipe(dest(files.snippetsDir));
}
// Common SCSS
function common_scss() {
	return src(files.common_scssPath)
				.pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ cascade : false }))
        .pipe(rename('common.scss.liquid'))
        .pipe(dest(files.assetsDir));
}



/**
 * JS task
 *
 */

function js() {
	return src(files.templates_jsPath)
				.pipe(babel({
						presets: ['@babel/preset-env']
				}))
				.pipe(rename({ suffix: ".min", extname: ".js" }))
				.pipe(uglify())
				.pipe(dest(files.assetsDir));
}

// function jsVendor() {
// 	return src(jsFiles)
// 				.pipe(babel({
// 						presets: ['@babel/preset-env']
// 				}))
// 				.pipe(concat('vendor.js'))
// 				//.pipe(dest(files.assetsDir))
// 				.pipe(rename('vendor.min.js'))
// 				.pipe(uglify())
// 				.pipe(dest(files.assetsDir));
// }

function critical_js() {
	return src(files.critical_jsPath)
				.pipe(babel({
						presets: ['@babel/preset-env']
				}))
				.pipe(concat('critical.js'))
				.pipe(uglify())
				.pipe(rename('critical-js.liquid'))
				.pipe(dest(files.snippetsDir));
}

function common_js() {
	return src(files.common_jsPath)
				.pipe(babel({
						presets: ['@babel/preset-env']
				}))
				.pipe(concat('common.js'))
				.pipe(uglify())
				.pipe(rename('common.min.js'))
				.pipe(dest(files.assetsDir));
}


/**
 * Images task
 */
function images() {
	return src(files.imagesPath)
				.pipe(changed(files.assetsDir)) // ignore unchanged files
				.pipe(dest(files.assetsDir))
}


/**
 * Watch task
 */
const watchTask = () => {
	watch(files.imagesPath, images);

	watch(files.templates_scssPath, scss);
	watch(files.critical_scssPath, critical_scss);
	watch(files.common_scssPath, common_scss);

	watch(files.templates_jsPath, js);
	watch(files.critical_jsPath, critical_js);
	watch(files.common_jsPath, common_js);
	//watch('/node_modules/*', jsVendor);
}

/**
 * Default task
 */
//exports.default = series(parallel(scss));

/**
 * Watch task
 */
exports.watch = watchTask;
