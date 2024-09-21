import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	category: 0,
	increase: true,
	sortBy: { name: 'population', sort: 'rating' },
	page: 1,
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
		setIncrease: (state) => {
			state.increase = !state.increase;
		},
		setPage: (state, action) => {
			state.page = action.payload;
		},
	},
});

export const { setCategory, setSortBy, setIncrease, setPage } = filterSlice.actions;
export default filterSlice.reducer;