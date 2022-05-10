import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://rajbits-movie-app-admin.herokuapp.com/api/",
    // proxy: "http://localhost:8800/api/",
})