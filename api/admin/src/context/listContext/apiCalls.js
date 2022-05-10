import axios from "axios";
import { axiosInstance } from "../../config";
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, editListFailure, editListStart, editListSuccess, getListsFailure, getListsStart, getListsSuccess } from "./ListActions";
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

export const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try {
        const res = await axiosInstance.get("/lists", {
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
        const res = await axiosInstance.post("/lists", list, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(createListSuccess(res.data));
        successNotify("List Created Successfully");
    } catch (error) {
        dispatch(createListFailure());
        failedNotify("List Create Failed");
    }
}

// edit List
export const editList = async (list, dispatch) => {
    dispatch(editListStart());
    try {
        const res = await axiosInstance.put("/lists/" + list._id, list, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(editListSuccess(res.data));
        successNotify("List Edited Successfully");
    } catch (error) {
        dispatch(editListFailure());
        failedNotify("List Edit Failed");
    }
}

// delete movie
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        const res = await axiosInstance.delete("/lists/" + id, {
            headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken },
        });
        dispatch(deleteListSuccess(res.data));
        successNotify("List Deleted Successfully");
    } catch (error) {
        dispatch(deleteListFailure());
        failedNotify("List Delete Failed");
    }
}