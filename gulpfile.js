const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const strip = require('gulp-strip-comments');
const stripDebug = require('gulp-strip-debug');
const javascriptObfuscator = require('gulp-javascript-obfuscator');


/** DEFAULT TASK */
gulp.task('default', function () {
	console.warn("\n \n ✔️ Hi, this is the deault task which is being run and define within your gulpfile.js \n \n ")
});


/** WATCH FOR CHANGES */
gulp.task('watch', function () {
	gulp.watch('src/**/*.txt', ['text']);
	gulp.watch('src/**/*.scss', ['sass']);
	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/**/*.js', ['js']);
});

/** COMBINED & TASK CHAINING */
gulp.task('combine-sass-text', ['sass', 'text']);
gulp.task('build', ['combine', 'compress']);

/** SINGLE TASKS */
/** Watch for these changes */
gulp.task('text', function() {
	gulp.src('src/**/*.txt')
		.pipe(gulp.dest('public'));
});

gulp.task('sass', function() {
	gulp.src('src/**/*.scss')
		// .pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cleanCSS())
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('public'));
});

gulp.task('html', function () {
	gulp.src('src/**/*.html')
		.pipe(gulp.dest('public'));
});

gulp.task('js', function () {
	gulp.src('src/**/*.js')
		.pipe(gulp.dest('public'));
});

gulp.task('clean', function() {
	del('public');
});

gulp.task('cleanup', function () {
	del('dist');
	del('build');
});

gulp.task('combine', function () {
	gulp.src(['src/js/lib/*.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('compress', function () {
	gulp.src(['dist/all.js',])
		.pipe(strip())
		.pipe(stripDebug())
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		// .pipe(minify())
		// .pipe(javascriptObfuscator())
		.pipe(gulp.dest('build'));
});



gulp.task('kkk', function () {
	gulp.src(['src/js/lib/*.js',])
		.pipe(strip())
		.pipe(stripDebug())
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		// .pipe(minify())
		// .pipe(javascriptObfuscator())
		.pipe(gulp.dest('kkk'));
});


// https://github.com/jaywcjlove/cookie.js
// https://github.com/marcuswestin/store.js/