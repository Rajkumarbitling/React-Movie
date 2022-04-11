import axios from "axios";
import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, editMovieFailure, editMovieStart, editMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieActions";

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
        const res = await axios.get("/movies", {
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
        const res = await axios.post("/movies", movie, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(createMovieSuccess(res.data));
        alert("Movie Created Successfully");
    } catch (error) {
        dispatch(createMovieFailure());
        alert("Movie Create Failed");
    }
}

// edit movie
export const editMovie = async (movie, dispatch) => {
    dispatch(editMovieStart());
    try {
        const res = await axios.put("/movies/" + movie._id, movie, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(editMovieSuccess(res.data));
        alert("Movie Edited Successfully");
    } catch (error) {
        dispatch(editMovieFailure());
        alert("Movie Edit Failed");
    }
}

// delete movie
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        const res = await axios.delete("/movies/" + id, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(deleteMovieSuccess(res.data));
        alert("Movie Deleted Successfully");
    } catch (error) {
        dispatch(deleteMovieFailure());
        alert("Movie Delete Failed");
    }
}