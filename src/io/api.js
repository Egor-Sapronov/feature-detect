function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function parseJSON(response) {
    return response.json();
}

export function getFeaturesKeys() {
    return fetch(`${process.env.API_HOST}api/features/keys`)
        .then(checkStatus)
        .then(parseJSON);
}

export function getFeaturesStat(feature) {
    return fetch(`${process.env.API_HOST}api/features/aggregate/${feature}`)
        .then(checkStatus)
        .then(parseJSON);
}
