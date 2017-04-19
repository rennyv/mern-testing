var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', function(){
    return browserify('src/App.js')
        .transform('babelify', {presets: 'react'})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('static/'));
});