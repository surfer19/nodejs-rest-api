
// config.js

module.exports = {
    db: {
        production: "mongodb://"+process.env.MONGODB_ADDRESS+":27017/todos",
        development: "mongodb://"+process.env.MONGODB_ADDRESS+":27017/todos",
    },
    port: process.env.PORT || 8080
};