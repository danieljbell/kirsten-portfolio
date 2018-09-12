var gulp          = require('gulp'),
    postcss       = require('gulp-postcss'),
    sass          = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    atImport      = require('postcss-import'),
    autoprefixer  = require('autoprefixer'),
    mqpacker      = require('css-mqpacker'),
    cssnano       = require('cssnano'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    pump          = require('pump'),
    browserSync   = require('browser-sync'),
    reload        = browserSync.reload;

gulp.task('css', function () {
  var processors = [
    atImport,
    autoprefixer({browsers: ['last 6 versions']}),
    mqpacker,
    cssnano
  ];
  gulp.src('_src/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

// gulp.task('js', function() {
//   gulp.src('_src/application/application.js')
//     .pipe(gulp.dest('./js'))
//   gulp.src('node_modules/clipboard/dist/clipboard.min.js')
//     .pipe(gulp.dest('./js/libs'))
// });

gulp.task('img', () => {
  return gulp.src('./_src/img/*')
    .pipe(gulp.dest('./dist/img/'))
});


gulp.task('watch', function() {
  gulp.watch('_src/css/**/*.scss', ['css']);
  // gulp.watch('_src/**/*.js', ['js']).on('change', reload);
  gulp.watch(['_src/img/*.jpg', '_src/img/*.png', '_src/img/*.svg']).on('change', reload);
  gulp.watch('**/*.html').on('change', reload);
});


gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'localhost:4000',
        port: 3000
    });
});


gulp.task('default', ['css', 'img', 'browser-sync', 'watch']);