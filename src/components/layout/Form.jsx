import { motionValue } from 'framer-motion';
import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
	addFeedback,
	editFeedback,
} from '../../features/feedback/feedbackSlice';
import { motion } from 'framer-motion';

const Form = () => {
	// useForm
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();
	// store
	const [selected, setSelected] = useState(10);
	// redux
	const dispatch = useDispatch();
	const { isEditing } = useSelector(({ feedback }) => feedback);

	// Set form when editing is true
	useEffect(() => {
		if (isEditing.edit === true) {
			setSelected(isEditing.item.rating);
			setValue('text', isEditing.item.text);
		}
	}, [isEditing]);

	const onSubmit = (data) => {
		dispatch(
			isEditing.edit === true
				? editFeedback({
						id: isEditing.item.id,
						editItem: data,
				  })
				: addFeedback(data)
		);
		setSelected(10);
		reset();
	};

	return (
		<form className='form' onSubmit={handleSubmit(onSubmit)}>
			<h2 className='text-lg font-semibold'>How much do you rate us?</h2>

			{/* Rating */}
			<div className='flex flex-wrap justify-center items-center gap-2'>
				{[...Array(10)].map((i, idx) => (
					<div key={idx}>
						<input
							type='radio'
							className='peer visually-hidden'
							name='rating'
							id={`${idx + 1}`}
							value={idx + 1}
							checked={Number(selected) === idx + 1}
							{...register('rating', {
								required: true,
								onChange: (e) => setSelected(e.target.value),
							})}
						/>
						<label
							htmlFor={`${idx + 1}`}
							className={`option ${
								errors.rating && 'bg-red-500'
							}`}
						>
							{idx + 1}
						</label>
					</div>
				))}
			</div>

			{/* Text Input*/}
			<div className='relative w-full'>
				<div>
					<input
						className={`input ${errors.text && 'border-red-500'} `}
						type='text'
						name='text'
						placeholder='Write your review'
						{...register('text', {
							required: true,
							minLength: 10,
						})}
					/>
				</div>

				{/* Error message */}
				{errors.text && (
					<motion.p
						className='text-red-500 pt-1 text-sm'
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
					>
						Review must be at least 10 characters
					</motion.p>
				)}
				{/* Button */}
				<button
					className={`btn ${
						errors.text && 'bg-slate-300 pointer-events-none'
					}`}
					type='submit'
				>
					Send
				</button>
			</div>
		</form>
	);
};

export default Form;
