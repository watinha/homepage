module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/**/*.js',
                dest: 'grunt_build/all.min.js'
            }
        },
        jasmine_nodejs: {
            options: {
                specNameSuffix: '.js',
                useHelpers: false,
                stopOnFailure: false,
                reporters: {
                    console: {
                        colors: true,
                        cleanStack: 1,
                        verbosity: 4,
                        listStyle: 'indent',
                        activity: false
                    }
                },
                customReporters: []
            },
            all: {
                specs: ['tests/acceptance/**'],
                helpers: []
            }
        },
        casperjs: {
            options: { casperjsOptions: "--url=" + process.env.HOME_URL },
            files: [ 'tests/casperjs/**' ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-blanket');
    grunt.loadNpmTasks('grunt-yslow');
    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks('grunt-casperjs');

    grunt.registerTask('default', ['uglify', 'jasmine-nodejs', 'casperjs']);
};
