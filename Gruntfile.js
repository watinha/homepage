module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/**/*.js',
                dest: 'package/js/all.min.js'
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
        },
        cssmin: {
            target: {
                files: {
                    'package/css/all.min.css': ['css/*.css']
                }
            }
        },
        shell: {
            target: {
                command: './bin/build.sh'
            }
        },
        yslow: {
            options: {
                thresholds: {
                    weight: 180,
                    speed: 1000,
                    score: 80,
                    requests: 15
                }
            },
            pages: {
                files: [
                    { src: 'http://watinha.com' },
                    { src: 'http://wwatana.be', }
                ]
            }
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
    grunt.loadNpmTasks('grunt-shell');

    grunt.task.registerTask('tests-all', 'Running all test suites',
                            function () {
        grunt.task.run(['jshint', 'tests-unit', 'tests-acceptance']);
    });

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
    grunt.task.registerTask('build-index',
                            'Building index.html based on Mustache template',
                            function () {
        grunt.config.set('shell.target.command', 'node bin/build_index.js with_css_js > index.html');
        grunt.task.run(['shell']);
    });
    grunt.task.registerTask('build-package', 'building package for deployment',
                            ['cssmin', 'uglify', 'shell']);

    grunt.task.registerTask('deploy',
                            'deploying application',
                            function () {
        // this command is secured in some other place
        grunt.config.set('shell.target.command', './bin/deploy.sh');
        grunt.task.run(['shell']);
    });

    grunt.task.registerTask('clean', 'clean up all generated files',
                            function () {
        grunt.config.set('shell.target.command', 'rm -r package/js/*; rm package/css/*; rm package/index.html; rm package/curriculum.html; rm package/curriculum.json; rm package/favicon.ico; rm package/homepage.tar; rm index.html; rm curricullum.html;');
        grunt.task.run(['shell']);
    });
};
