'use client';
import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSpring, animated } from '@react-spring/web';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

import { fetchMovie } from '../store/slices/moviesSlice';
import WatchListButton from '../components/WatchListButton';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w185';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

const MovieDetail = ({ showAddToWatchList }) => {
	const { id } = useParams();
	const movie = useSelector((state) => state.movies.movie);
	const dispatch = useDispatch();

	const springProps = useSpring({
		transform: 'scale(1)',
		from: { transform: 'scale(1)' },
		to: { transform: 'scale(1.06)' },
		reverse: true,
		config: { tension: 280, friction: 60 },
	});

	useEffect(() => {
		dispatch(fetchMovie(id));
	}, [dispatch, id]);

	if (!movie) return <h1>Loading...</h1>;

	return (
		<Fragment>
			<BackdropContainer
				backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}
			/>
			<DetailInfo>
				<AnimatedPoster
					style={springProps}
					src={`${POSTER_PATH}${movie.poster_path}`}
					alt='poster'
				/>
				<div id='info'>
					<h1>{movie.title}</h1>
					<div id='infoAttr'>
						<p className='first'>{movie.release_date}</p>
						<p>{movie.vote_average}/10</p>
						{showAddToWatchList && (
							<WatchListButton movie={movie} />
						)}
					</div>
				</div>
			</DetailInfo>
			<Description>
				<p>{movie.overview}</p>
			</Description>
		</Fragment>
	);
};

export default MovieDetail;

// Styled Components
const BackdropContainer = styled.div`
	position: relative;
	padding-top: 70vh;
	background: url(${({ backdrop }) => backdrop}) no-repeat;
	background-position: center;
	object-fit: cover;
	opacity: 0.8;
`;

const DetailInfo = styled.div`
	background: hsl(0, 0%, 93%);
	padding: 1.5em 1em 0 1em;
	display: flex;
	font-size: 1.2em;
	text-align: left;

	#info {
		margin-left: 20px;
		width: 100%;
		height: 180px;
	}

	#infoAttr {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-content: center;
		margin: 0.5em auto 1em 0;
		color: hsl(0, 100%, 59%);
		font-size: 0.7em;

		> p:not(.first) {
			display: inline-block;
			margin-left: 1.5em;
		}

		> p:hover {
			color: hsl(0, 100%, 72%);
			cursor: pointer;
		}
	}

	img {
		position: relative;
		top: -5rem;
	}
`;

const Description = styled.div`
	margin: 0 auto;
	padding: 1.3em;
	text-align: left;
	width: 100%;
	color: whitesmoke;
	background: black;
	text-shadow: 1px 1px black;
`;

const AnimatedPoster = styled(animated.img)`
	box-shadow: 0 0 30px white;
	object-fit: cover;
`;
