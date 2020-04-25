const gulp = require("gulp");
const { src, dest } = require("gulp");
const less = require("gulp-less");
const minifyCSS = require("gulp-csso");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");

function css() {
  return src("less/style.less")
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

function minifyImage() {
  return src("images/*")
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(gulp.dest("dist/images"));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./less/**/*.less", css);
  gulp.watch("./images/*", minifyImage);
  gulp.watch("./*.html").on("change", browserSync.reload);
}

exports.watch = watch;
