function aggregate(collection, pipelines) {
    return new Promise((resolve, reject) => collection
                .aggregate(pipelines)
                .toArray((err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(result);
                })
            );
}

function sumTrue(feature) {
    return {
        $sum: {
            $cond: {
                if: `$${feature}`,
                then: 1,
                else: 0,
            },
        },
    };
}

function sumFalse(feature) {
    return {
        $sum: {
            $cond: {
                if: `$${feature}`,
                then: 0,
                else: 1,
            },
        },
    };
}

module.exports = {
    aggregate,
    sumTrue,
    sumFalse,
};
