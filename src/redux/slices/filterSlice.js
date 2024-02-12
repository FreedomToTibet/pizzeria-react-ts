import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	category: 0,
	sortBy: { name: 'population', sort: 'rating' },
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory: (state, action) => {
			state.category = action.payload;
		},
		setSortBy: (state, action) => {
			state.sortBy = action.payload;
		},
	},
});

const { actions, reducer } = filterSlice;
export const { setCategory, setSortBy } = actions;
export default reducer;
