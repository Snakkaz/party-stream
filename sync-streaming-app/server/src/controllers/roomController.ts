class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }

    createRoom(req, res) {
        const { roomName } = req.body;
        const newRoom = this.roomService.createRoom(roomName);
        res.status(201).json(newRoom);
    }

    joinRoom(req, res) {
        const { roomId, userId } = req.body;
        const room = this.roomService.joinRoom(roomId, userId);
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    }

    leaveRoom(req, res) {
        const { roomId, userId } = req.body;
        const room = this.roomService.leaveRoom(roomId, userId);
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    }

    getRoom(req, res) {
        const { roomId } = req.params;
        const room = this.roomService.getRoom(roomId);
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    }
}

export default RoomController;