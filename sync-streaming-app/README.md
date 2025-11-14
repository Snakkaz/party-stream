# Synchronized Streaming Application

This project is a synchronized streaming application that allows users to watch videos together in real-time. It features a chat interface, user management, and room functionality to enhance the viewing experience.

## Features

- **Real-time Video Playback**: Users can watch videos simultaneously with synchronization across all clients.
- **Chat Interface**: Users can communicate with each other while watching videos.
- **Room Management**: Users can create and join rooms to watch videos together.
- **User List**: Displays the list of users currently in the room.

## Technologies Used

- **Frontend**: React, TypeScript, Socket.io
- **Backend**: Node.js, Express, Socket.io, TypeScript

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd sync-streaming-app
   ```

2. Install dependencies for the client:
   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```
   cd ../server
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd ../client
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.