const http = require('http');

const bodyParser = require('body-parser');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');
const realtime = require('./app/realtime');

const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 3000;

realtime(io);
app.use(cors());
app.use('/user', require('./routes/user'));


server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}/`);
})
