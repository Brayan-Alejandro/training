var gulp = require('gulp');

gulp.task('first-task', function() {
  console.log('Hello world');
});

gulp.task('default', ['first-task']);
