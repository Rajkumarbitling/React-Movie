import "./listItem.scss";
import { useEffect, useState } from "react";
import spider from "../../images/spider.jpg";
import spiderTrailer from "../../images/spider-trailer.mov";
import {
  Add,
  PlayArrow,
  ThumbUpOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";

const ListItem = ({ index, item }) => {
  const [isHovered, setisHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const videoLink = spiderTrailer;

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axiosInstance.get("movies/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to="/watch" state={movie}>
      <div
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        className="listItem"
        onMouseEnter={() => {
          setisHovered(true);
        }}
        onMouseLeave={() => {
          setisHovered(false);
        }}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop={true}></video>
            <div className="itemInfo">
              <div className="icons">
                <Link to="/watch" state={movie}>
                  <PlayArrow className="icon" />
                </Link>
                <Add className="icon" />
                <ThumbUpOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <p>{movie.title}</p>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit} age</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">
                <span>{movie.genre}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
