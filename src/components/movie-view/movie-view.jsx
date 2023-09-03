export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h1>{movie.Title}</h1>
      <img src={movie.ImagePath} alt={movie.Title} style={{ width: "30%", height: "auto" }} />
      <h3>{movie.Description}</h3>
      <div>
        <h4>Genre:</h4>
        <p>{movie.Genre.Name}</p>
        <p>Description: {movie.Genre.Description}</p>
      </div>
      <div>
        <h4>Director:</h4>
        <p>{movie.Director.Name}</p>
        <p>Bio: {movie.Director.Bio}</p>
        <p>Birth year: {movie.Director ? movie.Director.Birth || 'Birth Year Not Available' : 'Birth Year Not Available'}</p>
        <p>Death year: {movie.Director.Death}</p>
        {/* <p>Featured: {movie.featured ? 'Yes' : 'No'}</p> */}
      </div>
      
      
      <button onClick={onBackClick}>Back to the movie list</button>
    </div>
  );
};

