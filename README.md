watinha.com/wwatana.be homepage [![Travis-CI build information](https://travis-ci.org/watinha/homepage.svg?branch=master)](https://travis-ci.org/watinha/homepage)
====================
This is a simple HTML, CSS and JS homepage that is to be put in watinha.com and wwatana.be domains.
The project is build using [Grunt.js](http://gruntjs.com/) among with a set of plugins. It uses
[Jasmine](http://pivotal.github.com/jasmine/), [Phantom.js](http://phantomjs.org/), [Casper.js](http://casperjs.org/),
[JSLint](http://www.jslint.com/) to test and run static analysis of JavaScript source code. Check the
Gruntfile for more information on those.

Strange build options
---------------------

### build-index build option
Builds index.html file and curriculum.html file from JSON data and [Mustache](http://mustache.github.com/) templates. It uses NodeJS to generate the webpages statically hosted from the same data, helping in keeping consistency between different data presentations.
* *index.html*: is the main webpage entry point with all JavaScript and CSS.
* *curriculum.html*: is a simplier presentation file, which can be used to print the curriculum.

### build-package build option
This little make command copy the essential files (files to be put in production) to the packages folder of the project. In that folder, the command looks for CSS and JavaScript files that are inserted in the index.html file of the application. It removes all external CSS and JS files and replaces them with a single version of the files that contains all que source code compressed. Since there might be some problems with the CSS and JS files generated, we can optionally run the acceptance tests against the package created with the following command:
    grunt tests-acceptance-package

### yslow build option
This make rule runs a performance test, based on [yslow](http://yslow.org/) agains the production environment of the application. For the command-line, it is used the [PhantomJS](http://www.phantomjs.org/) version of the [yslow](https://github.com/marcelduran/yslow/wiki/PhantomJS) in order to make the assertions from the command line, no browser interfaces need to make available.

### deploy build option
There is also some space left for the deploy command. Which is a secret file for the moment :)

### Contact
watanabe_willian@yahoo.com
