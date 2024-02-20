class Sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
    }

    socketsEvents() {
        this.io.on('connection', (socket) => {
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