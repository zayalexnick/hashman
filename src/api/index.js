import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://cp.gpuserver.ru/',
    withCredentials: true,
    //transformRequest: [(data) => JSON.stringify(data.data)],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'XAuth': localStorage.getItem('token')
    }
});

export default api;