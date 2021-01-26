const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

function makeCss(){
  return gulp.src("main.scss")
    .pipe(sass())
    .pipe(autoprefixer({cascade:false}))
    .pipe(cleanCSS())
    .pipe(rename("minifiedCSS.css"))
    .pipe(gulp.dest(""))   
}

function watch(){
  browserSync.init({
    browser: ["chrome"],
    server: ""
  });
  gulp.watch("*.scss", makeCss);
  gulp.watch("*.scss").on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch("./js/*.js").on('change', browserSync.reload);
}
module.exports.makeCss = makeCss;
module.exports.watch = watch;