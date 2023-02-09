import { Link, useHistory, useLocation } from "react-router-dom";
import "./videoList.css";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { editList } from "../../context/listContext/apiCalls";
import { getMovies } from "../../context/movieContext/apiCalls";

export default function VideoList() {
  const Location = useLocation();
  const list = Location.list;
  const [updatedList, setUpdatedList] = useState(list);
  const history = useHistory();
  const { dispatch } = useContext(MovieContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

    useEffect(() => {
      getMovies(dispatchMovie);
    }, [dispatchMovie]);

    const handleSelect = (e) => {
      var value = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setUpdatedList({ ...updatedList, [e.target.name]: value });
    };

  const handleUpdate = (e) => {
    let value = 0;
    if (e.target.name === "limit") {
      value = Number(e.target.value);
    } else {
      value = e.target.value;
    }
    setUpdatedList({ ...updatedList, [e.target.name]: value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    editList(updatedList, dispatch);
    history.push("/lists");
  };

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
              <select
                name="type"
                id="type"
                value={updatedList.type}
                onChange={handleUpdate}
              >
                <option>Select</option>
                <option value="movies">Movies</option>
                <option value="series">Series</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Genre</label>
              <select
                name="genre"
                id="genre"
                value={updatedList.genre}
                onChange={handleUpdate}
              >
                <option>Select</option>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Content</label>
              <select
                multiple="multiple"
                name="content"
                id="content"
                onChange={handleSelect}
              >
                {movies.map((movie) =>
                  list.content.find(li => movie._id === li._id) ? (
                    <option key={movie._id} value={movie._id} selected>
                      {movie.title}
                    </option>
                  ) : (
                    <option key={movie._id} value={movie._id}>
                      {movie.title}
                    </option>
                  )
                )}
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
