import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_KEY

const myUrl = process.env.NEXT_PUBLIC_BASE_URL
console.log(myUrl)
// Async thunks
export const fetchMovies = createAsyncThunk(
	'movies/fetchMovies',
	async (page = 1) => {
		const response = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
		);

		return response.data;
	}
);

export const fetchMovie = createAsyncThunk('movies/fetchMovie', async (id) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&include_adult=false&include_video=false`
	);
	return response.data;
});

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		movies: [],
		movie: {},
		total_pages: 0,
		user: null,
		status: 'idle',
		error: null,
	},
	reducers: {
		// Synchronous actions if needed
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovie.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchMovie.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.movie = action.payload;
			})
			.addCase(fetchMovie.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchMovies.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.movies = [...state.movies, ...action.payload.results];
				state.total_pages = action.payload.total_pages;
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default moviesSlice.reducer;
