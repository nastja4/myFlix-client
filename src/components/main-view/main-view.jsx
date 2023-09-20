import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user";
import { MoviesList } from "../movies-list/movies-list";


export const MainView = () => {  
  // const storedUser = JSON.parse(localStorage.getItem("user")); // moved to user.js
  const storedToken = localStorage.getItem("token");  
  const [token, setToken] = useState(storedToken ? storedToken : null); 
  // const [user, setUser] = useState(storedUser ? storedUser : null);   
  // const [movies, setMovies] = useState([]); // already defined for redux
  
  // redux 
  const movies = useSelector((state) => state.movies.movies); // ? "value"
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();  

  const onLoggedOut = () => {
    // setUser(null);
    dispatch(setUser(null)); // due to redux
    setToken(null);
    localStorage.clear();
  };  

  const onLoggedIn=((user, token) => {
    // setUser(user); // due to redux
    dispatch(setUser(user));
    setToken(token);
  });

  //favorites  
  
  // let's define a function to update a user's info
  const updateUser = (user) => {
    // set localStorage user to overwrite the existing one
    localStorage.setItem('user', JSON.stringify(user));
    // setUser(user);
    dispatch(setUser(user)); // due to redux
  }

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movies-my-flix-307c49ee24e7.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => { 
        // setMovies(data); 
        dispatch(setMovies(data)); // for redux
      });
  }, [token]);        
      
  
  return (
    <BrowserRouter>
      <>
      <NavigationBar 
        // user={user} 
        onLoggedOut={onLoggedOut} 
      />
      <br/>

      <Row className="justify-content-md-center">
        <Routes>
          <Route 
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="mt-5">
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
                  <Col md={5} className="mt-5" >
                    <div className="text-left" style={{ width: "100%" }}>
                      <p className="text-center"><strong>Log in</strong></p>
                      <LoginView 
                        onLoggedIn={onLoggedIn} 
                      />
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
                      // movies={movies}  // due to redux
                      // user={user}                                 
                      token={token} // Pass the token prop to MovieCard
                      updateUser={updateUser} // Pass the callback function                     
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
                {!user ? <Navigate to="/login" replace /> : <MoviesList /> }                
                
                {/* {!user ? (
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
                          // user={user}
                          token={token} // Pass the token prop to MovieCard
                          updateUser={updateUser} // Pass the callback function
                        />
                      </Col>                                  
                    ))}          
                  </>  
                )} */}
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
                      // user={user}
                      token={token}
                      // setUser={setUser} // due to redux
                      // movies={movies} // for redux
                      onLoggedOut={onLoggedOut}
                      updateUser={updateUser} // Pass the function as a prop
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





