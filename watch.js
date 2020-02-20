var browserify = require('browserify')
var tsify = require('tsify')
var watchify = require('watchify')
var babelify = require('babelify')
var fs = require('fs')
var realpathify = require('realpathify')


let b = browserify({
    cache: {},
    packageCache: {},
    standalone: "Large"
})

b.plugin(watchify)
b.plugin(realpathify)
b.add('./src/index.ts')
b.plugin(tsify)
b.transform(babelify, {
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-proposal-class-properties"]

})

b.on('log', function(msg) {
    console.log(msg)
})

b.on('update', bundle)
bundle()

function bundle() {
    // console.log("Bundling large.js")
    b.bundle()
        .on('error', console.error)
        .pipe(fs.createWriteStream('./www/js/large.js'))

}


let b2 = browserify({
    cache: {},
    packageCache: {},
    standalone: "LargeReader"
})

b2.plugin(watchify)
b2.plugin(realpathify)
b2.add('./src/reader.ts')
b2.plugin(tsify)
b2.transform(babelify, {
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-proposal-class-properties"]
})

b2.on('log', function(msg) {
    console.log(msg)
})

b2.on('update', bundleReader)
bundleReader()


function bundleReader() {
    // console.log("Bundling large-reader.js")
    b2.bundle()
        .on('error', console.error)
        .pipe(fs.createWriteStream('./www/js/large-reader.js'))

}