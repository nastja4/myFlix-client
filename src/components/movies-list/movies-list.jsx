import React, { useState } from "react";
import { useSelector} from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { useSelector, useDispatch } from "react-redux";


export const MoviesList = () => {  

  const storedToken = localStorage.getItem("token"); 
  const movies = useSelector((state) => state.movies.movies);

  const filter = useSelector((state) =>
    state.movies.filter ? state.movies.filter.trim().toLowerCase() : ""
  );

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter) ||
    movie.Genre.Name.toLowerCase().includes(filter) ||
    movie.Director.Name.toLowerCase().includes(filter)
  );
  
  const [token, setToken] = useState(storedToken ? storedToken : null);  

  const dispatch = useDispatch();

  const updateUser = (user) => {
    // set localStorage user to overwrite the existing one
    localStorage.setItem('user', JSON.stringify(user));
    // setUser(user);
    dispatch(setUser(user)); // due to redux
  }


  return (
    <>
      <Row>
        <MoviesFilter />
      </Row>
      <Row>
        {movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          <>                    
            <h3 style={{marginTop: '20px'}}>Movies</h3>                  
            {filteredMovies.map((movie) => (
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
        )}
      </Row>
    </>
    );
};
    


                   