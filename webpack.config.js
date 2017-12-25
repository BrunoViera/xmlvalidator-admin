const path = require('path');

module.exports = {
    watch: true,
    cache: true,
    entry: {
        site: './src/js/site.js',
        app: './src/js/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js')
    }
};
