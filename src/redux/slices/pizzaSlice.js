import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params) => {
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
  status: 'loading',		// 'loading' | 'success' | 'error'
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
        state.status = 'loading';
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.pizzas = [];
      });
  },
});

export const {setPizzas} = pizzaSlice.actions;
export default pizzaSlice.reducer;
