'use client';
import React from 'react';
import styled from 'styled-components';
import Movie from '../components/Movie';

import useWatchListMovies from '../hooks/useWatchListMovies';

export default function MovieList() {
	const { watchListMovies } = useWatchListMovies();

	const movieComponents = watchListMovies?.map?.((mv) => {
		const url = `watch-list/${mv.id}`;

		return (
			<Movie
				id={mv.id}
				key={mv.id}
				title={mv.title}
				img={mv.poster_path}
				url={url}
			/>
		);
	});

	return <MovieGrid>{movieComponents}</MovieGrid>;
}

const MovieGrid = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 2em;
	margin: 0 auto;
`;
