var gulp = require('gulp');

var inlineCssImages = require('./libs/gulp-css-inline-images/index.js'); // modifiche qui, (1) devo passare il file intero e non il suo contenuto
var inlineCssFonts = require('gulp-inline-assets');
var importCss = require("gulp-cssimport");
var inline = require("gulp-inline");
var clean = require('gulp-clean');
var runSequence = require('run-sequence');


gulp.task('copy', function () {
    return gulp.src('./web/**')
        .pipe(gulp.dest('./web2'));
});

// inlines all images in css files
gulp.task("inlineImages", function() {
	return gulp.src("./web2/**/*.css")
		.pipe(inlineCssImages()) // tutte le immagini dei css in base 64
		.pipe(gulp.dest("./web2"))
});

// inlines all the fonts in css files
gulp.task("inlineFonts", function() {
	return gulp.src("./web2/**/*.css")
	    .pipe(inlineCssFonts()) // font in base 64
		.pipe(gulp.dest("./web2"))
});


gulp.task("importCss", function() {
	return gulp.src("./web2/**/*.css")
		.pipe(importCss()) // css imports
		.pipe(gulp.dest("./web2"))
});


gulp.task("inlineHtml", function() {
	return gulp.src('./web2/**/*.html')
		  .pipe(inline({
		    base: '',
		    disabledTypes: ['svg'], // Only inline css files 
		  }))
		  .pipe(gulp.dest('./'));
});


gulp.task('clean', function () {
    return gulp.src(['./web2'], {read: false})
        .pipe(clean());
});


gulp.task('build', function(callback) {
  runSequence('copy',
              'inlineImages',
              'inlineFonts',
              'importCss',
              'inlineHtml',
              'clean');
});
