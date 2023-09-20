import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MovieCard = ({ movie, /* user, */ token, updateUser, isProfileView = true }) => {

  // redux 
  const user = useSelector((state) => state.user.user);

  // favorites
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
        {/* Conditionally render the button based on isProfileView. If isProfileView is on "false" (at the top), then I can't see the fav buttons in '/'  */}
        {isProfileView && (
          <div>            
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
          </div>
        )}  

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
    // favorites
    isFavorite: PropTypes.bool, // Add isFavorite property
  }).isRequired,
  // user: PropTypes.object, // Add user object
  token: PropTypes.string, // Add token  
};

