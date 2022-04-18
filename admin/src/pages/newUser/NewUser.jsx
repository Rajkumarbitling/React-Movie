import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./newUser.css";
import { UserContext } from "../../context/userContext/UserContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { createUser } from "../../context/userContext/apiCalls";

export default function NewUser() {
  
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [uploadedNumber, setUploadedNumber] = useState(0);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
     let value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

   const upload = (items) => {
     items.forEach((item) => {
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
               console.log("User doesn't have permission to access the object");
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
             setUser((prev) => {
               return { ...prev, [item.label]: downloadURL };
             });
             setUploaded((prev) => prev + 1);
           });
         }
       );
     });
   };

   
  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: profilePic, label: "profilePic" }]);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createUser(user, dispatch);
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email@email.com"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin" onChange={handleChange}>
            <option>Select</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="userUpdateUpload cuser">
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
          <button className="addProductButton" onClick={handleCreate}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
