watinha.com homepage
====================
This is a simple HTML, CSS and JS homepage that is to be put in watinha.com domain.
Later we can talk about making it a little more dinamically and self updating :)

Testing alternatives
--------------------

### Unit tests
Uses [Jasmine](http://pivotal.github.com/jasmine/) to run the unit tests in JavaScript. And colects that data via [Zombie](http://zombie.labnotes.org/) in the command-line. In order to run this command, execute:
    make tests-unit [JASMINE_URL=<URL_/tests/unit/jasmine.html>] [HOME_URL=<URL_IN_WHICH_THE_PROJECT_IS_DEPLOYED>]

### Acceptance tests
Similarly to the unit-tests (it might sound ackward but it works), we use [Zombie](http://zombie.labnotes.org/) and [Jasmine](http://pivotal.github.com/jasmine/) to make test assertions and generate the tests report in the command line. In order to run this command, execute:
    make tests-acceptance [HOME_URL=<URL_IN_WHICH_THE_PROJECT_IS_DEPLOYED>]

### JSLint
In this project, we use [JSLintr](http://github.com/ccoria/JSLintr) which is a command line tool that runs on V8 to evalute the JavaScript code against the [JSLint](http://www.jslint.com/). In order to run this command, execute:
    make jslint

### RUN all tests
You can run all unit-tests, acceptance-tests and JSLint with the following command:
    make tests-all

### build-index
Builds index.html file and curriculum.html file from JSON data and [Mustache](http://mustache.github.com/) templates. It uses NodeJS to generate the webpages statically hosted from the same data, helping in keeping consistency between different data presentations.
* *index.html*: is the main webpage entry point with all JavaScript and CSS.
* *curriculum.html*: is a simplier presentation file, which can be used to print the curriculum.

### build-package
This little make command copy the essential files (files to be put in production) to the packages folder of the project. In that folder, the command looks for CSS and JavaScript files that are inserted in the index.html file of the application. It removes all external CSS and JS files and replaces them with a single version of the files that contains all que source code compressed, using [YUI Compressor](http://developer.yahoo.com/yui/compressor/). Since there might be some problems with the CSS and JS files generated, we can optionally run the acceptance tests against the package created with the following command:
    make tests-acceptance

### deploy
There is also some space left for the deploy command. Which is a secret file for the moment :)

### Contact me
watanabe_willian@yahoo.com
