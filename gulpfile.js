const gulp = require("gulp");
const plumber = require("gulp-plumber");
const maps = require("gulp-sourcemaps");
const gulpIf = require("gulp-if");
const sass = require("gulp-sass");
const cssClean = require("gulp-clean-css");
const autoPrefixer = require("gulp-autoprefixer");

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

// watches.
function watch(done) {
    gulp.watch("./src/sass/**/*.scss", gulp.series(css));

    done();
}

// default.
if (opts.dist) {
    gulp.task("default", gulp.series(gulp.parallel(css)));
} else {
    gulp.task("default", gulp.series(gulp.parallel(css), watch));
}
