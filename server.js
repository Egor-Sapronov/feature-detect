const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const bodyParser = require('body-parser');
const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const compiler = webpack(config);

if (!isProduction) {
    app.use(require('webpack-dev-middleware')(compiler, { // eslint-disable-line
        noInfo: true,
        publicPath: config.output.publicPath,
    }));

    app.use(require('webpack-hot-middleware')(compiler)); // eslint-disable-line
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.post('/detector', (req, res) => res.send(req.body));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'static/index.html')));

app.listen(3000, err => {
    if (err) {
        console.log(err); // eslint-disable-line
        return;
    }

    console.log('Listening at http://localhost:3000'); // eslint-disable-line
});
