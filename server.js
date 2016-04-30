const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongorito = require('mongorito');
const apiRouter = require('./lib/api/router');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(require('./devRouter'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use('/api', apiRouter);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'static/index.html')));

mongorito
    .connect(process.env.MONGODB_URI)
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
