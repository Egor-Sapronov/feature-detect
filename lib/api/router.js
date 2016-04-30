const { Router } = require('express');
const Features = require('../database/features');
const router = Router(); // eslint-disable-line

router.get('/features', (req, res) => Features.all().then(result => res.send(result)));

router.post('/features', (req, res) => {
    const features = new Features(req.body);

    return features.save().then(result => res.send(result));
});

module.exports = router;
