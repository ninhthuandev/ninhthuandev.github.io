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
const util = require('util');

var data = {};
var combinedData = {};

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
            } else {
                file.data = {};
            }
            file.data.currentTool = {};
            const currentDirName = getLastSegments(dirPath);
            const parentDir = dirPath.substring(0, dirPath.lastIndexOf('\\'));
            fs.readFile(parentDir + '/data.json', null, (err, parentData) => {

                if (parentData) {
                    const parentDataJson = JSON.parse(parentData);
                    parentDataJson.tools.forEach(toolData => {
                        if (toolData.href.endsWith(currentDirName)) {
                            file.data.currentTool = toolData;
                        }
                    });
                }

                callback(null, file);
            });
        });
    });
}

function getLastSegments(url) {
    const normalizedUrl = url.replace(/\\/g, '/');
    if (normalizedUrl.includes('/')) {
        const segments = normalizedUrl.split('/');
        return segments[segments.length - 1];
    } else {
        return null;
    }
}

function loadDataJsonFromDir(dirPath) {
    const dataPath = dirPath + '/data.json';
    if (fs.existsSync(dataPath)) {
        return JSON.parse(fs.readFileSync(dataPath, null));
    } else {
        return {};
    }
}

function populateHierarchyDataJson(baseDir) {
    const dirs = fs.readdirSync(baseDir);
    let combinedData = loadDataJsonFromDir(baseDir);
    combinedData?.tools?.forEach(toolData => {
        const folderName = getLastSegments(toolData.href);
        if (folderName !== null) {
            const newPath = combinedData.isRoot === true ? baseDir + '/pages/' + folderName : baseDir + '/' + folderName;
            toolData.children = populateHierarchyDataJson(newPath);
        }
    });

    return combinedData;
}

function buildEjs(cb) {
    const hierarchyData = populateHierarchyDataJson('./src');

    gulp.src(['./src/**/*.ejs', '!./src/common/ejs/*.ejs'], {base: './src'})
        .pipe(populateDataFromJsonPipe())
        .pipe(ejs({
            rootPath: process.cwd() + "/src",
            hierarchyData: hierarchyData
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

function buildCss(cb) {
    gulp.src('./src/**/*.css', {base: './src'})
        .pipe(rename(extractPagesFolder()))
        .pipe(gulp.dest('./docs'))
        .pipe(gulpConnect.reload());
    cb();

}

function watchBuild(cb) {
    gulp.watch('./src/**/*.ejs', buildEjs);
    gulp.watch('./src/**/*.js', buildJs);
    gulp.watch('./src/**/*.css', buildCss);
    cb();
}

function serve() {
    gulpConnect.server({
        root: 'docs',
        port: 5000,
        livereload: true
    });
}

function test(cb) {
    let myObject = populateHierarchyDataJson('./src');
    console.log(util.inspect(myObject, false, null, true /* enable colors */))
}

exports.buildEjs = buildEjs;
exports.buildJs = buildJs;
exports.buildCss = buildCss;
exports.watchBuild = watchBuild;
exports.test = test;
exports.serve = gulp.series(buildEjs, buildJs, buildCss, watchBuild, serve);
exports.build = gulp.series(buildEjs, buildJs);
exports.default = gulp.series(buildEjs, buildJs);