const gulp = require('gulp')
const ts = require('gulp-typescript');
const sourceMaps = require('gulp-sourcemaps');
const gulpNodemon = require('gulp-nodemon');
const del = require('del');

const tsProject = ts.createProject('tsconfig.json')
const outputDir = './dist'
const sourceMask = './src/**/**'
const sourceMaskTS = `${sourceMask}.ts`
function clean() {
    return del(outputDir)
}
function build() {
    return gulp.src(sourceMaskTS)
    .pipe(sourceMaps.init({ loadMaps: true }))
    .pipe(tsProject()).js
    .pipe(sourceMaps.write('./', {
        includeContent: false,
        sourceRoot: "."
    }))
    .pipe(gulp.dest(outputDir))
}

const defaultTask = gulp.series(clean, build)

function watchTask() {
    gulp.watch(sourceMaskTS,build)
}

function botTestTask(done) {
    return gulpNodemon({
        script: `${outputDir}/bot/index.js`,
        watch: outputDir,
        delay:'1000',
        done
    })
}

function devTask(done) {
    watchTask()
    gulp.series(defaultTask,botTestTask)(done)
}

exports.watch = watchTask
exports.default = defaultTask
exports.dev = devTask
exports.botTest = botTestTask