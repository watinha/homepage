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
        casperjs: {
            files: [ 'tests/casperjs/**' ]
        },
        jasmine: {
            customTemplate: {
                src: ['js/files/*.js', 'js/vendor/modernizr.js'],
                options: {
                    specs: 'tests/unit/*.js'
                }
            }
        },
        jshint: {
            all: ['js/files/*.js', 'js/init.js']
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
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.task.registerTask('tests-acceptance',
                            'Running acceptance tests via CasperJS',
                            function () {
        grunt.config.set('casperjs.options.casperjsOptions', '--url=./index.html');
        grunt.task.run(['casperjs']);
    });
    grunt.task.registerTask('tests-acceptance-package',
                            'Running acceptance tests on package via CasperJS',
                            function () {
        grunt.config.set('casperjs.options.casperjsOptions', '--url=package/index.html');
        grunt.task.run(['casperjs']);
    });
    grunt.task.registerTask('tests-unit', 'Running unit tests on PhantomJS',
                            ['jasmine']);
};
