import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {  
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  // const [selectedMovie, setSelectedMovie] = useState(null);   
  const [movies, setMovies] = useState([]);  
  const [favoriteMovies, setFavoriteMovies] = useState([]); // Initialize favoriteMovies state here
  
  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };
  

//favorites
  // Callback function to add/remove movies from favorites
  const handleFavoriteClick = (movieId) => {
    setMovies((prevMovies) => {
      return prevMovies.map((movie) => {
        if (movie._id === movieId) {
          return { ...movie, isFavorite: !movie.isFavorite };
        }
        return movie;
      });
    });
  };
  //   const updatedMovies = movies.map((movie) => {
  //     if (movie._id === movieId) {
  //       return { ...movie, isFavorite: !movie.isFavorite };
  //     }
  //     return movie;
  //   });
  //   setMovies(updatedMovies);
  // };
    



  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movies-my-flix-307c49ee24e7.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => { 
        setMovies(data); 
      });
  }, [token]);      
      
  
  return (
    <BrowserRouter>
      <>
      <NavigationBar user={user} onLoggedOut={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }} />

      <Row className="justify-content-md-center">
        <Routes>
          <Route 
            path="/signup"
            element={
              <>
                {user? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                    <div className="text-left" style={{ width: "100%" }}>
                      <p className="text-center">Don't have an account? <strong>Sign up</strong></p>
                      <SignupView />
                    </div>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                    <div className="text-left" style={{ width: "100%" }}>
                      <p className="text-center"><strong>Log in</strong></p>
                      <LoginView onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                      }} />
                    </div>
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>                 
                ) : (
                  <Col md={8} className="mt-5">                    
                    <MovieView 
                      movies={movies}
                      user={user}
                      // onFavoriteClick={handleFavoriteClick} // Pass the callback function
                    />  
                  </Col>                 
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>  
                ) : (
                  <>                    
                    <h3 style={{marginTop: '20px'}}>Movies</h3>                  
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} xs={6} md={4} lg={3} xl={2}>
                        <MovieCard style={{ color: '#09066f' }}               
                          movie={movie} 
                          user={user}
                          token={token} // Pass the token prop to MovieCard
                          onFavoriteClick={handleFavoriteClick} // Pass the callback function
                          isFavorite={movie.isFavorite || false} /* Ensure isFavorite is defined */
                        />
                      </Col>                                  
                    ))}          
                  </>      
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={12} >
                  <ProfileView                  
                    user={user}
                    token={token}
                    setUser={setUser}
                    movies={movies} 
                    onLoggedOut={onLoggedOut}
                    favoriteMovies={favoriteMovies} // Pass the favoriteMovies prop here
                    handleFavoriteClick={handleFavoriteClick} // Pass the function as a prop        
                  />
                </Col>               
              )}
              </>
            }
          />
        </Routes>
      </Row>
      </>
    </BrowserRouter>
  );
};





