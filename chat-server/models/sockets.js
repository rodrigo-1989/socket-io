const { usuarioConectado, usuarioDesconectado, getUsuarios } = require("../controllers/sockets");
const { comprobarToken } = require("../helper/jwt");

class Sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents() {
        this.io.on('connection', async (socket) => {

            const [valido, uid] = comprobarToken(socket.handshake.query['x-token']);

            if (!valido) {
                console.log('Socket no identificado');
                return socket.disconnect();
            }

            await usuarioConectado(uid);

            socket.on('disconnect', async() => {
                await usuarioDesconectado(uid);
            });

            this.io.emit('lista-usuarios',await getUsuarios())

            //Validar el token
            //Saber que usuario esta activo
            //Emitir todos los usuarios conectados
            //Unirme a una sala especifica
            //Escuchar cuando el cliente manda un mensaje
            //Manejar el disconnct
            //
        });
    }
}
module.exports = Sockets;