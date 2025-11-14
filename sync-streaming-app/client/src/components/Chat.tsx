import React, { useEffect, useState } from 'react';
import { socket } from '../services/socket';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        socket.on('receiveMessage', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit('sendMessage', input);
            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;