'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import Movie from './components/Movie';
import { useSelector } from 'react-redux';

import useMovies from './hooks/useMovies';

export default function Home() {
	const { movies, getMovies } = useMovies();
	useEffect(() => {
		getMovies(1);
	}, []);

	const [page, setPage] = useState(1);
	const [hasMoreItems, setHasMoreItems] = useState(true);
	const totalPages = useSelector((state) => state.movies.total_pages);

	const loadItems = () => {
		if (page < totalPages || totalPages === 0) {
			setPage(page + 1);
			getMovies(page + 1);
		} else {
			setHasMoreItems(false);
		}
	};

	return (
		<Container>
			<InfiniteScroll
				dataLength={movies.length}
				next={loadItems}
				hasMore={hasMoreItems}
				loader={<h4>Loading...</h4>}
			>
				<MovieGrid>
					{movies.map((mv) => {
						return (
							<Movie
								id={mv.id}
								key={mv.id}
								title={mv.title}
								img={mv.poster_path}
								url={`/${mv.id}`}
							/>
						);
					})}
				</MovieGrid>
			</InfiniteScroll>
		</Container>
	);
}

const MovieGrid = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 2em;
	margin: 0 auto;
`;

const Container = styled.div`
	overflow-y: auto;
`;
