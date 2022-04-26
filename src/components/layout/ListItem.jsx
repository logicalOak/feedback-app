import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
	deleteFeedback,
	setEditing,
} from '../../features/feedback/feedbackSlice';

const ListItem = ({ rating, text, id }) => {
	const dispatch = useDispatch();

	const editItem = (id) => {
		dispatch(
			setEditing({
				item: { rating, text, id },
				edit: true,
			})
		);
	};
	return (
		<div className='bg-white shadow rounded-lg relative p-4 pt-8 lg:p-5 lg:pt-9 dark:bg-slate-900 dark:text-white'>
			{/* Control */}
			<div className='absolute right-2 top-2 flex items-center gap-1'>
				<button className='p-1' onClick={() => editItem(id)}>
					<FaEdit className='text-lg text-slate-600 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-500' />
				</button>
				<button
					className='p-1'
					onClick={() => dispatch(deleteFeedback(id))}
				>
					<FaTrashAlt className='text-lg lg:text-xl text-slate-600 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-500' />
				</button>
			</div>
			{/* Rating */}
			<p className='absolute -left-1 -top-1 flex justify-center items-center w-[30px] h-[30px] rounded-full bg-slate-600 text-white font-semibold text-md dark:bg-slate-500'>
				{rating}
			</p>
			{/* Text */}
			<p className='text-sm sm:text-base'>{text}</p>
		</div>
	);
};

export default ListItem;
