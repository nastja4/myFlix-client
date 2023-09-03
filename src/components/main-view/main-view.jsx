import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  /* call useState function. Creating a state variable, movies */
  const [movies, setMovies] = useState([
    // {
    //   id: 1,
    //   title: "The Truman Show",
    //   description: "An insurance salesman discovers his whole life is actually a reality TV show.",
    //   image:
    //     "https://m.media-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_FMjpg_UX1000_.jpg",
    //   featured: false,
    //   genre: {
    //     name: "Drama",
    //     description: "The drama movie genre is one of the most versatile and widely appreciated genres in filmmaking. Drama films focus on realistic and emotional storytelling, often delving into complex human relationships, personal struggles, and societal issues. These films aim to evoke a range of emotions from the audience, including empathy, sadness, joy, and introspection."
    //   },
    //   director: {
    //     name: "Peter Weir",
    //     bio: "Peter Lindsay Weir AM (born August 21, 1944) is an Australian retired film director. He is known for directing films crossing various genres over forty years with films such as Picnic at Hanging Rock (1975), Gallipoli (1981), Witness (1985), Dead Poets Society (1989), Fearless (1993), The Truman Show (1998), Master and Commander: The Far Side of the World (2003), and The Way Back (2010). He has received six Academy Award nominations, ultimately being awarded the Academy Honorary Award in 2022 for his lifetime achievement career.",
    //     birth: "1944",
    //     death: "-"
    //   }
    // },
    
  ]);  
  
  useEffect(() => {
    fetch("https://movies-my-flix-307c49ee24e7.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth,
              Death: movie.Director.Death
            }     
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);  

  if (selectedMovie) {
    const similarMovies = movies.filter((movie) => movie.Genre.Name === selectedMovie.Genre.Name && movie._id !== selectedMovie._id);
    return (
      <div>
        <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null); }} />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <div key={movie._id}>
            <img src={movie.ImagePath} alt={movie.Title} style={{ width: "15%", height: "15%" }} />            
            <h3 onClick={() => setSelectedMovie(movie)}>{movie.Title}</h3>
            {/* <MovieCard 
              key={movie._id}
              movie={movie} 
              onMovieClick={() => setSelectedMovie(movie)} 
            /> */}
          </div>
        ))}        
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        <h3>Movie list: </h3>        
        <small>click on!</small>
        <p>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
        </p>
      </div>
    );
  }
};
