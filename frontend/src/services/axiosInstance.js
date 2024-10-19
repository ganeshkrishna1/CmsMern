import axios from 'axios'

const BASEURL = 'http://localhost:5000/api';

export const axiosInstance = axios.create({
    baseURL: BASEURL
});

axiosInstance.interceptors.request.use(
    function (config){
        const user = localStorage.getItem('user')
        if(user){
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    function(error){
        //Handling error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response){
        console.log('Response: ',response);
        return response;
    },
    function(error){
        // Handling response error
        return Promise.reject(error);
    }
);