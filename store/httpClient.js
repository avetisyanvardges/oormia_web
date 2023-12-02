import axios from 'axios';

const httpClient = axios.create({
    baseURL: '',
});

httpClient.interceptors.request.use((config) => {
    const accessToken = '';
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }
    return config
});

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {

        }
        return Promise.reject(error)
    }
);

export default httpClient;
