// 引用gulp
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var data = require('./data/data.json');
// 压缩css
gulp.task('css', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >=4.0']
        }))
        .pipe(mincss())
        .pipe(gulp.dest('src/css'))
});
// 启服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = require('url').parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/data') {
                    res.end(JSON.stringify(data));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(require('fs').readFileSync(require('path').join(__dirname, 'src', pathname)));
                }
            }
        }))
})