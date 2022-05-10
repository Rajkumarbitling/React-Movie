import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://rajbits-movie-app.herokuapp.com/api/"
})