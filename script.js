class PartyStream {
    constructor() {
        this.streams = [];
        this.currentStream = null;
        this.viewerInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStreams();
    }

    setupEventListeners() {
        const startBtn = document.getElementById('startStream');
        const stopBtn = document.getElementById('stopStream');
        const streamInput = document.getElementById('streamName');

        startBtn.addEventListener('click', () => this.startStream());
        stopBtn.addEventListener('click', () => this.stopStream());
        streamInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.startStream();
        });
    }

    startStream() {
        const streamName = document.getElementById('streamName').value.trim();
        
        if (!streamName) {
            alert('Please enter a party name!');
            return;
        }

        if (this.currentStream) {
            alert('You already have an active stream!');
            return;
        }

        this.currentStream = {
            id: Date.now(),
            name: streamName,
            viewers: Math.floor(Math.random() * 50) + 1,
            startTime: new Date()
        };

        this.streams.push(this.currentStream);
        this.saveStreams();
        this.displayCurrentStream();
        this.startViewerCounter();
        document.getElementById('streamName').value = '';
    }

    stopStream() {
        if (!this.currentStream) return;

        const index = this.streams.findIndex(s => s.id === this.currentStream.id);
        if (index > -1) {
            this.streams.splice(index, 1);
        }

        this.currentStream = null;
        this.saveStreams();
        this.hideCurrentStream();
        this.stopViewerCounter();
    }

    displayCurrentStream() {
        const activeStreamSection = document.getElementById('activeStream');
        const streamNameElement = document.getElementById('currentStreamName');
        
        streamNameElement.textContent = this.currentStream.name;
        activeStreamSection.style.display = 'block';
        
        this.updateViewerCount();
        this.renderStreamList();
    }

    hideCurrentStream() {
        const activeStreamSection = document.getElementById('activeStream');
        activeStreamSection.style.display = 'none';
        this.renderStreamList();
    }

    startViewerCounter() {
        this.viewerInterval = setInterval(() => {
            if (this.currentStream) {
                const change = Math.floor(Math.random() * 5) - 2;
                this.currentStream.viewers = Math.max(1, this.currentStream.viewers + change);
                this.updateViewerCount();
                this.saveStreams();
                this.renderStreamList();
            }
        }, 3000);
    }

    stopViewerCounter() {
        if (this.viewerInterval) {
            clearInterval(this.viewerInterval);
            this.viewerInterval = null;
        }
    }

    updateViewerCount() {
        const viewerCountElement = document.getElementById('viewerCount');
        if (this.currentStream) {
            viewerCountElement.textContent = this.currentStream.viewers;
        }
    }

    renderStreamList() {
        const streamsList = document.getElementById('streamsList');
        
        if (this.streams.length === 0) {
            streamsList.innerHTML = '<p class="no-streams">No active streams yet. Start one!</p>';
            return;
        }

        streamsList.innerHTML = this.streams.map(stream => `
            <div class="stream-item">
                <div>
                    <h4>${stream.name}</h4>
                    <small>Started ${this.getTimeAgo(stream.startTime)}</small>
                </div>
                <div class="viewers">
                    👥 ${stream.viewers}
                </div>
            </div>
        `).join('');
    }

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} min ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    saveStreams() {
        try {
            localStorage.setItem('partyStreams', JSON.stringify(this.streams));
        } catch (e) {
            console.warn('Could not save streams to localStorage', e);
        }
    }

    loadStreams() {
        try {
            const saved = localStorage.getItem('partyStreams');
            if (saved) {
                this.streams = JSON.parse(saved);
                this.cleanOldStreams();
                this.renderStreamList();
            }
        } catch (e) {
            console.warn('Could not load streams from localStorage', e);
        }
    }

    cleanOldStreams() {
        const now = new Date();
        this.streams = this.streams.filter(stream => {
            const age = now - new Date(stream.startTime);
            return age < 24 * 60 * 60 * 1000; // Keep streams less than 24 hours old
        });
        this.saveStreams();
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PartyStream();
});
