const { Router } = require('express');
const { getDb } = require('../database/database');
const { aggregate, sumTrue, sumFalse } = require('../database/helpers');
const Features = require('../database/features');
const featuresKeys = require('../utils/featuresKeys');
const passport = require('passport');
const router = Router(); // eslint-disable-line

router.get('/features',
    passport.authenticate('bearer', { session: false }),
    (req, res) => Features.all().then(result => res.send(result)));

router.get('/features/keys',
    passport.authenticate('bearer', { session: false }),
    (req, res) => res.send(featuresKeys));

router.get('/features/stats',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        const db = getDb();

        return aggregate(db.collection('features'), [{
            $group: featuresKeys
                .reduce((acc, feature) => {
                    const featureStats = {
                        [`${feature}_true`]: sumTrue(feature),
                        [`${feature}_false`]: sumFalse(feature),
                    };
                    return Object.assign(acc, featureStats);
                }, { _id: null }),
        }])
        .then(result => result[0])
        .then(result => featuresKeys.reduce((acc, feature) => {
            const tempFeature = {
                [feature]: {
                    true: result[`${feature}_true`],
                    false: result[`${feature}_false`],
                    count: result[`${feature}_true`] + result[`${feature}_false`],
                },
            };

            return Object.assign(acc, tempFeature);
        }, {}))
        .then(result => Object.keys(result).map(item => ({
            _id: item,
            true: result[item].true,
            false: result[item].false,
            count: result[item].count,
        })))
        .then(result => res.send(result))
        .catch(error => res.send(error));
    });

router.get('/features/stats/:feature',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        const db = getDb();
        const {
            params: {
                feature,
            },
        } = req;

        return aggregate(db.collection('features'), [{
            $group: {
                _id: `${feature}`,
                true: sumTrue(feature),
                false: sumFalse(feature),
                count: {
                    $sum: 1,
                },
            },
        }])
        .then(result => result[0])
        .then(result => res.send(result))
        .catch(error => res.send(error));
    });

router.post('/features', (req, res) => {
    const features = new Features(req.body);

    return features.save().then(result => res.send(result));
});

module.exports = router;
