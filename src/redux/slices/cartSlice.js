import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	total: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const existingItem = state.items.find(obj => obj.id === action.payload.id);

			if (existingItem) {
				existingItem.quantity += 1;
				state.total += Math.floor(action.payload.price);
				return;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
				state.total += Math.floor(action.payload.price);
			}
		},
		decreaseItem: (state, action) => {
			const existingItem = state.items.find(obj => obj.id === action.payload.id);

			if (existingItem.quantity > 1) {
				existingItem.quantity -= 1;
				state.total -= Math.floor(action.payload.price);
				return;
			}
		},
		removeItem: (state, action) => {
			const existingItem = state.items.find(obj => obj.id === action.payload.id);
			state.total -= Math.floor(action.payload.price) * existingItem.quantity;
			state.items = state.items.filter((obj) => obj.id !== action.payload.id);
		},
		clearItems: (state) => {
			state.items = [];
			state.total = 0;
		},
	},
});

export const { addItem, decreaseItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;