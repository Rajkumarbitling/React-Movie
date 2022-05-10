import {
  AccessTime,
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext/UserContext";
import "./user.css";
import storage from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { editUser } from "../../context/userContext/apiCalls";
const CryptoJS = require("crypto-js");

export default function User() {
  const Location = useLocation();
  const user = Location.user;
  const [profilePic, setProfilePic] = useState("");
  const [uploadedNumber, setUploadedNumber] = useState(0);
  const [uploaded, setUploaded] = useState(0);
  const [updatedUser, setUpdatedUser] = useState(user);
  const history = useHistory();

  const { dispatch } = useContext(UserContext);

  const handleUpdate = (e) => {
    var value = e.target.value;
    setUpdatedUser({ ...updatedUser, [e.target.name]: value });
  };

  const decryptPassword = (password) => {
    // Decrypt Password
    const bytes = CryptoJS.AES.decrypt(password, "Rajbits");
    const originalPass = bytes.toString(CryptoJS.enc.Utf8);
    return originalPass;
  }

  useEffect(() => {
    setUpdatedUser({
      ...updatedUser,
      password: decryptPassword(user.password),
    });
  }, [])
  

  const upload = (items) => {
    items.forEach((item) => {
      if (item.file) {
        const fileName =
          new Date().getTime() + "_" + item.label + "_" + item.file.name;
        const storageRef = ref(storage, `/items/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, item.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                console.log("Dunno here on uploading");
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                console.log(
                  "User doesn't have permission to access the object"
                );
                break;
              case "storage/canceled":
                console.log("User canceled the upload");
                // User canceled the upload
                break;

              case "storage/unknown":
                console.log(
                  "Unknown error occurred, inspect error.serverResponse"
                );
                // Unknown error occurred, inspect error.serverResponse
                break;
              default:
                console.log("Dunno here on uploading failure");
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUpdatedUser((prev) => {
                return { ...prev, [item.label]: downloadURL };
              });
              setUploaded((prev) => prev + 1);
            });
          }
        );
      }
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: profilePic, label: "profilePic" }]);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    editUser(updatedUser, dispatch);
    history.push("/users");
  };

  console.log(updatedUser);
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.profilePic ||
                "https://i.pinimg.com/474x/c3/53/7f/c3537f7ba5a6d09a4621a77046ca926d--soccer-quotes-lineman.jpg"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">{user._id}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.isAdmin ? "Admin" : "User"}
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <span className="userShowTitle">Joined Details</span>
            <div className="userShowInfo">
              <AccessTime className="userShowIcon" />
              <span className="userShowInfoTitle">{user.createdAt}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  name="username"
                  className="userUpdateInput"
                  onChange={handleUpdate}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  name="email"
                  className="userUpdateInput"
                  onChange={handleUpdate}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  placeholder={decryptPassword(user.password)}
                  name="password"
                  className="userUpdateInput"
                  onChange={handleUpdate}
                />
              </div>
              <div className="userUpdateItem">
                <label>Is Admin?</label>
                <select
                  id="isAdmin"
                  name="isAdmin"
                  value={updatedUser.isAdmin}
                  onChange={handleUpdate}
                >
                  <option>Select</option>
                  <option value="false">User</option>
                  <option value="true">Admin</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={
                    user.profilePic ||
                    "https://i.pinimg.com/474x/c3/53/7f/c3537f7ba5a6d09a4621a77046ca926d--soccer-quotes-lineman.jpg"
                  }
                  alt=""
                />
                <label htmlFor="profilePic">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setProfilePic(e.target.files[0]);
                    setUploadedNumber((prev) => prev + 1);
                  }}
                />
              </div>
              {uploaded === uploadedNumber ? (
                <button className="productButton" onClick={handleCreate}>
                  Update
                </button>
              ) : (
                <button className="productButton" onClick={handleUpload}>
                  Upload
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
