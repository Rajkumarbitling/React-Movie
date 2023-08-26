import axios from "axios";

export const axiosInstance = axios.create({
<<<<<<< Updated upstream
    // baseURL: "https://rajbits-movie-app.herokuapp.com/api/",
    proxy: "http://localhost:8800/api/",
=======
    baseURL: "https://react-movie-app-api.vercel.app/api/",
    // baseURL: "http://localhost:8800/api/",
    // proxy: "https://react-movie-app-api.vercel.app/api/",
>>>>>>> Stashed changes
})