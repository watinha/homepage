#!/bin/sh
NODE=`which node`
if [ $? -ne 0 ]; then
    echo "*** no node installed... install it please..."
    exit 1
fi

if [ -z $QUNIT_URL ]; then
    QUNIT_URL=`cat $TMP_QUNIT_URL`
    if [ -z $QUNIT_URL ]; then
        echo "*** server url for qunit tests required (QUNIT_URL)"
        exit 1
    fi
else
    echo $QUNIT_URL > $TMP_QUNIT_URL
fi

${NODE} bin/run_js_unit.js

exit $?
