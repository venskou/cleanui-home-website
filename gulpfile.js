'use strict';

/*
 * CLEAN UI TEMPLATEFAMILY GULP FILE
 */



/////////////////////////////////////////////////////////////////////////////
// GULP PLUGINS

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    ignore = require('gulp-ignore'),
    rimraf = require('gulp-rimraf'),
    browserSync = require("browser-sync"),
    wrap = require('gulp-wrap'),
    template = require('gulp-template'),
    data = require('gulp-data'),
    print = require('gulp-print'),
    replace = require('gulp-replace-task'),
    reload = browserSync.reload,
    argv = require('yargs').argv;



/////////////////////////////////////////////////////////////////////////////
// CONFIGURATION

var cleanui = {
    "version": "1.0.0",
    "templateName": "Clean UI Templates Family"
};



/////////////////////////////////////////////////////////////////////////////
// GULP PATHS

var path = {
    src: {
        sites: 'src/sites/**/*.*',
        templates: 'src/templates/**/*.*',
        templates_modules: 'src/templates-modules/**/*.*',

        img: 'src/assets/img/**/*.*',
        css: 'src/assets/css/**/*.*',
        js: 'src/assets/js/**/*.*',
        vendors_by_bower: 'src/assets/vendors/by_bower/**/*.*',
        vendors_by_hands: 'src/assets/vendors/by_hands/**/*.*'
    },
    build: {
        sites: 'dist/sites/',

        img: 'dist/assets/img/',
        css: 'dist/assets/css/',
        js: 'dist/assets/js/',
        vendors: 'dist/assets/vendors/'

    },
    clean: ['dist/*']
};



/////////////////////////////////////////////////////////////////////////////
// PRINT ERRORS

function printError(error) {
    console.log(error.toString()); // print error
    this.emit('end'); // end task
}


/////////////////////////////////////////////////////////////////////////////
// BROWSERSYNC SERVE

var config = {
    server: {
        baseDir: "./dist/", // base dir path
        directory: true // show as directory
    },
    tunnel: false, // tunnel
    host: 'localhost', // host
    port: 9000, // port
    logPrefix: "frontend", // console log prefix
    files: ['./dist/**/*'], // files path for changes watcher
    watchTask: true // watcher on/off
};

gulp.task('serve', function () {
    browserSync(config); // run BrowserSync
});


/////////////////////////////////////////////////////////////////////////////
// BUILD STRUCTURE

gulp.task('build:structure', function () {

    gulp.src(path.src.sites) // get sites
        .pipe(ignore.exclude('**/_head.html')) // exclude _head.html file
        .pipe(data({
            templateName: cleanui.templateName,
            cdnUrl: cleanui.cdnUrl
        })) // set variables
        .pipe(rigger()) // include component templates to generated pages
        .pipe(template()) // replace DATA variables
        .on('error', printError) // print error if found
        .pipe(gulp.dest(path.build.sites)) // copy generated pages to build folder
        .pipe(reload({stream: true})); // reload BrowserSync

});



/////////////////////////////////////////////////////////////////////////////
// VENDORS BUILD

gulp.task('build:vendors', function() {
    return gulp.src([path.src.vendors_by_bower, path.src.vendors_by_hands]) // get folders with vendors components
        .pipe(gulp.dest(path.build.vendors)); // copy to destination folder
});



/////////////////////////////////////////////////////////////////////////////
// JAVASCRIPT BUILD

gulp.task('build:js', function () {
    return gulp.src(path.src.js) // get folder with js
        .pipe(gulp.dest(path.build.js)) // copy to destination folder
        .pipe(reload({stream: true})); // reload BrowserSync
});



/////////////////////////////////////////////////////////////////////////////
// STYLES BUILD

gulp.task('build:css', function () {
    return gulp.src(path.src.css) // get folder with css
        .pipe(ignore.exclude('**/mixins.scss')) // exclude mixins.scss file
        .pipe(sass({outputStyle: 'expanded', indentWidth: 4})) // css formatting
        .on('error', printError) // print error if found
        .pipe(autoprefix({
            browsers: ['last 30 versions', '> 1%', 'ie 9'],
            cascade: true
        })) // add cross-browser prefixes
        .pipe(gulp.dest(path.build.css))  // copy sources
        .pipe(reload({stream: true})); // reload BrowserSync
});



/////////////////////////////////////////////////////////////////////////////
// IMAGES BUILD

gulp.task('build:img', function () {
    gulp.src(path.src.img, {base: path.src.modules}) // get folder with images
        .on('error', printError) // print error if found
        .pipe(gulp.dest(path.build.img)); // copy to destination folder
});



/////////////////////////////////////////////////////////////////////////////
// GLOBAL BUILD

gulp.task('build', [
    'build:structure', // run build:html task
    'build:css', // run build:css task
    'build:js', // run build:js task
    'build:img', // run build:img task
    'build:vendors' // run build:vendors task
]);



/////////////////////////////////////////////////////////////////////////////
// FILES CHANGE WATCHER

gulp.task('watch', function(){
    watch([path.src.sites, path.src.templates, path.src.templates_modules], function() { // watch sites folders
        gulp.start('build:structure'); // run build:structure task
    });
    watch([path.src.css], function() { // watch css folder
        gulp.start('build:css'); // run build:css task
    });
    watch([path.src.js], function() { // watch js folder
        gulp.start('build:js'); // run build:js task
    });
    watch([path.src.img], function() { // watch img folder
        gulp.start('build:img'); // run build:img task
    });
    watch([path.src.vendors_by_bower, path.src.vendors_by_hands], function() { // watch folder with vendors components
        gulp.start('build:vendors'); // run build:vendors task
    });
});



/////////////////////////////////////////////////////////////////////////////
// CLEAN PRODUCTION

gulp.task('clean', function () {
    return gulp.src(path.clean) // get build folder
        .pipe(rimraf()); // erase all
});



/////////////////////////////////////////////////////////////////////////////
// DEFAULT TASK

gulp.task('default', ['build', 'watch', 'serve']);

