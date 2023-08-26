import { useContext, useEffect, useState } from "react";
import "./newList.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";
import { useHistory } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState({});
  const history = useHistory();

  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const { dispatch } = useContext(ListContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleSelect = (e) => {
    var value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleChange = (e) => {
    let value = 0;
    if (e.target.name === "limit") {
      value = Number(e.target.value);
    } else {
      value = e.target.value;
    }
    setList({ ...list, [e.target.name]: value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history.push("./lists");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="flex">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <select name="genre" id="genre" onChange={handleChange}>
              <option>Select</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" id="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movies">Movies</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="addProductItem">
          <label>Content</label>
          <select
            multiple="multiple"
            name="content"
            id="content"
            onChange={handleSelect}
          >
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
        <button className="addProductButton" onClick={handleCreate}>
          Create
        </button>
      </form>
    </div>
  );
}
