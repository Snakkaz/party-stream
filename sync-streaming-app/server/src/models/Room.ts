class Room {
    id: string;
    currentVideo: string;
    playbackState: 'playing' | 'paused' | 'stopped';
    connectedUsers: string[];

    constructor(id: string) {
        this.id = id;
        this.currentVideo = '';
        this.playbackState = 'stopped';
        this.connectedUsers = [];
    }

    addUser(userId: string) {
        if (!this.connectedUsers.includes(userId)) {
            this.connectedUsers.push(userId);
        }
    }

    removeUser(userId: string) {
        this.connectedUsers = this.connectedUsers.filter(user => user !== userId);
    }

    setCurrentVideo(videoUrl: string) {
        this.currentVideo = videoUrl;
    }

    setPlaybackState(state: 'playing' | 'paused' | 'stopped') {
        this.playbackState = state;
    }
}

export default Room;