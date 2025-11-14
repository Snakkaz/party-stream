const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB
});

// Sørg for at mapper finnes
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Room data - holder styr på hver room
const rooms = {};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/uploads/:filename', (req, res) => {
  const file = path.join(__dirname, 'uploads', req.params.filename);
  res.sendFile(file);
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Ingen fil opplastet' });
  }
  
  res.json({
    success: true,
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`
  });
});

// Socket.io - Real-time synkronisering
io.on('connection', (socket) => {
  console.log(`✓ Ny bruker tilkoblet: ${socket.id}`);

  // Bruker kopler til en room
  socket.on('join_room', (data) => {
    const { roomId, username } = data;
    
    socket.join(roomId);
    
    if (!rooms[roomId]) {
      rooms[roomId] = {
        currentVideo: null,
        isPlaying: false,
        currentTime: 0,
        users: []
      };
    }

    rooms[roomId].users.push({
      id: socket.id,
      username: username
    });

    // Si ifra til andre at ny bruker har blitt med
    io.to(roomId).emit('user_joined', {
      username: username,
      usersInRoom: rooms[roomId].users.length,
      roomState: rooms[roomId]
    });

    // Send gjeldende state til ny bruker
    if (rooms[roomId].currentVideo) {
      socket.emit('video_changed', {
        videoUrl: rooms[roomId].currentVideo.url,
        videoTitle: rooms[roomId].currentVideo.title,
        currentTime: rooms[roomId].currentTime
      });

      if (rooms[roomId].isPlaying) {
        socket.emit('play_video', {
          timestamp: Date.now()
        });
      }
    }

    console.log(`✓ ${username} koblet til room: ${roomId} (${rooms[roomId].users.length} brukere)`);
  });

  // Når video lastes opp eller endres
  socket.on('video_loaded', (data) => {
    const { roomId, videoUrl, videoTitle } = data;
    
    if (rooms[roomId]) {
      rooms[roomId].currentVideo = {
        url: videoUrl,
        title: videoTitle
      };
      rooms[roomId].currentTime = 0;
      rooms[roomId].isPlaying = false;

      io.to(roomId).emit('video_changed', {
        videoUrl: videoUrl,
        videoTitle: videoTitle,
        currentTime: 0
      });

      console.log(`✓ Video endret i room ${roomId}: ${videoTitle}`);
    }
  });

  // Play
  socket.on('play', (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].isPlaying = true;
      io.to(roomId).emit('play_video', {
        timestamp: Date.now()
      });
      console.log(`▶ Play i room ${roomId}`);
    }
  });

  // Pause
  socket.on('pause', (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].isPlaying = false;
      io.to(roomId).emit('pause_video');
      console.log(`⏸ Pause i room ${roomId}`);
    }
  });

  // Seek (når bruker drar seekbar)
  socket.on('seek', (data) => {
    const { roomId, currentTime } = data;
    
    if (rooms[roomId]) {
      rooms[roomId].currentTime = currentTime;
      socket.broadcast.to(roomId).emit('seek_video', {
        currentTime: currentTime
      });
      console.log(`⏩ Seek til ${currentTime.toFixed(2)}s i room ${roomId}`);
    }
  });

  // Oppdater current time (for sync)
  socket.on('update_time', (data) => {
    const { roomId, currentTime } = data;
    if (rooms[roomId]) {
      rooms[roomId].currentTime = currentTime;
    }
  });

  // Chat melding
  socket.on('send_message', (data) => {
    const { roomId, username, message } = data;
    
    io.to(roomId).emit('receive_message', {
      username: username,
      message: message,
      timestamp: new Date().toLocaleTimeString('no-NO')
    });
    
    console.log(`💬 [${roomId}] ${username}: ${message}`);
  });

  // Leave room
  socket.on('leave_room', (data) => {
    const { roomId, username } = data;
    
    if (rooms[roomId]) {
      rooms[roomId].users = rooms[roomId].users.filter(u => u.id !== socket.id);
      socket.leave(roomId);
      
      if (rooms[roomId].users.length === 0) {
        delete rooms[roomId];
        console.log(`🗑 Room slettet: ${roomId}`);
      } else {
        io.to(roomId).emit('user_left', {
          username: username,
          usersInRoom: rooms[roomId].users.length
        });
      }
      
      console.log(`✗ ${username} forlot room: ${roomId}`);
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    // Finn hvilken room brukeren var i
    for (let roomId in rooms) {
      const user = rooms[roomId].users.find(u => u.id === socket.id);
      rooms[roomId].users = rooms[roomId].users.filter(u => u.id !== socket.id);
      
      if (rooms[roomId].users.length === 0) {
        delete rooms[roomId];
        console.log(`🗑 Room slettet: ${roomId}`);
      } else if (user) {
        io.to(roomId).emit('user_left', {
          username: user.username,
          usersInRoom: rooms[roomId].users.length
        });
      }
    }
    console.log(`✗ Bruker koblet fra: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔═══════════════════════════════════════════╗
  ║   🎬 PARTY STREAM SERVER KJØRER!          ║
  ╠═══════════════════════════════════════════╣
  ║   Lokal URL:  http://localhost:${PORT}        ║
  ║                                           ║
  ║   📱 DEL MED VENNER:                       ║
  ║   1. Finn din IP-adresse                  ║
  ║   2. Del: http://[DIN-IP]:${PORT}           ║
  ║                                           ║
  ║   Windows: ipconfig                       ║
  ║   Mac/Linux: ifconfig                     ║
  ╚═══════════════════════════════════════════╝
  `);
});
