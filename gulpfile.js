const ejs = require("gulp-ejs")
const gulp = require('gulp');
const log = require('fancy-log');
const rename = require('gulp-rename');
const htmlMin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gulpConnect = require('gulp-connect');
const path = require("path");
const through = require('through2');
const fs = require('fs');

var data = {};

function extractPagesFolder() {
    return (path) => {
        if (path.dirname.includes('pages')) {
            path.dirname = path.dirname.replace('pages\\', '');
        }
    }
}

function populateDataFromJsonPipe() {
    return through.obj((file, encoding, callback) => {
        const path = file.path;
        const dirPath = path.substring(0, path.lastIndexOf('\\'));
        fs.readFile(dirPath + '/data.json', null, (err, data) => {
            if (data) {
                file.data = JSON.parse(data);
            }

            callback(null, file);
        });
    });
}

function buildEjs(cb) {
    gulp.src(['./src/**/*.ejs', '!./src/common/ejs/*.ejs'], {base: './src'})
        .pipe(populateDataFromJsonPipe())
        .pipe(ejs({
            rootPath: process.cwd() + "/src"
        }).on('error', log))
        .pipe(rename({extname: '.html'}))
        .pipe(rename(extractPagesFolder()))
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest('./docs'))
        .pipe(gulpConnect.reload());
    cb();
}

function buildJs(cb) {
    gulp.src('./src/**/*.js', {base: './src'})
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(rename(extractPagesFolder()))
        .pipe(gulp.dest('./docs'))
        .pipe(gulpConnect.reload());
    cb();
}

function watchBuild(cb) {
    gulp.watch('./src/**/*.ejs', buildEjs);
    gulp.watch('./src/**/*.js', buildJs);

    cb();
}

function serve() {
    gulpConnect.server({
        root: 'docs',
        livereload: true
    });
}

function test(cb) {
    console.log(process.cwd());
}

exports.buildEjs = buildEjs;
exports.buildJs = buildJs;
exports.watchBuild = watchBuild;
exports.test = test;
exports.serve = gulp.series(buildEjs, buildJs, watchBuild, serve);
exports.build = gulp.series(buildEjs, buildJs);
exports.default = gulp.series(buildEjs, buildJs);