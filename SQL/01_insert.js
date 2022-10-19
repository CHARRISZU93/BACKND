const dbConfig = require('./db/config');
const knex = require('knex')(dbConfig.mySQL);

const newUser = {
    name: 'Manuel',
    lastname: 'Charris',
    age: '29',
    dni: '1010210822'
};

const multipleUsers = [
    {name:"Lucia", lastname: "Suarez", age: "57", dni:"23574164"},
    {name:"Raul", lastname: "Charris", age: "58", dni:"23574164"}
]

(async () =>{
    try {
        //entrada simple
        await knex('ejemploTabla').insert(newUser);
        console.log('user inserted')

        //entrada multiple
        await knex('ejemploTabla').insert(multipleUsers);
        console.log('user inserted')
    }
    catch (error){
        console.log(error)
    }
    finally{
        knex.destroy();
    }
}
)();

