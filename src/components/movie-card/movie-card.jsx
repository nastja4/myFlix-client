import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// favorite
export const MovieCard = ({ movie, user, token, onFavoriteClick }) => {

  


  // favorites
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite);

  const handleToggleFavorite = () => {
    console.log('Toggling favorite');
    if (!user) {
      // Handle the case when the user is not logged in
      // You might want to show an error message or redirect to the login page
      return;
    }
    // Toggle the favorite status in the UI
    setIsFavorite(!isFavorite);

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
          // Update the user's data in the state or wherever it's stored
          onFavoriteClick(updatedUser.FavoriteMovies);
        } else {
          console.error('Unexpected API response:', updatedUser);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors, e.g., show an error message to the user
      });
  };





  return (
    <Card className="h-100" style={{ color: '#09066f' }}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        {/* <Card.Text>{movie.Description}</Card.Text> */}

        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button className="open-button" variant="link">
            View more
          </Button>
        </Link>
        <br/>


        <br/>
        {/* // favorites */}
        <Button 
          variant={isFavorite ? 'danger' : 'primary'}
          onClick={() => handleToggleFavorite()}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>      


      </Card.Body>
    </Card>    
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired,
    }).isRequired, 
    
    // favirites
    isFavorite: PropTypes.bool, // Add isFavorite property
  }).isRequired,
  onFavoriteClick: PropTypes.func.isRequired, // Add callback function
};

