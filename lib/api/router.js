const { Router } = require('express');
const { getDb } = require('../database/database');
const Features = require('../database/features');
const featuresKeys = require('../utils/featuresKeys');
const router = Router(); // eslint-disable-line

router.get('/features', (req, res) => Features.all().then(result => res.send(result)));

router.get('/features/keys', (req, res) => res.send(featuresKeys));

router.get('/features/aggregate/:key', (req, res) => {
    const db = getDb();
    const {
        params: {
            key,
        },
    } = req;

    return db.collection('features').aggregate([{
        $group: {
            _id: {
                [key]: `$${key}`,
            },
            count: {
                $sum: 1,
            },
        },
    }]).toArray((err, result) => res.send(result));
});

router.post('/features', (req, res) => {
    const features = new Features(req.body);

    return features.save().then(result => res.send(result));
});

module.exports = router;
