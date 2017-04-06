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