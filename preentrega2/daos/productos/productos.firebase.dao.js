const Firebasecntr = require('../../containers/firebase.cntr');

const collection = "productos";

class productosFirebaseDao extends Firebasecntr {
    
    constructor(){
        super(collection)
    }
}

module.exports = productosFirebaseDao; 