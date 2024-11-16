'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addMovieToWatchList } from '../store/slices/watchListSlice';

const WatchListButton = ({ movie }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const authenticated = useSelector((state) => state.auth.authenticated);

	if (authenticated) {
		return (
			<button
				onClick={() => {
					dispatch(addMovieToWatchList(movie));
					router.push('/watch-list');
				}}
			>
				Add to Watchlist
			</button>
		);
	} else {
		return null;
	}
};

export default WatchListButton;
