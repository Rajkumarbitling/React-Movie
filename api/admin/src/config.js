import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://react-movie-app-23vhrdtuz-rajkumarbitling.vercel.app/api/",
    // proxy: "http://localhost:8800/api/",
})