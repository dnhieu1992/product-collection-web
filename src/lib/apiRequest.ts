import axios from 'axios';
import userService from '../ultils/userService';

const httpClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        "Content-Type": "application/json",
    }
});

const getAuthToken = () => {
    const user = userService.getCurrentUser();
    const token = user?.token;
    return token;
}

const authInterceptor = (config: any) => {
    const token = getAuthToken();
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
}

const errorInterceptors = (error: any) => {
    if (!error.response) {
        throw new Error("Network error.");
    }
    let errorMessage = error.response.data?.error;

    switch (error.response.status) {
        case 400:
            errorMessage = errorMessage || "Data not found.";
            break;
        case 409:
            errorMessage = errorMessage || "The item exists.";
            break;
        case 401:
        case 403:
            userService.removeCurrentUser();
            location.href = "/login"
            return Promise.reject(error);
        default:
            errorMessage = errorMessage || "Server error";
            break;
    }

    throw new Error(errorMessage);
}

httpClient.interceptors.request.use(authInterceptor);

httpClient.interceptors.response.use(
    (res: any) => res,
    errorInterceptors
);

export default httpClient;