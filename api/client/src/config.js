import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://react-movie-app-api.vercel.app/api/"
    // baseURL: "http://localhost:8800/api/"
})