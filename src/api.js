import axios from 'axios';
let headers = {
    'cache-control': 'no-cache'
};
let accessToken = localStorage.getItem('accessToken');

if (accessToken && accessToken !== '') {
    headers.Authorization = accessToken;
}

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: headers
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        if (error.response.status === 401){
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            window.location.href = "";
        }
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});

export default instance;