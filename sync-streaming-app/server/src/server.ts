import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import routes from './routes/index';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(routes);

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle socket events here

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});