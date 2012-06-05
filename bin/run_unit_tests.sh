#!/bin/sh
NODE=`which node`
if [ $? -ne 0 ]; then
    echo "*** no node installed... install it please..."
    exit 1
fi

if [ -z $JASMINE_URL ]; then
    JASMINE_URL=`cat $TMP_JASMINE_URL`
    if [ -z $JASMINE_URL ]; then
        JASMINE_URL="http://localhost/~willianmassamiwatanabe/homepage/tests/unit/jasmine.html"
        echo "*** server url for jasmine tests required (JASMINE_URL)"
        echo " - using default jasmine url"
    fi
fi

echo $JASMINE_URL > $TMP_JASMINE_URL

${NODE} bin/run_js_unit.js

exit $?
