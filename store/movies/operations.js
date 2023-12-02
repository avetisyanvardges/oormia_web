import {createAsyncThunk} from "@reduxjs/toolkit";
import httpClient from "store/httpClient";

export const fetchMovies= createAsyncThunk(
    'movies/fetchMovies', async ({featuredId}) => {
        try {
            const {data} = await httpClient.get(`/data`, {params: {featuredId: featuredId}});
            return data;
        } catch (e) {
            console.log(e)
        }
    });
