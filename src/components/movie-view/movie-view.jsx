import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col"; 
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";


export const MovieView = ({ /*movies,*/ user, token, updateUser }) => {  

  // redux
  const movies = useSelector((state) => state.movies);


  // favorites
  const { movieId } = useParams();
  const movie = movies.find((b) => b._id === movieId);
  const [isFavorite, setIsFavorite] = useState(false);   

  // let's use the useEffect hook to set the isFavorite state based on whether the movie ID is included in the user's favorite list. e.g.,
  useEffect(() => {
    if (user.FavoriteMovies && movie._id) {
      setIsFavorite(user.FavoriteMovies.includes(movie._id))
    }
  }, [movie]);

  const handleToggleFavorite = () => {
    console.log('Toggling favorite');
    if (!user) {
      // Handle the case when the user is not logged in
      // You might want to show an error message or redirect to the login page
      return;
    }    

    // Make an API request to add or remove the movie from favorites
    const url = `https://movies-my-flix-307c49ee24e7.herokuapp.com/users/${user.Username}/movies/${movie._id}`;
    const method = isFavorite ? 'DELETE' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((updatedUser) => {
        console.log('Updated user:', updatedUser);
        if (updatedUser && updatedUser.Username) {
          const updatedUserInfo = {
            ...user,
            FavoriteMovies: updatedUser.FavoriteMovies
          }
          // Toggle the favorite status in the UI
          setIsFavorite(!isFavorite);
          // Update the user's data in the state or wherever it's stored
          updateUser(updatedUserInfo);          
        } else {
          console.error('Unexpected API response:', updatedUser);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors, e.g., show an error message to the user
      });
  };

   
  const similarMovies = movies.filter((otherMovie) => otherMovie.Genre.Name === movie.Genre.Name && otherMovie._id !== movie._id);
  
  
  return (
    <div>
      <h1>{movie.Title}</h1>
      <img className="w-100" src={movie.ImagePath} alt={movie.Title} />
      <p><strong>{movie.Description}</strong></p>
      
      {/* // favorites */}
      <Button 
        variant={isFavorite ? 'primary' : 'primary'}
        onClick={() => handleToggleFavorite()}
      >
        {isFavorite ? (
          <>
            <strong>Remove </strong>from Favorites
          </>
        ) : (
          <>
            <strong>Add </strong>to Favorites
          </>
        )}
      </Button> 
      <br/> 
      
      <br/>
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
  // movies: PropTypes.array.isRequired,   
  user: PropTypes.object, // Add user object
  token: PropTypes.string, // Add token  
  updateUser: PropTypes.func.isRequired, 
};