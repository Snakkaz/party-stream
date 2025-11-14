import { Server } from 'socket.io';
import { Room } from '../models/Room';

const rooms: Map<string, Room> = new Map();

export const syncVideo = (io: Server) => {
    io.on('connection', (socket) => {
        socket.on('joinRoom', (roomId: string) => {
            socket.join(roomId);
            if (!rooms.has(roomId)) {
                rooms.set(roomId, new Room(roomId));
            }
            const room = rooms.get(roomId);
            io.to(roomId).emit('roomData', {
                users: room.getUsers(),
                currentVideo: room.currentVideo,
                playbackState: room.playbackState,
            });
        });

        socket.on('playVideo', (roomId: string) => {
            const room = rooms.get(roomId);
            room.play();
            io.to(roomId).emit('videoPlayed', room.currentVideo);
        });

        socket.on('pauseVideo', (roomId: string) => {
            const room = rooms.get(roomId);
            room.pause();
            io.to(roomId).emit('videoPaused', room.currentVideo);
        });

        socket.on('syncPlayback', (roomId: string, time: number) => {
            const room = rooms.get(roomId);
            room.syncPlayback(time);
            io.to(roomId).emit('playbackSynced', time);
        });

        socket.on('disconnect', () => {
            rooms.forEach((room, roomId) => {
                room.removeUser(socket.id);
                if (room.isEmpty()) {
                    rooms.delete(roomId);
                }
            });
        });
    });
};