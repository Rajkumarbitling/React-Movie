import { Link, useLocation } from "react-router-dom";
import "./product.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import { editMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function Product() {
  const Location = useLocation();
  const movie = Location.movie;
  const [uploadedNumber, setUploadedNumber] = useState(0);
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgThumb, setImgThumb] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [updatedMovie, setUpdatedMovie] = useState(movie);

  const { dispatch } = useContext(MovieContext);

  const handleUpdate = (e) => {
    let value = 0;
    if (e.target.name === "limit") {
      value = Number(e.target.value);
    } else {
      value = e.target.value;
    }
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
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
              setUpdatedMovie((prev) => {
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
    editMovie(updatedMovie, dispatch);
  };

  console.log(updatedMovie);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <div className="addProductItem">
              <label>Title</label>
              <input
                type="text"
                placeholder={movie.title}
                name="title"
                onChange={handleUpdate}
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                type="text"
                placeholder={movie.desc}
                name="desc"
                onChange={handleUpdate}
              />
            </div>
            <div className="addProductItem">
              <label>Year</label>
              <input
                type="text"
                placeholder={movie.year}
                name="year"
                onChange={handleUpdate}
              />
            </div>
            <div className="addProductItem">
              <label>Genre</label>
              <select
                name="genre"
                id="genre"
                value={updatedMovie.genre}
                onChange={handleUpdate}
              >
                <option>Select</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Duration</label>
              <input
                type="text"
                placeholder={movie.duration}
                name="duration"
                onChange={handleUpdate}
              />
            </div>
            <div className="addProductItem">
              <label>Limit</label>
              <input
                type="text"
                placeholder={movie.limit}
                name="limit"
                onChange={handleUpdate}
              />
            </div>
            <div className="addProductItem">
              <label>Is Series?</label>
              <select
                name="isSeries"
                id="isSeries"
                value={updatedMovie.isSeries}
                onChange={handleUpdate}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <label>Trailer</label>
            <input
              type="file"
              name="title"
              onChange={(e) => {
                setTrailer(e.target.files[0]);
                setUploadedNumber((prev) => prev + 1);
              }}
            />
            <label>Video</label>
            <input
              type="file"
              name="video"
              onChange={(e) => {
                setVideo(e.target.files[0]);
                setUploadedNumber((prev) => prev + 1);
              }}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label for="img">
                <Publish />
              </label>
              <input
                type="file"
                id="img"
                name="img"
                style={{ display: "none" }}
                onChange={(e) => {
                  setImg(e.target.files[0]);
                  setUploadedNumber((prev) => prev + 1);
                }}
              />
            </div>
            <div className="productUpload">
              <img src={movie.imgThumb} alt="" className="productUploadImg" />
              <label for="imgThumb">
                <Publish />
              </label>
              <input
                type="file"
                id="imgThumb"
                name="imgThumb"
                style={{ display: "none" }}
                onChange={(e) => {
                  setImgThumb(e.target.files[0]);
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
  );
}
