const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./lib/database/database');
const apiRouter = require('./lib/router/api');
const authRouter = require('./lib/router/auth');
const swig = require('swig');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(require('./devRouter')); // eslint-disable-line
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use('/api', apiRouter);
app.use('/', authRouter);

app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'static/landing.html')));

app.get('/elm', (req, res) => res.sendFile(path.join(__dirname, 'static/elm.html')));

app.get('*', (req, res) => {
    if (req.isAuthenticated()) {
        return res.send(swig.renderFile(path.join(__dirname, 'static/index.html'), {
            token: req.user.attributes.token,
        }));
    }

    return res.redirect('/home');
});

database
    .connect()
    .then(() => {
        console.log('DB started'); // eslint-disable-line

        app.listen(process.env.PORT, err => {
            if (err) {
                console.log(err); // eslint-disable-line
                return;
            }

            console.log('Listening at http://localhost:3000'); // eslint-disable-line
        });
    })
    .catch(error => console.log(error)); // eslint-disable-line
