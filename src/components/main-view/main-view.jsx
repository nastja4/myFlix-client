import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export const MainView = () => {  
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [selectedMovie, setSelectedMovie] = useState(null);   
  const [movies, setMovies] = useState([]);  
  
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
      
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const moviesFromApi = data.map((movie) => {
  //         return {
  //           _id: movie._id,
  //           Title: movie.Title,
  //           Description: movie.Description,
  //           ImagePath: movie.ImagePath,
  //           Featured: movie.Featured,
  //           Genre: {
  //             Name: movie.Genre.Name,
  //             Description: movie.Genre.Description
  //           },
  //           Director: {
  //             Name: movie.Director.Name,
  //             Bio: movie.Director.Bio,
  //             Birth: movie.Director.Birth,
  //             Death: movie.Director.Death
  //           }     
  //         };
  //       });

  //       setMovies(moviesFromApi);
  //     });
  // }, []);

  
  const similarMovies = selectedMovie
  ? movies.filter((movie) => movie.Genre.Name === selectedMovie.Genre.Name && movie._id !== selectedMovie._id)
  : [];

  return (
    <Row className="justify-content-md-center">
      {!user ? (        
        <Col md={5} className="">
          <div className="">
          <p><strong>Log in</strong></p>
          <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
          }} />        
          or
          <p><strong>Sign up</strong></p>
          <SignupView />
          </div>
        </Col>        

      ) : selectedMovie ? (
        <Col md={8}>
        {/* const similarMovies = movies.filter((movie) => movie.Genre.Name === selectedMovie.Genre.Name && movie._id !== selectedMovie._id); */}          
          <Button variant="secondary" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>            
          <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null); }} />
          
          <hr />
          <h2>Similar Movies</h2>
          <br/>
          {similarMovies.map((movie) => (
            <Col className="mb-5" key={movie._id} md={4}>
              <img className="w-100" src={movie.ImagePath} alt={movie.Title}  /*style={{ width: "100%" }} */  />            
              <p onClick={() => setSelectedMovie(movie)}><strong>{movie.Title}</strong></p>              
            </Col>            
          ))}        
          
        </Col>

      ) : movies.length === 0 ? (
        <div>
          <Button variant="secondary" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
          <div>The list is empty!</div>
        </div>
      ) : (
        <>
          <p>
          <Button variant="secondary" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
          </p>          
          <h3>Movies</h3>                  
          {movies.map((movie) => (
            <Col className="mb-5" key={movie._id} xs={6} md={4} lg={3} xl={2}>
              <MovieCard                
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>              
          ))}          
        </>        
      )}
    </Row>
  );

  

  // //
  // if (!user) {
  //   return (
  //     <>
  //       <p><strong>Log in</strong></p>
  //       <LoginView onLoggedIn={(user, token) => {
  //           setUser(user);
  //           setToken(token);
  //       }} />        
  //       or
  //       <p><strong>Sign up</strong></p>
  //       <SignupView />
  //     </>      
  //   );    
  //  }


  // if (selectedMovie) {
  //   const similarMovies = movies.filter((movie) => movie.Genre.Name === selectedMovie.Genre.Name && movie._id !== selectedMovie._id);
  //   return (
  //     <div>
  //       <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
  //       <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null); }} />
  //       <hr />
  //       <h2>Similar Movies</h2>
  //       {similarMovies.map((movie) => (
  //         <div key={movie._id}>
  //           <img src={movie.ImagePath} alt={movie.Title} style={{ width: "15%", height: "15%" }} />            
  //           <h3 onClick={() => setSelectedMovie(movie)}>{movie.Title}</h3>           
  //         </div>
  //       ))}        
  //     </div>
  //   );
  // }


  // if (movies.length === 0) {
  //   return (
  //     <>
  //       <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
  //       <div>The list is empty!</div>
  //     </>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
  //       <h3>Movies</h3>        
  //       {/* <small>click on!</small> */}
  //       <p>
  //       {movies.map((movie) => (
  //         <MovieCard
  //           key={movie._id}
  //           movie={movie}
  //           onMovieClick={(newSelectedMovie) => {
  //             setSelectedMovie(newSelectedMovie);
  //           }}
  //         />
  //       ))}
  //       </p>
  //     </div>
  //   );
  // } //
};
