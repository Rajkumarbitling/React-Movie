import React, { useContext } from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  ExitToApp,
} from "@material-ui/icons";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logoutStart } from "../../context/authContext/AuthActions";

export default function Topbar() {
  const { isFetching, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch(logoutStart());
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Panel</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
          <div className="topbarIconContainer">
            <ExitToApp onClick={logout} />
          </div>
        </div>
      </div>
    </div>
  );
}
