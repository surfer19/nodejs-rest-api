<<<<<<< HEAD
// config.js

module.exports = {
    db: {
        production: "mongodb://"+process.env.MONGODB_ADDRESS+":27017/my_db",
        development: "mongodb://"+process.env.MONGODB_ADDRESS+":27017/my_db",
    },
    port: process.env.PORT || 8080
    // env: process.env.NODE_ENV || 'development',

    // base_url: process.env.BASE_URL || 'http://localhost:3000'
};
=======
'use strict'

module.exports = {
    name: 'API',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
    db: {
        uri: 'mongodb://127.0.0.1:27017/my_api',
    },
}
>>>>>>> 4bb2f512ec82f9a9d7496cdacf481ca62b180b8c
