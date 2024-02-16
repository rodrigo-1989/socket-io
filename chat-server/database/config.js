const mongoose = require('mongoose');
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_DB);
        console.log('DB en linea');
    } catch(error) {
        console.log("JEFASO",error);
        throw new Error('Error en la base de datos ver logs');
    }
}

module.exports = {
    dbConnection
}