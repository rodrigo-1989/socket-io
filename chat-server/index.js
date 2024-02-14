const Server = require("./models/server");
require('dotenv').config();
const server = new Server();
server.execute();
//DB_USER=chat_user
//DB_PASS=gHBvwOOGfk6anzYc