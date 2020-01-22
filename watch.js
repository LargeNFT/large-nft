var browserify = require('browserify')
var tsify = require('tsify')
var watchify = require('watchify')
var babelify = require('babelify')
var fs = require('fs')

browserify({ 
    cache: {}, 
    packageCache: {},
    standalone: "Large" 
})
    .plugin(watchify)
    .add('./src/index.ts')
    .plugin(tsify, { 
        noImplicitAny: false, 
        target: 'es2017', 
        experimentalDecorators: true
     })
    .transform(babelify, { 
        presets: ["@babel/preset-env"], 
        plugins: ["@babel/plugin-proposal-class-properties"],
        global: true,
        compact:false
    })
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(fs.createWriteStream('./www/js/large.js'))