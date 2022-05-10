import axios from "axios";
import { axiosInstance } from "../../config";
import { createUserFailure, createUserStart, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, editUserFailure, editUserStart, editUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess } from "./UserActions";
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

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosInstance.get("/users", {
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
        const res = await axiosInstance.post("/users", user, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(createUserSuccess(res.data));
        successNotify("User Created Successfully");
    } catch (error) {
        dispatch(createUserFailure());
        failedNotify("User creation Failed");
    }
}

// edit user
export const editUser = async (user, dispatch) => {
    dispatch(editUserStart());
    try {
        const res = await axiosInstance.put("/users/" + user._id, user, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(editUserSuccess(res.data));
        successNotify("User Edited Successfully");
    } catch (error) {
        dispatch(editUserFailure());
        failedNotify("User Edit Failed");
    }
}

// delete user
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosInstance.delete("/users/" + id, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(deleteUserSuccess(res.data));
        successNotify("User Deleted Successfully");
    } catch (error) {
        dispatch(deleteUserFailure());
        failedNotify("User Delete Failed");
    }
}