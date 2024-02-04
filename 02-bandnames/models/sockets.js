const BandList = require("./band-list");

class Sockets {
    constructor(io) {
        this.io = io;
        this.bandList = new BandList();
        this.socketsEvents();
    }

    socketsEvents() {
        this.io.on('connection', (socket) => {
            console.log("Cliente conectado");
            socket.emit('currend-bands', this.bandList.getBands());

            socket.on('votar-banda', (id)=>{
                this.bandList.increaseVote(id);
                this.io.emit('currend-bands', this.bandList.getBands());
            });

            socket.on('borrar-banda', (id)=>{
                this.bandList.removeBand(id);
                this.io.emit('currend-bands', this.bandList.getBands());
            });

            socket.on('cambiar-nombre-banda', ({ id, name })=>{
                this.bandList.changeName(id, name);
                this.io.emit('currend-bands', this.bandList.getBands());
            });

            socket.on('crear-banda', ({ name })=>{
                this.bandList.addBand(name);
                this.io.emit('currend-bands', this.bandList.getBands());
            });
        })
    }
}
module.exports = Sockets;