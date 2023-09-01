export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.image} alt={movie.title} style={{ width: "50%", height: "auto" }} />
      <h3>{movie.description}</h3>
      <div>
        <h4>Genre:</h4>
        <p>{movie.genre.name}</p>
        <p>Description: {movie.genre.description}</p>
      </div>
      <div>
        <h4>Director:</h4>
        <p>{movie.director.name}</p>
        <p>Bio: {movie.director.bio}</p>
        <p>Birth year: {movie.director.birth}</p>
        <p>Death year: {movie.director.death}</p>
      </div>
      {/* <p>Featured: {movie.featured ? 'Yes' : 'No'}</p> */}
      
      <button onClick={onBackClick}>Back to the movie list</button>
    </div>
  );
};

