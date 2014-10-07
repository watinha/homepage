#!/bin/sh
NODE=`which node`
if [ $? -ne 0 ]; then
    echo "*** no node installed... install it please..."
    exit 1
fi

JASMINE_URL=file://`pwd`/tests/unit/jasmine.html
echo "*** server url for jasmine tests required (JASMINE_URL)"
echo " - using default jasmine url"
echo $JASMINE_URL

${NODE} bin/run_js_unit.js

exit $?
