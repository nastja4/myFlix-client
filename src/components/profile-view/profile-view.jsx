import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap"; 
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";


export const ProfileView = ({ user, token, onLoggedOut, movies, updateUser }) => {
  const [userData, setUserData] = useState(user); // State to store user data
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const [updateError, setUpdateError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };  
  
  // favorites
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      // Filter and set favorite movies based on user data
      const userFavoriteMovies = movies.filter((m) =>
        user.FavoriteMovies.includes(m._id)
      );
      setFavoriteMovies(userFavoriteMovies);
    }
  }, [user, movies]);


  useEffect(() => {
    if (user && token) {
      // Fetch user information based on the provided username
      fetch(`https://movies-my-flix-307c49ee24e7.herokuapp.com/users/${user.Username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
          setLoading(false);
        });
    }
  }, [user, token]);


  if (loading) {
    return <div>Loading user data...</div>;
  }


  // update user info
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }    
    })
      .then((response) => {
          if (response.ok) {
            // Update successful
            setUpdateSuccess(true);
            setUpdateError(""); // Clear any previous error messages
            // Update the local user data with the new values
            setUserData(data);
          } else {
            // Update failed
            setUpdateError("Failed to update user data");
            console.error("Update failed:", data);
          }
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
          setUpdateError("An error occurred while updating user data.");
        });
  };

  

  // user deregister
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


  return ( 
    <> 
      <Row>     
        <Col className="mt-5" md={6}>          
          <h1>Profile Information</h1>            
          <div><strong>Username: </strong>{userData.Username}</div>
          <div><strong>Password: </strong>{userData.Password ? "Password Set" : "No Password Set"}</div>
          <div><strong>Email: </strong>{userData.Email}</div>
          <div><strong>Birthday: </strong>{userData.Birthday}</div>                      
        </Col>

        <Col className="mt-5" md={3}>
          <Button variant="danger" onClick={handleShowDeleteModal}>
            Delete account
          </Button>   
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal} className="b-modul-cancel">
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteUser}>
                Delete account
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      
      <hr />
      <div>
        <h4>Form for updating profile info</h4>
        {updateSuccess && (
          <div className="success-message">Profile updated successfully!</div>
        )}
        {updateError && (
          <div className="error-message">{updateError}</div>
        )}
        <Row>
          <Col md={6}>
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
              <Form.Group controlId="formNewPassword">
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
              <br/>              
            </Form>   
          </Col>
        </Row>

      </div>   
      <hr />

      <Row>
        <h3>Favorite movies:</h3>
        {favoriteMovies.map((movie) => (
          <Col className="mb-5" key={movie._id} xs={6} md={4} lg={3} xl={2}>
            <MovieCard style={{ color: '#09066f' }}               
              movie={movie} 
              user={user}
              token={token} // Pass the token prop to MovieCard
              updateUser={updateUser} // Pass the updateUser function
              isProfileView={true} 
            />            
          </Col>
        ))}
      </Row>
      {console.log('Favorite Movies:', favoriteMovies)}
    </> 
  );
};


ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,  
};











