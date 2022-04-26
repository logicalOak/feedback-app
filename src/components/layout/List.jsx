import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Loader } from '..';
import { fetchFeedback } from '../../features/feedback/feedbackSlice';
import { average } from '../../utils/helpers';

const List = () => {
	const dispatch = useDispatch();
	const { items, isLoading, isError } = useSelector(
		({ feedback }) => feedback
	);

	useEffect(() => {
		dispatch(fetchFeedback());
	}, []);

	// Show loader
	if (isLoading) return <Loader />;
	if (isError) return <Loader error />;

	// Show message if no feedback
	if (items.length === 0)
		return (
			<p className='mt-5 text-center text-lg font-semibold'>
				No feedback yet
			</p>
		);

	return (
		<div className='flex flex-col items-start gap-3 my-3'>
			<p className='w-full flex items-center justify-between gap-2 text-sm sm:text-base'>
				<span>{items.length} Reviews</span>
				<span>
					Average Rating: {isNaN(average(items)) ? 0 : average(items)}
				</span>
			</p>

			<div className='grid justify-items-start gap-3 w-full'>
				<AnimatePresence>
					{items.map((i) => (
						<motion.div
							className='w-full'
							key={i.id}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							layout
						>
							<ListItem {...i} />
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default List;
