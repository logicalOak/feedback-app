import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// creators functions
import {
	fetchFeedbackCreator,
	addFeedbackCreator,
	deleteFeedbackCreator,
	editFeedbackCreator,
} from './feedbackCreator';

const GET_FEEDBACK = '@@feedback/fetchFeedback';
const ADD_FEEDBACK = '@@feedback/addFeedback';
const DELETE_FEEDBACK = '@@feedback/deleteFeedback';
const EDIT_FEEDBACK = '@@feedback/editFeedback';

/* Initializing the state of the slice. */
const initialState = {
	items: [],
	isEditing: {
		item: {},
		edit: false,
	},
	isLoading: false,
	isError: null,
};

// createAsyncThunk
export const fetchFeedback = createAsyncThunk(
	GET_FEEDBACK,
	fetchFeedbackCreator
);
export const addFeedback = createAsyncThunk(ADD_FEEDBACK, addFeedbackCreator);
export const editFeedback = createAsyncThunk(
	EDIT_FEEDBACK,
	editFeedbackCreator
);
export const deleteFeedback = createAsyncThunk(
	DELETE_FEEDBACK,
	deleteFeedbackCreator
);

/* It creates a new slice. */
const feedbackSlice = createSlice({
	name: 'feedback',
	initialState,
	reducers: {
		setEditing: (state, { payload }) => {
			state.isEditing = payload;
		},
	},
	extraReducers: {
		// fetchFeedback
		[fetchFeedback.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchFeedback.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = null;
			state.items = payload;
		},
		[fetchFeedback.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = payload;
		},

		// addFeedback
		[addFeedback.pending]: (state) => {
			state.isLoading = true;
		},
		[addFeedback.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = null;
			state.items = [...state.items, payload].sort((a, b) => b.id - a.id);
		},
		[addFeedback.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = payload;
		},

		// deleteFeedback
		[deleteFeedback.pending]: (state) => {
			state.isLoading = true;
			state.isError = null;
		},
		[deleteFeedback.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = null;
			state.items = state.items.filter((item) => item.id !== payload);
		},
		[deleteFeedback.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = payload;
		},

		// editFeedback
		[editFeedback.pending]: (state) => {
			state.isLoading = true;
		},
		[editFeedback.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = null;
			state.items = state.items.map((item) =>
				item.id === payload.id ? payload : item
			);
			state.isEditing = {
				item: {},
				edit: false,
			};
		},
		[editFeedback.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.isError = payload;
		},
	},
});

/* Exporting the `resetUsers` action from the slice. */
export const { setEditing } = feedbackSlice.actions;
/* Exporting the reducer. */
export default feedbackSlice.reducer;
