
// Include Plugins
import plugins  from 'gulp-load-plugins';
import yargs    from 'yargs';
import gulp     from 'gulp';
import rimraf   from 'rimraf';
import jshint from 'gulp-jshint'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import browserify from 'browserify'
import buffer from 'vinyl-buffer'
import sourcemaps from 'gulp-sourcemaps'
import babelify from 'babelify'
import source from 'vinyl-source-stream';
import commonjsWrap from 'gulp-wrap-commonjs'

gulp.task('build', ['clean', 'transpile', 'browserify', 'commonjs']);

gulp.task('clean', function(){
  return rimraf('dist', function(){});
});

// Concatenate & Minify JS
gulp.task('transpile', function() {
    return gulp.src('lib/*.js')
        .pipe(babel({
              presets: ['es2015']
          }))
        .pipe(gulp.dest('dist'));
});

gulp.task('browserify', function(){

  var options = {
        entries: "./lib/app.js",
        extensions: [".js"],
        paths: ["./js/"] // This allows relative imports in require, with './scripts/' as root
    };

    return browserify(options)
        .transform(babelify)
        .bundle()
        .pipe(source("app.min.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/browser/"));
});

gulp.task('commonjs', function(){
  return gulp.src(['lib/*.js'])
    .pipe(commonjsWrap({
      autoRequire: true
    }))
    .pipe(gulp.dest('dist/module'));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('lib/*.js', ['lint', 'scripts']);
});

// Default Task
gulp.task('default', ['build']);
