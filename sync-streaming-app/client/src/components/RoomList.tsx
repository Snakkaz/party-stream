import React from 'react';

const RoomList: React.FC = () => {
    const [rooms, setRooms] = React.useState<string[]>([]);

    React.useEffect(() => {
        // Fetch the list of rooms from the server
        const fetchRooms = async () => {
            const response = await fetch('/api/rooms');
            const data = await response.json();
            setRooms(data);
        };

        fetchRooms();
    }, []);

    return (
        <div>
            <h2>Available Rooms</h2>
            <ul>
                {rooms.map((room, index) => (
                    <li key={index}>{room}</li>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;