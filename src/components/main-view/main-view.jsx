/* import the useState() function from React */
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  /* call useState function. Creating a state variable, movies */
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Truman Show",
      description: "An insurance salesman discovers his whole life is actually a reality TV show.",
      image:
        "https://m.media-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_FMjpg_UX1000_.jpg",
      featured: false,
      genre: {
        name: "Drama",
        description: "The drama movie genre is one of the most versatile and widely appreciated genres in filmmaking. Drama films focus on realistic and emotional storytelling, often delving into complex human relationships, personal struggles, and societal issues. These films aim to evoke a range of emotions from the audience, including empathy, sadness, joy, and introspection."
      },
      director: {
        name: "Peter Weir",
        bio: "Peter Lindsay Weir AM (born August 21, 1944) is an Australian retired film director. He is known for directing films crossing various genres over forty years with films such as Picnic at Hanging Rock (1975), Gallipoli (1981), Witness (1985), Dead Poets Society (1989), Fearless (1993), The Truman Show (1998), Master and Commander: The Far Side of the World (2003), and The Way Back (2010). He has received six Academy Award nominations, ultimately being awarded the Academy Honorary Award in 2022 for his lifetime achievement career.",
        birth: "1944",
        death: "-"
      }
    },
    {
      id: 2,
      title: "Birdman",
      description: "A washed-up superhero actor attempts to revive his fading career by writing, directing, and starring in a Broadway production.",
      image:
        "https://m.media-amazon.com/images/M/MV5BODAzNDMxMzAxOV5BMl5BanBnXkFtZTgwMDMxMjA4MjE@._V1_FMjpg_UX1000_.jpg",
      featured: true,
      genre: {
        name: "Romance",
        description: "The romance movie genre is a film genre that focuses on the themes of love, passion, and emotional relationships between characters. These films typically revolve around a central romantic storyline and often explore the challenges, obstacles, and joys that come with romantic relationships. Romance movies can span various sub-genres and settings, including historical, contemporary, fantasy, comedy, drama, and more. The emotional depth and character development in romance movies make them popular among audiences who enjoy exploring the complexities of human relationships and the universal experience of love. Some classic examples of romance movies include 'Gone with the Wind', 'Casablanca', 'Pride and Prejudice', 'The Notebook', 'Titanic', and 'Romeo and Juliet'."
      },
      director: {
        name: "Alejandro González Iñárritu",
        bio: "Alejandro González Iñárritu is a Mexican filmmaker. He is primarily known for making modern psychological drama films about the human condition. His projects have garnered critical acclaim and numerous accolades including four Academy Awards with a Special Achievement Award, three Golden Globe Awards, three BAFTA Awards, two Directors Guild of America Awards. His most notable films include Amores perros (2000), 21 Grams (2003), Babel (2006), Biutiful (2010), Birdman (2014), The Revenant (2015), and Bardo (2022).",
        birth: "1963",
        death: "-"
      }
    },
    {
      id: 3,
      title: "Groundhog Day",
      description: "A narcissistic, self-centered weatherman finds himself in a time loop on Groundhog Day, and the day keeps repeating until he gets it right.",
      image:
        "https://m.media-amazon.com/images/M/MV5BZWIxNzM5YzQtY2FmMS00Yjc3LWI1ZjUtNGVjMjMzZTIxZTIxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
      featured: true,
      genre: {
        name: "Comedy",
        description: "The comedy movie genre is a popular and diverse category of films that aim to entertain and amuse the audience through humor, wit, and comedic situations. Comedy films often exaggerate characters, situations, and events to create laughter and provide a lighthearted escape for viewers. There are various subgenres and styles within comedy, each with its own unique approach to humor."
      },
      director: {
        name: "Harold Ramis",
        bio: "Harold Allen Ramis (November 21, 1944 – February 24, 2014) was an American actor, comedian, director and writer. His best-known film acting roles were as Egon Spengler in Ghostbusters (1984) and Ghostbusters II (1989), and as Russell Ziskey in Stripes (1981); he also co-wrote those films. As a director, his films include the comedies Caddyshack (1980), National Lampoon''s Vacation (1983), Groundhog Day (1993), Analyze This (1999) and Analyze That (2002). Ramis was the original head writer of the television series SCTV, on which he also performed, as well as a co-writer of Groundhog Day and National Lampoon''s Animal House (1978). The final film that he wrote, produced, directed, and acted in was Year One (2009).",
        birth: "1944",
        death: "2014"
      }
    },
    {
      id: 4,
      title: "The Fifth Element",
      description: "In the colorful future, a cab driver unwittingly becomes the central figure in the search for a legendary cosmic weapon to keep Evil and Mr. Zorg at bay.",
      image:
        "https://m.media-amazon.com/images/M/MV5BZWFjYmZmZGQtYzg4YS00ZGE5LTgwYzAtZmQwZjQ2NDliMGVmXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_FMjpg_UX1000_.jpg",
      featured: true,
      genre: {
        name: "Sci-fi",
        description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, mutants, interstellar travel, time travel, or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition."
      },
      director: {
        name: "Luc Besson",
        bio: "Luc Paul Maurice Besson (born 18 March 1959) is a French film director, screenwriter and producer. He directed or produced the films Subway (1985), The Big Blue (1988), and La Femme Nikita (1990). Associated with the Cinéma du look film movement, he has been nominated for a César Award for Best Director and Best Picture for his films Léon: The Professional (1994) and the English-language The Messenger: The Story of Joan of Arc (1999). He won Best Director and Best French Director for his sci-fi action film The Fifth Element (1997). He wrote and directed the 2014 sci-fi action film Lucy and the 2017 space opera film Valerian and the City of a Thousand Planets.",
        birth: "1959",
        death: "-"
      }
    },
    {
      id: 5,
      title: "My Neighbor Totoro",
      description: "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.",
      image:
        "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
      featured: false,
      genre: {
        name: "Fantasy",
        description: "The fantasy movie genre encompasses films that are set in imaginative and often magical worlds, featuring elements such as mythical creatures, supernatural powers, epic quests, and enchanting landscapes. These movies transport viewers to realms where reality is altered and the impossible becomes possible. Fantasy films often explore themes of heroism, good versus evil, personal growth, and the triumph of imagination."
      },
      director: {
        name: "Hayao Miyazaki",
        bio: "Hayao Miyazaki (born January 5, 1941) is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
        birth: "1941",
        death: "-"
      }
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        <h3>Movie list: </h3>        
        <small>click on!</small><br></br>
        <p>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
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
