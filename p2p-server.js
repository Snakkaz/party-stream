const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(__dirname));

// Serve the P2P app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'p2p-index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'P2P Party Stream is running' });
});

app.listen(PORT, () => {
    console.log(`🎬 Party Stream P2P server running on http://localhost:${PORT}`);
    console.log('📡 Using PeerJS cloud for signaling - no central server needed!');
    console.log('🔗 Share room links with friends to watch together');
});
