#!/usr/bin/make
export WHICH=/usr/bin/which
export RM=/bin/rm
export JASMINE_URL
export TMP_JASMINE_URL=/tmp/jasmine.tmp

tests-unit:
	@./bin/run_unit_tests.sh

jslint:
	@./bin/run_jslintr.sh

help:
	@echo "****************************************************"
	@echo "***** \033[1;34mHomePage help\033[0;0m                           *****"
	@echo "****************************************************"
	@echo "    \033[32mtests-unit:\033[0m unit test for the JS code (JASMINE_URL optional parameter)"
	@echo "    \033[32mjslint:\033[0m     run js lint in the JS and test code"
	@echo "    \033[32mclean:\033[0m      clean temporary files"
	@echo "\n"

clean:
	@$(RM) $(TMP_JASMINE_URL)

.PHONY: tests-unit jslint help clean
