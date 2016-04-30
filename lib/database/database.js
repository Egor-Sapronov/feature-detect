const mongorito = require('mongorito');

let _connection; // eslint-disable-line

function connect() {
    return mongorito.connect(process.env.MONGODB_URI).then(connection => {
        _connection = connection;

        return connection;
    });
}

function getDb() {
    return _connection;
}

module.exports = {
    connect,
    getDb,
};
