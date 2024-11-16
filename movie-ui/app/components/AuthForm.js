'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styled from 'styled-components';
import { signup, signin } from '../store/slices/authSlice';

const userSchema = Yup.object().shape({
	email: Yup.string().email().required(),
	password: Yup.string().required(),
});

export const AuthForm = ({ type = 'signin' }) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(userSchema),
	});

	const dispatch = useDispatch();

	const handleFormSubmit = (data) => {
		const action = type === 'signin' ? signin : signup;
		dispatch(action(data));
		router.push('/');
	};

	return (
		<SignUpStyles>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<div className='form-group'>
					<label>Email</label>
					<input
						className='form-control'
						name='email'
						{...register('email', { required: true })}
					></input>
					{errors.email?.message}
				</div>

				<div className='form-group'>
					<label>Password</label>
					<input
						className='form-control'
						name='password'
						{...register('password', { required: true })}
					></input>
					{errors.password?.message}
				</div>

				<button className='btn btn-primary' type='submit'>
					Submit
				</button>
			</form>
		</SignUpStyles>
	);
};

const SignUpStyles = styled.div`
	margin-top: 40px;
`;
