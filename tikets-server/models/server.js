const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            }
        });
        this.sockets = new Sockets(this.io);
    }

    // configurarSockets() {
    //     new Sockets(this.io);
    // }

    middleware() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors());
        this.app.get('/ultimos', (req, res) => {
            res.json({ ok: true, ultimos: this.sockets.ticketList.ultimos13 })
        });
    }

    execute() {
        this.middleware();
        // this.configurarSockets();
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        })
    }
}

module.exports = Server