const config = {
    CONNECTION_URI: process.env.CONNECTION_URI || 'mongodb://localhost:27017/MMM',
    JWT_SECRET: process.env.JWT_SECRET || 'test_jwt_secret'
}
module.exports = config;