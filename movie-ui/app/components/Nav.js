'use client';
import React, { use, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, signout } from '../store/slices/authSlice';
import { fetchWatchListMovies } from '../store/slices/watchListSlice';
import { useRouter } from 'next/navigation';

export const Nav = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const authenticated = useSelector((state) => state.auth.authenticated);
	const email = useSelector((state) => state.auth.email);
	const watchListCount = useSelector((state) => state.watchList.count);

	useEffect(() => {
		dispatch(fetchUser());
		if (authenticated) {
			dispatch(fetchUser());
			dispatch(fetchWatchListMovies());
		}
	}, [authenticated, email, dispatch]);

	const handleSignOutClick = () => {
		dispatch(signout());
		router.push('/');
	};

	const renderLinks = () => {
		if (authenticated) {
			return (
				<>
					<Link href='/watch-list'>
						<li>Watch List: {watchListCount || 0}</li>
					</Link>
					<li>{email}</li>
					<li>
						<LinkButton href='#' onClick={handleSignOutClick}>
							Sign Out
						</LinkButton>
					</li>
				</>
			);
		} else {
			return (
				<>
					<li>
						<Link href='/signup'>Sign Up</Link>
					</li>
					<li>
						<Link href='/signin'>Sign In</Link>
					</li>
				</>
			);
		}
	};

	return (
		<NavContainer>
			<div id='logo'>
				<Link href='/'>MovieFinder</Link>
			</div>
			<NavUl>{renderLinks()}</NavUl>
		</NavContainer>
	);
};

const NavContainer = styled.div`
	position: fixed;
	z-index: 999;
	background: hsl(0, 0%, 13%);
	color: whitesmoke;
	margin: 0;
	width: 100%;
	height: auto;
	padding: 1.5em;
	#logo {
		position: relative;
		float: left;
		width: 150px;
		height: auto;
	}
	a {
		color: #fff;
	}
`;

const NavUl = styled.ul`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	list-style: none;
	li:first-child {
		float: left;
	}
	li {
		margin-left: 0.8em;
		padding: 0.5em;
	}
	li a {
		color: whitesmoke;
	}
`;

const LinkButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	color: whitesmoke;
	font-family: Oswald, sans-serif;
	font-size: 20px;
`;
