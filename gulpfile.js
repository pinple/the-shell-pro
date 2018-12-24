var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('scss',function(){
    gulp.src('./assets/scss/*.scss')  //这里是scss文件的目录
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('./assets/css'));  //这里是编译后css存放的目录
})

gulp.task('default',function(){
    gulp.watch('./assets/scss/*.scss',['scss']);  //在这里执行文件观察任务，发现变化执行上面定义好的 `scss`编译任务。
})