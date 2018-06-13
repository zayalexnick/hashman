import axios from 'axios';

const api = axios.create({
    headers: {
        'XAuth': localStorage.getItem('token')
    }
});

export default api;