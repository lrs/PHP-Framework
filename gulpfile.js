const gulp = require("gulp");
const plumber = require("gulp-plumber");
const maps = require("gulp-sourcemaps");
const gulpIf = require("gulp-if");
const sass = require("gulp-sass")(require('sass'));
const cssClean = require("gulp-clean-css");
const autoPrefixer = require("gulp-autoprefixer");
const source = require('vinyl-source-stream');

const browserify = require('browserify');
const tinyify = require('tinyify');
const tsify = require('tsify');

const onError = require("./src/gulp/error");
const opts = require("./src/gulp/options");

// Preprocess and optionally minimize ./src/sass/theme.scss -> ./public/assets/css.
function css() {
    return gulp
        .src("./src/sass/theme.scss")
        .pipe(plumber({ errorHandler: onError }))
        .pipe(gulpIf(!opts.dist, maps.init()))
        .pipe(sass(opts.sass))
        .pipe(autoPrefixer(opts.autoPrefix))
        .pipe(gulpIf(opts.dist, cssClean(opts.cssClean), maps.write("../maps")))
        .pipe(gulp.dest("./public/assets/css/"));
}
// Typescript.
function themeScript() {
    return browserify({
        debug: !opts.dist,
        entries: './src/ts/utils/index.ts',
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .plugin(tinyify)
        .bundle()
        .on('error', onError) // Browserify method 'on' to handle bundle errors.
        .pipe(plumber({ errorHandler: onError }))
        .pipe(source('theme.js'))
        .pipe(gulp.dest("./public/assets/js"));
}

// watches.
function watch(done) {
    gulp.watch("./src/sass/**/*.scss", gulp.series(css));

    gulp.watch('./src/ts/utils/**/*.*', gulp.series(themeScript));
    done();
}

// default.
if (opts.dist) {
    gulp.task(
        "default",
        gulp.series(
            gulp.parallel(css, themeScript)
        )
    );
} else {
    gulp.task(
        "default",
        gulp.series(
            gulp.parallel(css, themeScript),
            watch
        )
    );
}
