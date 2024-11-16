import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w185';

const Movie = ({ url, img, title }) => {
	const [isHovered, setIsHovered] = useState(false);

	const springProps = useSpring({
		transform: isHovered ? 'scale(1.06)' : 'scale(1)',
		config: { tension: 280, friction: 60 },
	});

	return (
		<Link href={url}>
			<AnimatedPoster
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				style={springProps}
				src={`${POSTER_PATH}${img}`}
				alt={title}
			/>
		</Link>
	);
};

export default Movie;

const AnimatedPoster = styled(animated.img)`
	box-shadow: 0 0 30px white;
`;
