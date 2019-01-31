#!/usr/bin/env bash


browserify -s Large -t [ babelify --presets [ @babel/preset-env ] --plugins [ @babel/plugin-proposal-class-properties ] ] -g uglifyify ./js/index.js > ./www/js/large.js

rm -R -f dist
cp -R www dist
