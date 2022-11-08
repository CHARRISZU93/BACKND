const dotenv = require('dotenv')

dotenv.config()

module.exports= {
    DB_PSW: process.env.DB_PSW,
    DATASOURCE: process.env.DATASOURCE
}