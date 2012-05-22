#!/usr/bin/make
export WHICH=/usr/bin/which
export RM=/bin/rm
export QUNIT_URL
export TMP_QUNIT_URL=/tmp/qunit.tmp

tests-unit:
	@./bin/run_unit_tests.sh

help:
	@echo "****************************************************"
	@echo "***** \033[1;34mHomePage help\033[0;0m                           *****"
	@echo "****************************************************"
	@echo "    \033[32mtests-unit:\033[0m unit test for the JS code"
	@echo "    \033[32mclean:\033[0m      clean temporary files"
	@echo "\n"

clean:
	@$(RM) $(TMP_QUNIT_URL)

.PHONY: tests-unit help clean
