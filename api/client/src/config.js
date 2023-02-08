import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://react-movie-app-api.vercel.app/api/"
})