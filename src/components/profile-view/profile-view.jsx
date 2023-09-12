import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card"; 

export const ProfileView = ({ user, token, movies, onLoggedOut, favoriteMovies, setFavoriteMovies }) => {
    
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);
  
  if (!user) {
    return <div>Loading..</div>;
  }
  

  const removeFav = (movieId) => {
    fetch(`https://movies-my-flix-307c49ee24e7.herokuapp.com/users/${user.Username}/favorites/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    }).then((response) => {
        if(response.ok) {
          // Remove the movie from local state
          const updatedFavoriteMovies = favoriteMovies.filter((movie) => movie._id !== movieId);
          setFavoriteMovies(updatedFavoriteMovies);
        } else {
          alert("Failed to remove movie from favorites");
        }
    }).catch((error) => {
      console.error("Error removing movie from favorites: ", error);
      alert("An error occurred while removing the movie from favorites.");
    });
  }


  const handleDeleteUser = () => {    
    fetch(`https://movies-my-flix-307c49ee24e7.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        onLoggedOut();
      } else {
        alert("Something went wrong")
      }
    }).catch((error) => {
      console.error("Error deleting user: ", error);
    });
  }


  const handleUpdateUserInfo = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://movies-my-flix-307c49ee24e7.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
        if (response.ok) {
          alert("Updated successfully");
          // window.location.reload();
          // return response.json()
        } else {
          alert("Update failed");
        }
    }).then((data) => {
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
    }).catch((error) => {
      console.error("Error updating user info: ", error);
    });
  }


  useEffect(() => {
    if (!user) {
      setLoading(true); // Set loading state to true if user prop is not available
      return;
    }

    const userFavoriteMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie._id));
    setFavoriteMovies(userFavoriteMovies);
    setLoading(false); // Set loading state to false once data is loaded
  }, [movies, user, setFavoriteMovies]) 
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  
  return (
    <>
      <h1>Profile</h1>
      <Row>
        <Col md={5}>
          <div>Username: {user.Username}</div>
          <div>Email: {user.Email}</div>
          <div>Birthday: {user.Birthday}</div>
        </Col>

        <Col>
          <h4>Form for updating profile data</h4>
          <Form onSubmit={handleUpdateUserInfo} className="">
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="5"
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required  
                  /* at least one uppercase letter / one lowercase letter / one number / one special character, no spaces, and a minimum length of 8 characters */
                  // pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s).{8,}$"
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control className="custom-placeholder-color"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required  
                  /* username part can contain letters, numbers / ._%+-, matches the "@" symbol; domain name can contain letters, numbers, dots, and hyphens; matches the dot that separates the domain name from the top-level domain; matches the top-level domain, which should contain 2 to 4 letters. */
                  // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                />
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control className="custom-placeholder-color"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  // required
                />
              </Form.Group>              
            <Button variant="primary" type="submit" className="submit-button">
              Submit changes
            </Button>    
          </Form>        
        </Col>
      </Row>

      <Row>
        <h3>Favorite movies:</h3>
        {favoriteMovies.map((movie) => (
          <Col className="mb-5" key={movie._id} xs={6} md={4} lg={3} xl={2}>
            {/* <MovieCard style={{ color: '#09066f' }}               
              movie={movie} /> */}

            <Card className="h-100" style={{ color: '#09066f' }}>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Link to={`/movies/${movie._id}`}>
                  <Button className="open-button" variant="link">
                    View more
                  </Button>
                  <Button variant="secondary" onClick={() => removeFav(movie._id)}>
                    Remove from favorires
                  </Button>
                </Link>
              </Card.Body>
            </Card>
            
          </Col>
        ))}
      </Row>      

      <Button variant="primary" onClick={handleDeleteUser}>
        Delete account
      </Button>

    </>    
  );
}



