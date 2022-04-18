import axios from "axios";
import { createUserFailure, createUserStart, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, editUserFailure, editUserStart, editUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess } from "./UserActions";

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get("/users", {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailure());
    }
}

// create user
export const createUser = async (user, dispatch) => {
    dispatch(createUserStart());
    try {
        const res = await axios.post("/users", user, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(createUserSuccess(res.data));
        alert("User Created Successfully");
    } catch (error) {
        dispatch(createUserFailure());
        alert("User Create Failed");
    }
}

// edit user
export const editUser = async (user, dispatch) => {
    dispatch(editUserStart());
    try {
        const res = await axios.put("/users/" + user._id, user, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(editUserSuccess(res.data));
    } catch (error) {
        dispatch(editUserFailure());
        alert("User Edit Failed");
    }
}

// delete user
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        const res = await axios.delete("/users/" + id, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(deleteUserSuccess(res.data));
    } catch (error) {
        dispatch(deleteUserFailure());
        alert("User Delete Failed");
    }
}