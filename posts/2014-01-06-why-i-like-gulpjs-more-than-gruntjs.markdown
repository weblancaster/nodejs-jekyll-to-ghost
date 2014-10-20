---
layout: post
title: Why I like GulpJS more than GruntJS

excerpt: 2013 was the year of GruntJS (I have a post about it) but beginning of 2014 a new cool kid on the block show up..
---

2013 was the year of GruntJS (I have a post about it) but beginning of 2014 a new cool kid on the block show up

This post is just an FYI instead of a tutorial and for those that don't know GruntJS please take a look here <a href="http://www.bymichaellancaster.com/blog/introduction-to-task-runner-gruntjs/" target="_blank" title="GruntJS">GruntJS post</a>.

When I saw GulpJS at first I said just another task runner.. but then I read the code to see how it works and I got very excited. Why?
First because uses Streams (Streams is an very important part of NodeJS) which makes faster than GruntJS.. second because if you have been writing NodeJs applications you can notice that GruntJS isn't very let's say "pretty" (but works great) but on the other hand GulpJS is like write an NodeJS application making very very easy to "install" and use. I loved.

Here's how a GruntJS file looks like <a href="https://github.com/weblancaster/blog-examples/blob/master/GruntJS-app" target="_blank" title="GruntJS">GruntJS code example</a> and here how <a href="https://github.com/weblancaster/blog-examples/tree/master/gulpjs-example" target="_blank" title="GulpJS">GulpJS code example </a> looks like

Check out the <a href="https://gulpjs.com" target="_blank" title="GulpJS website"> GulpJS website </a> for more information.

<pre><code data-language="javascript">
// Require modules
var gulp = require('gulp')
    , uglify = require('gulp-uglify')
    , minifyHTML = require('gulp-minify-html')
    , sass = require('gulp-sass');

// Here's the tasks
gulp.task('build', function(){
    var dist = 'dist/'
        , dirPublic = 'public/'
        , distStylesheets = dist + dirPublic + 'stylesheets/'
        , distJavascripts = dist + dirPublic + 'javascripts/';

    gulp.src('public/stylesheets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(distStylesheets));

    gulp.src('*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest(dist))

    gulp.src('public/javascripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(distJavascripts))
});

// Gulp watch for file changes
gulp.task('default', function() {
    gulp.watch([
        'public/stylesheets/scss/**',
        'public/javascripts/*.js',
        '*.html',
        '!dist/**'
    ], function(event) {
        gulp.run('build');
    });
});
</code></pre>

Cheers!