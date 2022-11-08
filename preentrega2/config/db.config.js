const firebaseConfig = require('./entrega2-578e7-firebase-adminsdk-9e0b9-877cb1f294.json');
const envConfig = require('../env/config');
const { DB_PSW } = require('../env/config');

module.exports = {
    mongodb:{
        URI: `mongodb+srv://charriszu:${envConfig.DB_PSW}@products.d8cydn4.mongodb.net/?retryWrites=true&w=majority`
    },
    firebase:{
        credentials: firebaseConfig
    }
}