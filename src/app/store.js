import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from '../features/feedback/feedbackSlice';

/* Creating a store with the reducer we just created. */
export const store = configureStore({
	reducer: {
		feedback: feedbackReducer,
	},
});
