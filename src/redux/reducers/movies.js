import { createSlice } from "@reduxjs/toolkit";

// call createSlice, which is a function that accepts an initial state and is an object of reducer functions, a "name," and returns a slice
const moviesSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    setMovies: (state, action) => {
      // state.movies = action.payload
      return action.payload;
    }
  }
});


export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;