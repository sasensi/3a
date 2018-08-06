var gulp = require('gulp');
var del  = require('del');
var copy = require('copy');

gulp.task('build', function ()
{
    // clean /root
    console.log('clean ../public');
    return del(
        [
            '../public/*',
            '!../public/admin/**',
            '!../public/api',
        ],
        {force: true}
    )
    .then(function (paths)
    {
        console.log('cleaned');

        // copy all files from build to root
        console.log('copy files');
        return copy('build/**', '../public', function (err, file)
        {
            console.log('copied');

            // delete build
            console.log('delete tmp build');
            return del([ 'build' ], {force: true})
            .then(function (paths)
            {
                console.log('deleted');
            });
        });
    });
});
