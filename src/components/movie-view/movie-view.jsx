import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col"; 
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./movie-view.scss";
import Button from "react-bootstrap/Button";


export const MovieView = ({ movies }) => {

  // favorites
  // const [isFavorite, setIsFavorite] = useState(false);

  // const handleToggleFavorite = () => {
  //   // Toggle the favorite status in the UI
  //   setIsFavorite(!isFavorite);

  //   // Make an API request to add or remove the movie from favorites
  //   onFavoriteClick(movie._id, !isFavorite);
  // };


  const { movieId } = useParams();
  const movie = movies.find((b) => b._id === movieId);  
  const similarMovies = movies.filter((otherMovie) => otherMovie.Genre.Name === movie.Genre.Name && otherMovie._id !== movie._id);
  
  
  return (
    <div>
      <h1>{movie.Title}</h1>
      <img className="w-100" src={movie.ImagePath} alt={movie.Title} />
      <p><strong>{movie.Description}</strong></p>
      <div>
        <h5>Genre:</h5>
        <p>{movie.Genre.Name}</p>
        <p>Description: <br/>{movie.Genre.Description}</p>
      </div>
      <div>
        <h5>Director:</h5>
        <p>{movie.Director.Name}</p>
        <p>Bio: <br/>{movie.Director.Bio}</p>
        <p>Birth year: {movie.Director ? movie.Director.Birth || 'Birth Year Not Available' : 'Birth Year Not Available'}</p>
        <p>Death year: {movie.Director.Death}</p>
        {/* <p>Featured: {movie.featured ? 'Yes' : 'No'}</p> */}
      </div>
      
      <Link to={`/`}>
        <Button variant="primary" className="back-button" style={{ cursor: "pointer" }}>
          Back to the movie list
        </Button>
      </Link>
      <br/>


      <br/>
      {/* // favorites */}
      {/* <Button 
        variant="primary" 
        onClick={() => handleToggleFavorite(movie)}
      >
        {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button> */}
      


      <hr />
      <h2>Similar Movies</h2>
      <br />
      {similarMovies.map((otherMovie) => (
        <Col className="mb-5" key={otherMovie._id} md={4}>
          <Link to={`/movies/${otherMovie._id}`} style={{ textDecoration: "none", color: '#09066f' }} >
            <img className="w-100" src={otherMovie.ImagePath} alt={otherMovie.Title} />
            <p style={{ cursor: "pointer" }}>
              <strong>{otherMovie.Title}</strong>
            </p>
          </Link>
        </Col>
      ))}

    </div>
  );
};


MovieView.propTypes = {
  movies: PropTypes.array.isRequired, 
  // onFavoriteClick: PropTypes.func.isRequired, // Add callback function
};