const TicketList = require("./ticket-list");


class Sockets {
    constructor(io) {
        this.io = io;
        this.ticketList = new TicketList();
        this.socketsEvents();
    }

    socketsEvents() {
        this.io.on('connection', (socket) => {
            console.log("Cliente conectado");
            socket.on('solicitar-ticket', (data, callback) => {
                const ticket = this.ticketList.crearTicket();
                callback(ticket);
            });
            socket.on('siguiente-tiket-trabajar', ({ agente, escritorio }, callback) => {
                const ticket = this.ticketList.asignarTikect(agente, escritorio);
                callback(ticket);
                this.io.emit('ticket-asignado', this.ticketList.ultimos13)
            });

        })
    }
}
module.exports = Sockets;