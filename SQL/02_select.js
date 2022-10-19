const dbConfig = require('./db/config');
const knex = require('knex')(dbConfig.mySQL);

(async () =>{
    try {
        const user = await knex.from('ejemploTabla').select('id', 'name', 'age')
        console.table(user)
    }
    catch (error){
        console.log(error)
    }
    finally{
        knex.destroy();
    }
}
)();

