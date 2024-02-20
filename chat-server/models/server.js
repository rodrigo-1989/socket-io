const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Conectar a DB
        dbConnection();

        this.server = http.createServer(this.app);
        this.io = socketio(this.server);
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    middleware() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors());

        this,this.app.use( express.json() )
        this.app.use( '/api/login', require('../router/auth') );
        this.app.use( '/api/mensajes', require('../router/mensajes') );
    }

    execute() {
        this.middleware();
        this.configurarSockets();
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        })
    }
}

module.exports = Server

//brew services start mongodb-community@7.0