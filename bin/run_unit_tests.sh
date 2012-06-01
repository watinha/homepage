#!/bin/sh
NODE=`which node`
if [ $? -ne 0 ]; then
    echo "*** no node installed... install it please..."
    exit 1
fi

if [ -z $QUNIT_URL ]; then
    QUNIT_URL=`cat $TMP_QUNIT_URL`
    if [ -z $QUNIT_URL ]; then
        QUNIT_URL="http://localhost/~willianmassamiwatanabe/homepage/test.html"
        echo "*** server url for qunit tests required (QUNIT_URL)"
        echo " - using default qunit url"
    fi
fi

echo $QUNIT_URL > $TMP_QUNIT_URL

${NODE} bin/run_js_unit.js

exit $?
