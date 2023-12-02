import {createSlice} from "@reduxjs/toolkit";
import {fetchMovies} from "./operations";

const initialState = {
    movies: {},
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, {payload}) => {
            state.movies = payload;
        })
    }
});

export default moviesSlice.reducer;
