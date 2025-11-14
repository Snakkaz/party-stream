import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Adjust the URL as needed

export const joinRoom = (roomId: string) => {
    socket.emit('joinRoom', roomId);
};

export const leaveRoom = (roomId: string) => {
    socket.emit('leaveRoom', roomId);
};

export const sendMessage = (roomId: string, message: string) => {
    socket.emit('sendMessage', { roomId, message });
};

export const onMessageReceived = (callback: (message: string) => void) => {
    socket.on('messageReceived', callback);
};

export const syncVideo = (roomId: string, action: string, time: number) => {
    socket.emit('syncVideo', { roomId, action, time });
};

export const onVideoSync = (callback: (data: { action: string; time: number }) => void) => {
    socket.on('videoSync', callback);
};