import axios from 'axios';

const URL = 'http://localhost:5000/feedback';

// fetch
export const fetchFeedbackCreator = async (_, thunkAPI) => {
	try {
		const { data } = await axios.get(`${URL}?_sort=id&_order=desc`);
		return data;
	} catch (e) {
		const message =
			(e.response && e.response.data && e.response.data.message) ||
			e.message ||
			e.toString();
		return thunkAPI.rejectWithValue(message);
	}
};

// add feedback
export const addFeedbackCreator = async ({ text, rating }, thunkAPI) => {
	const newFeedback = { text, rating: Number(rating) };
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const { data } = await axios.post(URL, newFeedback, config);
		return data;
	} catch (e) {
		const message =
			(e.response && e.response.data && e.response.data.message) ||
			e.message ||
			e.toString();
		return thunkAPI.rejectWithValue(message);
	}
};

// delete feedback

export const deleteFeedbackCreator = async (id, thunkAPI) => {
	if (window.confirm('Are you sure you want to delete?')) {
		try {
			await axios.delete(`${URL}/${id}`);
			return id;
		} catch (e) {
			const message =
				(e.response && e.response.data && e.response.data.message) ||
				e.message ||
				e.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
};

//edit feedback

export const editFeedbackCreator = async ({ id, editItem }, thunkAPI) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const { data } = await axios.put(`${URL}/${id}`, editItem, config);
		console.log(data);
		return data;
	} catch (e) {
		const message =
			(e.response && e.response.data && e.response.data.message) ||
			e.message ||
			e.toString();
		return thunkAPI.rejectWithValue(message);
	}
};
