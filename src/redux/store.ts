import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzaSlice from './slices/pizzaSlice';
import { loadState, saveState } from '../utils/localStorage';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
		// @ts-ignore
		filterSlice,
		cartSlice,
		pizzaSlice,
	},
	preloadedState,
})

store.subscribe(() => {
  saveState({
    cartSlice: store.getState().cartSlice,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;