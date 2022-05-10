import axios from "axios";
import { axiosInstance } from "../../config";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import { Store } from 'react-notifications-component';

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axiosInstance.post("auth/login", user);
        res.data.isAdmin && dispatch(loginSuccess(res.data));
    } catch (error) {
        console.log(error)
        Store.addNotification({
            title: "Failed!",
            message: "Something is Wrong",
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
        dispatch(loginFailure());
    }
}