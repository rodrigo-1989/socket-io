const jwt = require('jsonwebtoken');

const generarToken = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar token')
            } else {
                resolve(token);
            }
        })

    })
}

const comprobarToken = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false]
    }
}

module.exports = { generarToken, comprobarToken }