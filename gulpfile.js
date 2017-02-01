var rootSelector = '#WIDGET';
var classPrefix = 'wdg';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var insert = require('gulp-insert');

var autoprefixer = require('autoprefixer');
var postcssNamespace = require('postcss-namespace');
var selectorNamespace = require('postcss-selector-namespace')({namespace: rootSelector });
var cssnano = require('cssnano')({sourcemap: true});

gulp.task('css', function () {
    var processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src('./src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(postcss())
        .pipe(gulp.dest('./dest'));
});

gulp.task('compile-bootstrap', function() {
    var processors = [
        autoprefixer,
        postcssNamespace,
        selectorNamespace,
        // cssnano
    ];
    return gulp.src('./bootstrap/scss/bootstrap.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(insert.prepend('@prefix ' + classPrefix + ';\n\n'))
        .pipe(insert.append('\n@prefix ;\n'))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {
  // place code for your default task here
});
