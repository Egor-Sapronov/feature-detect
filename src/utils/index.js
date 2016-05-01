export function calculateStats(feature) {
    const onePercent = feature.count / 100;

    return {
        top: feature.true / onePercent,
        bottom: feature.false / onePercent,
        _id: feature._id,
        count: feature.count,
    };
}
