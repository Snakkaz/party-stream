import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchRooms = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/rooms`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching rooms');
    }
};

export const uploadVideo = async (videoData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/upload`, videoData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error uploading video');
    }
};