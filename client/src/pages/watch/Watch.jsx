import "./watch.scss";
import { ArrowBack } from "@material-ui/icons";
import spiderTrailer from "../../images/spider-trailer.mov";
import { useLocation, Link } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const movie = location.state;

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBack />
          Home
        </div>
      </Link>
      <video src={movie.video} className="video" autoPlay controls></video>
    </div>
  );
};

export default Watch;
