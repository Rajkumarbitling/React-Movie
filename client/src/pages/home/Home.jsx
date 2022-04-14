import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await axios.get(
          `/lists${type ? "?type" + type : ""}${genre ? "&genre" + genre : ""}`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWNjMjA2OGEzODQzZWVhZDI0YjkxMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTg2NTg2NiwiZXhwIjoxNjQ5OTUyMjY2fQ.f38Ph9dMjJLX0pyQqPglWEo0lS3ujgxd1LMZEtclfqk",
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomList();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
