import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../store/slices/moviesSlice';

//custom hook that wraps around redux action selects movies and then dispatches fetch movies thunk to fetch movies by the page
const useMovies = () => {
	const dispatch = useDispatch();

	return {
		movies: useSelector((state) => state.movies.movies),
		getMovies: (page) => dispatch(fetchMovies(page)),
	};
};

export default useMovies;
