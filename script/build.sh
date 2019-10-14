browserify -s Large -t [ babelify --presets [ @babel/preset-env ] --plugins [ @babel/plugin-proposal-class-properties ] ] ./js/index.ts -p [ tsify --target es2017 --experimentalDecorators ] -o ./www/js/large.js -v

rm -R -f dist
cp -R www dist

ipfs add dist/ -r