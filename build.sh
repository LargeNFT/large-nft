browserify -s Large -t [ babelify --presets [ @babel/preset-env ] --plugins [ @babel/plugin-proposal-class-properties ] ] ./src/index.ts -p [ tsify --target es2017 --experimentalDecorators ] -o ./www/js/large.js -v

rm -R -f public
cp -R www public

ipfs add public/ -r