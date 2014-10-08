#!/usr/bin/make
export WHICH=/usr/bin/which
export RM=/bin/rm
export JASMINE_URL
export HOME_URL=file://`pwd`
export TMP_JASMINE_URL=/tmp/jasmine.tmp
export WITH_CSS_JS="true"

tests-unit:
	@./bin/run_unit_tests.sh

tests-acceptance:
	HOME_URL=$(HOME_URL) jasmine-node tests/acceptance --matchall

tests-all: tests-unit tests-acceptance jslint

jslint:
	@./bin/run_jslintr.sh

build-package:
	./bin/build.sh

build-index:
	./bin/build_index.js > curriculum.html # for the static curriculum with no CSS or JS
	./bin/build_index.js > index.html # for the dynamic curriculum with CSS or JS
	#./bin/build_index.js dynamic_on > index.html # for the dynamic curriculum with CSS or JS

deploy:
	@if [ -e "bin/deploy.sh" ]; then ./bin/deploy.sh; else echo "\033[32msecret deploy.sh file :)\033[0m"; fi

tests-acceptance-package:
	HOME_URL=$(HOME_URL)package/ jasmine-node tests/acceptance --matchall

yslow:
	@echo ""
	@echo "running against \033[1;34mwatinha.com\033[0;0m"
	phantomjs bin/yslow.js -i grade -f plain http://watinha.com
	@echo ""
	@echo "running against \033[1;34mwwatana.be\033[0;0m"
	phantomjs bin/yslow.js -i grade -f plain http://wwatana.be

yslow-verbose:
	phantomjs bin/yslow.js -i all -f plain http://watinha.com

help:
	@echo "****************************************************"
	@echo "***** \033[1;34mHomePage help\033[0;0m                           *****"
	@echo "****************************************************"
	@echo "    \033[32mtests-unit:\033[0m       unit test for the JS code (JASMINE_URL optional parameter)"
	@echo "    \033[32mtests-acceptance:\033[0m acceptance test (HOME_URL optional parameter)"
	@echo "    \033[32mtests-all:\033[0m        run all tests-unit, tests-acceptance and jslint"
	@echo "    \033[32mjslint:\033[0m           run js lint in the JS and test code"
	@echo "    \033[32mbuild-index:\033[0m    build \"index.html\" file from json data and mustache template"
	@echo "    \033[32mbuild-package:\033[0m    build \"package\" with compressed css and js files"
	@echo "    \033[32mtests-acceptance-package:\033[0m acceptance test (HOME_URL optional parameter)"
	@echo "    \033[32mclean:\033[0m            clean temporary files"
	@echo "\n"

clean:
	-$(RM) $(TMP_JASMINE_URL)
	-$(RM) -r package/js/*
	-$(RM) package/css/*
	-$(RM) package/index.html
	-$(RM) package/curriculum.html
	-$(RM) package/curriculum.json
	-$(RM) package/favicon.ico
	-$(RM) package/homepage.tar
	-$(RM) index.html
	-$(RM) curricullum.html

.PHONY: tests-unit jslint help clean tests-acceptance tests-all build-index build-package deploy yslow
