import axios from "axios";
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess } from "./ListActions";

export const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try {
        const res = await axios.get("/lists", {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(getListsSuccess(res.data));
    } catch (error) {
        dispatch(getListsFailure());
    }
}

// create list
export const createList = async (list, dispatch) => {
    dispatch(createListStart());
    try {
        const res = await axios.post("/lists", list, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(createListSuccess(res.data));
    } catch (error) {
        dispatch(createListFailure());
        alert("List Create Failed");
    }
}

// // edit List
// export const editList = async (movie, dispatch) => {
//     dispatch(editMovieStart());
//     try {
//         const res = await axios.put("/movies/" + movie._id, movie, {
//             headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
//         });
//         dispatch(editMovieSuccess(res.data));
//         alert("Movie Edited Successfully");
//     } catch (error) {
//         dispatch(editMovieFailure());
//         alert("Movie Edit Failed");
//     }
// }

// delete movie
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        const res = await axios.delete("/lists/" + id, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(deleteListSuccess(res.data));
    } catch (error) {
        dispatch(deleteListFailure());
        alert("List Delete Failed");
    }
}