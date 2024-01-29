import axios from 'axios';

const axiosInstance = axios.create({
    timeout: 10000,
    baseURL: "http://localhost:8000",
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


export default axiosInstance;
