import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface IFetchPizzasArgs {
  host: string;
  page: number;
  category: number;
  sortBy: { name: string; sort: string };
  increase: boolean;
}

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params: IFetchPizzasArgs) => {
	const {host, page, category, sortBy, increase} = params;
  const {data} = await axios.get(
    `${host}?page=${page}&limit=4&${category > 0 ? `category=${category}` : ''}&sortBy=${
      sortBy.sort
    }&${increase ? `order=asc` : `order=desc`}`,
  );
  return data;
});

const initialState = {
  pizzas: [],
  status: Status.LOADING,		// 'loading' | 'success' | 'error'
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas: (state, action) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.pizzas = [];
      });
  },
});

export const {setPizzas} = pizzaSlice.actions;
export default pizzaSlice.reducer;
