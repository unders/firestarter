const path = require('path');
const ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = {
    entry: './public/assets/js/bundle.js',
    output: {
        path: path.resolve('./dist/assets/js'),
        filename: 'bundle.js'
    },
    plugins: [
        new ClosureCompilerPlugin({
            compiler: {
                language_in: 'ECMASCRIPT5_STRICT', // 'ECMASCRIPT6',
                language_out: 'ECMASCRIPT5_STRICT',
                compilation_level: 'ADVANCED', // WHITESPACE_ONLY, SIMPLE, ADVANCED (default: SIMPLE)
                warning_level: 'verbose',
                externs: './src/closure_externs.js',
                isolation_mode: 'NONE' // NONE | IIFE  (default: NONE)
            },
            concurrency: 3
        })
    ]
};
