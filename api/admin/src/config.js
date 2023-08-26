import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://rajbits-movie-app.herokuapp.com/api/",
    // proxy: "http://localhost:8800/api/",
})