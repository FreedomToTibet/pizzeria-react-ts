import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISortBy {
  name: string;
  sort: string;
}

interface IFilterState {
  category: number;
  increase: boolean;
  sortBy: ISortBy;
  page: number;
}

const initialState: IFilterState = {
	category: 0,
	increase: true,
	sortBy: { name: 'population', sort: 'rating' },
	page: 1,
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<number>) => {
			state.category = action.payload;
		},
		setSortBy: (state, action: PayloadAction<ISortBy>) => {
			state.sortBy = action.payload;
		},
		setIncrease: (state) => {
			state.increase = !state.increase;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
	},
});

export const { setCategory, setSortBy, setIncrease, setPage } = filterSlice.actions;
export default filterSlice.reducer;