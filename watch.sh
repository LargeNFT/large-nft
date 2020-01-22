trap "kill 0" EXIT

watchify --debug -s Large -t [ babelify --presets [ @babel/preset-env ] --plugins [ @babel/plugin-proposal-class-properties ]  ] ./src/index.ts -p [ tsify --target es2017 --experimentalDecorators ]  -o ./www/js/large.js -v &
watchify --debug -s LargeReader -t [ babelify --presets [ @babel/preset-env ] --plugins [ @babel/plugin-proposal-class-properties ] ] ./src/reader.ts -p [ tsify --target es2017 --experimentalDecorators ] -o ./www/js/large-reader.js -v &

wait