import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h1>{movie.Title}</h1>
      <img className="w-100" src={movie.ImagePath} alt={movie.Title} />
      <p><strong>{movie.Description}</strong></p>
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
      
      
      <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer" }}>
        Back to the movie list
      </button>
    </div>
  );
};

