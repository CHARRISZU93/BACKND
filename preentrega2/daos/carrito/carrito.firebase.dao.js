const Firebasecntr = require('../../containers/firebase.cntr');

const collection = "carrito";

class carritoFirebaseDao extends Firebasecntr {
    
    constructor(){
        super(collection)
    }
}

module.exports = carritoFirebaseDao; 