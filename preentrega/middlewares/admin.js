const adminAutorizacion = (req, res, next) =>{
    let admin = true

    if(admin){
        next()
    }
    else{
        return res.status(400).json({ success: false, error: 'No autorizado' })
    }
}

module.exports = adminAutorizacion