const gulp = require("gulp");
const sass = require("gulp-sass")(require('sass'));//importação composta
const sourcemaps = require("gulp-sourcemaps");
const JSmin = require("gulp-uglify");
// const ofuscar = require("gulp-obfuscate");
const imageMin = require("gulp-imagemin");
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');

function comprimeImg() {
    return gulp
        .src("src/images/**/*")
        .pipe(imageMin(""))
        .pipe(gulp.dest("dist/images"));
}

function comprimeJavaScript() {
    return gulp
        .src("src/**/*.js")
        .pipe(JSmin())
        // .pipe(ofuscar())
        .pipe(gulp.dest("dist"));
}

function compilaSass() {
    return gulp
        .src("./src/styles/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed",
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("./src/styles"));
}

function minifyHtml() {
    return gulp
        .src("src/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'));
}

function minifyCss() {
    return gulp
        .src('src/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist'));
}


// exports.default = gulp.series();
exports.default = function () {
    gulp.watch("./src/styles/*.scss", { ignoreInitial: false }, gulp.series(compilaSass))
}

exports.dist = gulp.series(minifyHtml, compilaSass, comprimeJavaScript, minifyCss, comprimeImg)
// exports.dist = function () {
//     gulp.series(minifyHtml)
//     gulp.series(compilaSass)
//     gulp.series(comprimeJavaScript)
//     gulp.series(minifyCss)
//     gulp.series(comprimeImg)
// }