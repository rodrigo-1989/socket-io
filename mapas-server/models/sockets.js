const Marcadores = require("./marcadores");

class Sockets {
    constructor(io) {
        this.io = io;
        this.marcadores = new Marcadores();
        this.socketsEvents();
    }

    socketsEvents() {
        this.io.on('connection', (socket) => {
            console.log("Cliente conectado !!", socket);
        })
    }
}
module.exports = Sockets;