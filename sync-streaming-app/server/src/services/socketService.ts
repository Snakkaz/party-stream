import { Server } from 'socket.io';
import { Room } from '../models/Room';
import { User } from '../models/User';

const socketService = (server) => {
    const io = new Server(server);
    const rooms = new Map();

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('joinRoom', ({ roomId, username }) => {
            socket.join(roomId);
            const user = new User(socket.id, username);
            if (!rooms.has(roomId)) {
                rooms.set(roomId, new Room(roomId));
            }
            rooms.get(roomId).addUser(user);
            io.to(roomId).emit('userJoined', user);
            io.to(roomId).emit('updateUserList', rooms.get(roomId).getUsers());
        });

        socket.on('playVideo', (roomId) => {
            io.to(roomId).emit('videoPlayed');
        });

        socket.on('pauseVideo', (roomId) => {
            io.to(roomId).emit('videoPaused');
        });

        socket.on('syncVideo', ({ roomId, time }) => {
            io.to(roomId).emit('videoSync', time);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            rooms.forEach((room) => {
                room.removeUser(socket.id);
                io.to(room.id).emit('updateUserList', room.getUsers());
            });
        });
    });

    return io;
};

export default socketService;