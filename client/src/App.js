import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";

import UpdateMovie from "./Movies/UpdateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const [movieList, setMovieList] = useState([]);

  const fetchData = () => {
    axios
    .get("http://localhost:5000/api/movies")
    .then(res => {
      setMovieList(res.data);
      })
    .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render = {props => {
          return <UpdateMovie {...props} fetchData={fetchData} movieList={movieList} updateList={setMovieList}/>;
        }}
      />
    </>
  );
};

export default App;
