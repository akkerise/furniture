module.exports = {
    database: "furniture_dev",
    username: "postgres",
    password: "8888",
    dialect: "postgres",
    host: '127.0.0.1',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
}
