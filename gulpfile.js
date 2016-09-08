var gulp = require('gulp'),
    util = require('gulp-util'),
    // 压缩任务
    imagemin = require('gulp-imagemin'),					// 图片压缩
	pngquant = require('imagemin-pngquant'),			    // PNG图片压缩
    // 预处理
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

    // Sass编译任务
	gulp.task('sass', function () {
		return gulp.src('./src/sass/*.sass')
			// 输出格式 + 错误输出
			.pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
			// 输出位置
			.pipe(gulp.dest('./dist/css'))
			// 添加LiveReload插件
			.pipe(connect.reload());
	});

	//Gulp sever服务器
	gulp.task('connect', function () {
	    connect.server({
            root: 'dist',
            livereload: true
	    });
	});


    // 图片压缩
    gulp.task('imagemin',function(){
		gulp.src('./src/img/*.{png,jpg,gif,ico}')
			.pipe(imagemin({
				progressive: true,
				svgPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest('./dist/img/'));
	});

    // HTML输出 / 修改路径
	gulp.task('html', function () {
	  gulp.src('./src/*.html')
		// 更改位置
		.pipe(gulp.dest('./dist/'))
	    .pipe(connect.reload());
	});

    // 监听任务
	gulp.task('watch', function() {
	    // 监听Sass文件修改，当文件被修改则执行 sass 任务
	    gulp.watch('./src/sass/*.sass', ['sass']);
        // 监听HTML文件修改，当文件被修改则执行 html 任务
	    gulp.watch('./src/*.html', ['html']);
	});

    // 默认
    gulp.task('default', ['sass','watch','imagemin'])
