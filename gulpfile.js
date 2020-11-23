const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const csso = require("gulp-csso");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const sync = require("browser-sync").create();
const del = require("del");
const imagemin = require("gulp-imagemin");
const livereload = require("gulp-livereload");

//Copy

const copy = () => {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/img/**",
  "source/js/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("docs"));
 };

exports.copy = copy;

// Clean

const clean = () => {
  return del("docs");
};

exports.clean = clean;

// Image optimization

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.svgo()
  ]))
};

exports.images = images;

// Html copy

const html = () => {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("docs"))
    .pipe(livereload())
};

exports.html = html;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("docs/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'docs'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

function watcher() {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  livereload.listen();
  gulp.watch("source/*.html", gulp.series("html")).on("change", sync.reload);
}

// Start

const start = gulp.series(
  clean, copy, html, styles, images, server, watcher
);

exports.start = start;