import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import naruto from "../../images/naruto.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getFeaturedContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWNjMjA2OGEzODQzZWVhZDI0YjkxMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTg2NTg2NiwiZXhwIjoxNjQ5OTUyMjY2fQ.f38Ph9dMjJLX0pyQqPglWEo0lS3ujgxd1LMZEtclfqk",
          },
        });
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
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="action">Action</option>
            <option value="crime">Crime</option>
            <option value="thriller">Thriller</option>
          </select>
        </div>
      )}
      <img width="100%" src={content.img} alt="" />
      <div className="info">
        <img src={naruto} alt="" />
        <div className="desc">{content.desc}</div>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
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
