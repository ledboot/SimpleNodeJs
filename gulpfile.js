var gulp = require('gulp'),
	browserSync = require('browser-sync');

//start the server 
gulp.task('browser-sync',function(){
	browerSync({
		server:{
			baseDir:"./SimpleNodeJs"
		}
	});
});

gulp.task('refBowerComponents',function(){
	gulp.src('./bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('./public/libs/'));
	gulp.src('./bower_components/bootstrap/dist/js/bootstrap.min.js').pipe(gulp.dest('./public/libs/bootstrap/js'));
	gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('./public/libs/bootstrap/css'));
	gulp.src('./bower_components/normalize-css/normalize.css').pipe(gulp.dest('./public/libs/'));
	gulp.src('./bower_components/font-awesome/fonts/*').pipe(gulp.dest('./public/libs/font-awesome/fonts'));
	gulp.src('./bower_components/font-awesome/css/font-awesome.min.css').pipe(gulp.dest('./public/libs/font-awesome/css'));
	gulp.src('./bower_components/Swiper/dist/css/swiper.min.css').pipe(gulp.dest('./public/libs/swiper/css'));
	gulp.src('./bower_components/Swiper/dist/js/swiper.min.js').pipe(gulp.dest('./public/libs/swiper/js'));
	gulp.src('./bower_components/Swiper/dist/js/swiper.jquery.min.js').pipe(gulp.dest('./public/libs/swiper/js'));
});

gulp.task('bs-reload',function(){
	browserSync.reload();
});



var files =[
	'./SimpleNodeJs/public/libs/**/*.*'
];

gulp.task('default',['refBowerComponents'],function(){
	gulp.watch(files,['bs-reload'],function(event){
		console.log('File'+event.path+' was '+event.type+',running tasks..');
	});
});


