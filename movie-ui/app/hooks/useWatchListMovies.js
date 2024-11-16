import { useSelector, useDispatch } from 'react-redux';
import { fetchWatchListMovies } from '../store/slices/watchListSlice';
import { useEffect } from 'react';

const useWatchListMovies = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchWatchListMovies());
	}, [dispatch]);

	return {
		watchListMovies: useSelector((state) => state.watchList.movies),
	};
};

export default useWatchListMovies;
