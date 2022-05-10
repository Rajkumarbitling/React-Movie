import axios from "axios";
import { axiosInstance } from "../../config";
import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, editMovieFailure, editMovieStart, editMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieActions";
import { Store } from 'react-notifications-component';


const successNotify = (msg) => {
    Store.addNotification({
        title: "Success!",
        message: msg,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true
        }
    });
}

const failedNotify = (msg) => {
    Store.addNotification({
        title: "Failed!",
        message: msg,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true
        }
    });
}

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
        const res = await axiosInstance.get("/movies", {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(getMoviesSuccess(res.data));
    } catch (error) {
        dispatch(getMoviesFailure());
    }
}

// create movie
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try {
        const res = await axiosInstance.post("/movies", movie, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(createMovieSuccess(res.data));
        successNotify("Movie Created Successfully");
    } catch (error) {
        dispatch(createMovieFailure());
        failedNotify("Movie Create Failed");
    }
}

// edit movie
export const editMovie = async (movie, dispatch) => {
    dispatch(editMovieStart());
    try {
        const res = await axiosInstance.put("/movies/" + movie._id, movie, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(editMovieSuccess(res.data));
        successNotify("Movie Edited Successfully");
    } catch (error) {
        dispatch(editMovieFailure());
        failedNotify("Movie Edit Failed");
    }
}

// delete movie
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        const res = await axiosInstance.delete("/movies/" + id, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(deleteMovieSuccess(res.data));
        successNotify("Movie Deleted Successfully");
    } catch (error) {
        dispatch(deleteMovieFailure());
        failedNotify("Movie Delete Failed");
    }
}