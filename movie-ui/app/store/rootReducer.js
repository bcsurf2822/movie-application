import { combineReducers } from 'redux';
import moviesReducer from './slices/moviesSlice';
import authReducer from './slices/authSlice';
import watchListReducer from './slices/watchListSlice';

const rootReducer = combineReducers({
	watchList: watchListReducer,
	movies: moviesReducer,
	auth: authReducer,
});

export default rootReducer;
