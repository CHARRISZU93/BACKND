const dbConfig = require('./db/config');
const knex = require('knex')(dbConfig.mySQL);

(async () =>{
    try {
        const user = await knex.from('ejemploTabla')
        .select('id', 'name', 'age')
        .where({age: 29})
        .andwhere({name: manuel})
        console.table(user)

        const users = await knex.from('ejemploTabla')
        .select('id', 'name', 'age')
        .where('age', 'in', [29, 58]);
        console.table(users)
    }
    catch (error){
        console.log(error)
    }
    finally{
        knex.destroy();
    }
}
)();

