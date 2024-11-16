import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;
const isServer = typeof window === 'undefined';

// Async thunks
export const addMovieToWatchList = createAsyncThunk(
	'watchlist/addMovie',
	async (movie, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${
						!isServer ? localStorage.getItem('token') : ''
					}`,
				},
			};
			const response = await axios.post(
				`${BASE_URL}/watchlist`,
				{ movie },
				config
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchWatchListMovies = createAsyncThunk(
	'watchlist/fetchMovies',
	async (_, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${
						!isServer ? localStorage.getItem('token') : ''
					}`,
				},
			};
			const response = await axios.get(`${BASE_URL}/watchlist`, config);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Slice
const watchlistSlice = createSlice({
	name: 'watchlist',
	initialState: {
		movies: [],
		count: 0,
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addMovieToWatchList.fulfilled, (state, action) => {
				state.movies.push(action.payload);
			})
			.addCase(fetchWatchListMovies.fulfilled, (state, action) => {
				state.movies = action.payload.movies;
				state.count = action.payload.watchListCount;
			})
			.addCase(addMovieToWatchList.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(fetchWatchListMovies.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export default watchlistSlice.reducer;
