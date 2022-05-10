import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import naruto from "../../images/naruto.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getFeaturedContent = async () => {
      try {
        const res = await axiosInstance.get(
          `/movies/random${type ? "?type=" + type : ""}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setContent(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getFeaturedContent();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="comedy">Comedy</option>
            <option value="action">Action</option>
          </select>
        </div>
      )}
      <img width="100%" src={content.img} alt="" />
      <div className="info">
        {/* <img src={naruto} alt="" /> */}
        <h2 className="movietitle">{content.title}</h2>
        <div className="desc">{content.desc}</div>
        <div className="buttons">
          <Link to="/watch" state={content}>
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
