const { Router } = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const compiler = webpack(config);
const router = Router(); // eslint-disable-line

router.use(require('webpack-dev-middleware')(compiler, { // eslint-disable-line
    noInfo: true,
    publicPath: config.output.publicPath,
}));

router.use(require('webpack-hot-middleware')(compiler)); // eslint-disable-line

module.exports = router;
