import React, { useState, useEffect } from "react";
import axios from "axios";


const initialMovie = {
  title: '',
  director: '',
  metascore: 0,
  stars: []
};

// {
//   id: 5,
//   title: 'Tombstone',
//   director: 'George P. Cosmatos',
//   metascore: 89,
//   stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
// }

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);

  console.log("this is props.movieList", props.movieList);

  useEffect(() => {
    const selectedMovie = props.movieList.find(movie => {
      return `${movie.id}` === props.match.params.id;
    });
    if (selectedMovie) {
      setMovie(selectedMovie);
    }
  }, [props.movieList, props.match.params.id]);

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.updateList(res.data);
        props.fetchData();
      })
      .catch(err => {
        console.log(err);
      });
    props.fetchData();
    props.history.push("/");
  };

  return (
    <div>
      <h3>Update Movie</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={movie.title}
        />

        <label htmlFor="director">Director: </label>
        <input
          type="text"
          name="director"
          onChange={handleChange}
          value={movie.director}
        />

        <label htmlFor="metascore">Metascore: </label>
        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          value={movie.metascore}
        />

        <label htmlFor="stars">Stars: </label>
        <input
          type="text"
          name="stars"
          onChange={handleChange}
          value={movie.stars}
        />

        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;