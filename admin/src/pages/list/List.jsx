import { Link, useLocation } from "react-router-dom";
import "./list.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import { editMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function List() {
  const Location = useLocation();
  const list = Location.list;
  const [uploadedNumber, setUploadedNumber] = useState(0);
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgThumb, setImgThumb] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [updatedList, setUpdatedList] = useState(list);

  const { dispatch } = useContext(MovieContext);

  const handleUpdate = (e) => {
    let value = 0;
    if (e.target.name === "limit") {
      value = Number(e.target.value);
    } else {
      value = e.target.value;
    }
    setUpdatedList({ ...updatedList, [e.target.name]: value });
  };

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
              setUpdatedList((prev) => {
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
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTile" },
      { file: imgThumb, label: "imgThumb" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    editMovie(updatedList, dispatch);
  };

  console.log(updatedList);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <div className="addProductItem">
              <label>List Title</label>
              <input
                type="text"
                placeholder={list.title}
                name="title"
                onChange={handleUpdate}
              />
            </div>
            <div className="addProductItem">
              <label>Type</label>
              <input
                type="text"
                placeholder={list.type}
                name="year"
                onChange={handleUpdate}
              />
            </div>
            <div className="addProductItem">
              <label>Genre</label>
              <select
                name="genre"
                id="genre"
                value={list.genre}
                onChange={handleUpdate}
              >
                <option>Select</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
              </select>
            </div>
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={handleCreate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
