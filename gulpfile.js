const gulp = require('gulp');

const inlineCssImages = require('./libs/gulp-css-inline-images/index.js'); // modifiche qui, (1) devo passare il file intero e non il suo contenuto
const inlineCssFonts = require('gulp-inline-assets');
const importCss = require("gulp-cssimport");
const inline = require("gulp-inline");
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const argv = require('yargs').argv;

const basePath = './../';

console.log(argv.src);

gulp.task('copy', () => {
    return gulp.src(basePath + argv.src + '/**')
      .pipe(gulp.dest('./tmp'));
});

// inlines all images in css files
gulp.task("inlineImages", () => {
	return gulp.src("./tmp/**/*.css")
		.pipe(inlineCssImages()) // tutte le immagini dei css in base 64
		.pipe(gulp.dest("./tmp"))
});

// inlines all the fonts in css files
gulp.task("inlineFonts", () => {
	return gulp.src("./tmp/**/*.css")
		.pipe(inlineCssFonts()) // font in base 64
		.pipe(gulp.dest("./tmp"))
});


gulp.task("importCss", () => {
	return gulp.src("./tmp/**/*.css")
		.pipe(importCss()) // css imports
		.pipe(gulp.dest("./tmp"))
});


gulp.task("inlineHtml", () => {
	return gulp.src('./tmp/**/*.html')
		  .pipe(inline({
		    base: '',
		    disabledTypes: ['svg'], // Only inline css files 
		  }))
		  .pipe(gulp.dest(basePath + argv.dst));
});


gulp.task('clean', () => {
    return gulp.src(['./tmp'], {read: false})
        .pipe(clean());
});


gulp.task('build', (callback) => {
  runSequence('copy',
              'inlineImages',
              'inlineFonts',
              'importCss',
              'inlineHtml',
              'clean');
});
