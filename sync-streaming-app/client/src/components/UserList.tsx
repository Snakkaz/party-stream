import React from 'react';

const UserList: React.FC<{ users: string[] }> = ({ users }) => {
    return (
        <div>
            <h2>Users in Room</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;