import { createSlice } from "@reduxjs/toolkit";

// call createSlice, which is a function that accepts an initial state and is an object of reducer functions, a "name," and returns a slice
const moviesSlice = createSlice({
  name: "movies",
  // initialState: [],
  initialState: {
    movies: [], // Initialize movies as an empty array
    filter: ""
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload; // return action.payload; // return { ...state, movies: action.payload };
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});


export const { setMovies, setFilter } = moviesSlice.actions;

export default moviesSlice.reducer;