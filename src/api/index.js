import axios from 'axios';

const api = axios.create({
    baseURL: 'http://cp.gpuserver.ru/'
});

export default api;