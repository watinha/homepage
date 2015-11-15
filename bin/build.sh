#!/bin/sh

copy_index(){
    echo "\033[1;34mCopy index.html\033[0;0m::"
    cp index.html package/index.html
    echo "  copy index.html....... \033[32mOK.\033[0m"
    echo "\033[1;34mCopy curriculum.html\033[0;0m::"
    cp curriculum.html package/curriculum.html
    echo "  copy curriculum.html....... \033[32mOK.\033[0m"
}

replace_script_tags(){
    TMP_INDEX_WITH_ONE_SCRIPT="package/index.tmp.html"
    TMP_INDEX_WITH_NO_SCRIPT="package/index.tmp2.html"
    echo "\033[1;34mReplace script and link tags in index.html\033[0;0m::"
    # removes all scripts from file except init
    cat package/index.html | sed "s/<script .* src=\"js\/files\/.*\.js\"><\/script>//" > $TMP_INDEX_WITH_ONE_SCRIPT
    echo "  removes all script tags....... \033[32mOK.\033[0m"
    # replaces init with all.min.js
    cat $TMP_INDEX_WITH_ONE_SCRIPT | sed "s/<script .* src=\"js\/init\.js\"><\/script>/<script type=\"text\/javascript\" charset=\"utf-8\" src=\"js\/all.min.js\"><\/script>/" > $TMP_INDEX_WITH_NO_SCRIPT
    echo "  include all.min.js tag....... \033[32mOK.\033[0m"
    cp $TMP_INDEX_WITH_NO_SCRIPT package/index.html
    rm $TMP_INDEX_WITH_ONE_SCRIPT $TMP_INDEX_WITH_NO_SCRIPT
}

replace_link_tags(){
    TMP_INDEX_WITH_ONE_LINK="package/index.tmp.html"
    TMP_INDEX_WITH_NO_LINK="package/index.tmp2.html"

    # removes all link and replace it with a single css file
    cat package/index.html | sed "s/<link .* href=\"css\/files.*\.css\".* \/>//" > $TMP_INDEX_WITH_ONE_LINK
    cat package/index.html | sed "s/<link .* href=\"css\/reset_m\.css\".* \/>//" > $TMP_INDEX_WITH_ONE_LINK
    cat $TMP_INDEX_WITH_ONE_LINK | sed "s/<link .* href=\"css\/reset\.css\".* \/>/<link rel=\"stylesheet\" href=\"css\/all\.min\.css\" type=\"text\/css\" charset=\"utf-8\" \/>/" > $TMP_INDEX_WITH_NO_LINK
    echo "  replaces css files (reset.css files.css files_mobile.css)....... \033[32mOK.\033[0m"
    cp $TMP_INDEX_WITH_NO_LINK package/index.html
    rm $TMP_INDEX_WITH_ONE_LINK $TMP_INDEX_WITH_NO_LINK
}

copy_favicon(){
    cp favicon.ico package/favicon.ico
}

copy_images() {
    echo "  copy images/logos.png ....... \033[32mOK.\033[0m"
    cp images/logos.png package/images/logos.png
}

copy_vendor(){
    cp -r js/vendor package/js/vendor
}

copy_index
copy_images
replace_script_tags
replace_link_tags
copy_favicon
copy_vendor
