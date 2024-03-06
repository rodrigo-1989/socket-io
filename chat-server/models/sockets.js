const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../controllers/sockets");
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

            socket.join(uid);


            this.io.emit('lista-usuarios', await getUsuarios());

            socket.on('mensaje-personal',async (payload) => {
                const mensaje = await grabarMensaje(payload);
                this.io.to(payload.para).emit('mensaje-personal', mensaje);
                this.io.to(payload.de).emit('mensaje-personal', mensaje);
            });

            socket.on('disconnect', async () => {
                await usuarioDesconectado(uid);
                this.io.emit('lista-usuarios', await getUsuarios())
            });
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