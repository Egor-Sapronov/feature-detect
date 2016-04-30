import 'feature.js';

fetch(`${process.env.API_HOST}api/features`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(window.feature),
});
