#!/usr/bin/env bash


browserify -s Large -t [ babelify --presets [ @babel/preset-env ] --plugins [ @babel/plugin-proposal-class-properties ] ] -g uglifyify ./js/index.ts -p [ tsify  ] > ./www/js/large.js

rm -R -f dist
cp -R www dist
