module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "iot_solar",
    dialcet: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}