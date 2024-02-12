import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	category: 0,
	increase: true,
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
		setIncrease: (state) => {
			state.increase = !state.increase;
		},
	},
});

const { actions, reducer } = filterSlice;
export const { setCategory, setSortBy, setIncrease } = actions;
export default reducer;