var gulp = require('gulp'),
  gulpPlugins = require('gulp-load-plugins'),  
  browserSync = require('browser-sync'),
  del = require('del'),
  $ = gulpPlugins();

var appFiles = [    
      'src/game/models/custom-loader.js',
      'src/game/models/player/**/*.js',
      'src/game/models/chart/**/*.js',
      'src/game/models/ui/**/*.js',
      'src/game/states/boot.js',
      'src/game/states/load.js',
      'src/game/states/main-menu.js',
      'src/game/states/play.js',
      'src/game/main.js',
      'src/assets/charts/pumped-up-kicks.js'
    ];

var buildDirectories = [ 
      '.temporal/**',
      'src/**',
      '!src/game/**',
      '!src/assets/charts/pumped-up-kicks.js'
    ];

// Gulp task to generate a Javascript bundle file
gulp.task('build-scripts', function() { 
  // Here, we could add the required files to create bundle.js
  return gulp.src(appFiles)
    // With sourcemap, we could know the lines for source files if exist some error
    .pipe($.sourcemaps.init())
    .pipe($.concat('bundle.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.temporal/game/'));
});

// Gulp task to use a development server with Browsersync package
gulp.task('serve', ['build-scripts'], function() {
  
  browserSync({
    open: false,
    notify: false,
    logPrefix: 'Tost',
    server: {
      // Browsersync use two directories to serve files
      // .temporal directory is used to serve bundle files
      baseDir: [ '.temporal', 'src' ]
    }
  });

});

// Gulp task to generate files for deploy
gulp.task('build', [ 'clean', 'build-scripts' ], function() {
  return gulp.src(buildDirectories)
    .pipe($.if('*.html', $.htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest('build'))
    .pipe($.if('*.js', $.uglify() ))
    .pipe(gulp.dest('build'));
});

// Gulp task to delete files
gulp.task('clean', function(){
  return del([ 'build/*', '.temporal/*' ]);
});
