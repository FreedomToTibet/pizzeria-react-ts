import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  quantity: number;
}

interface ICartState {
  total: number;
  items: ICartItem[];
}

const initialState: ICartState = {
	total: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<Omit<ICartItem, 'quantity'>>) => {
			const existingItem = state.items.find(
				item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type
			);

			if (existingItem) {
				existingItem.quantity += 1;
				state.total += Math.floor(action.payload.price);
				return;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
				state.total += Math.floor(action.payload.price);
			}
		},
		decreaseItem: (state, action: PayloadAction<{ id: string; price: number }>) => {
			const existingItem = state.items.find(obj => obj.id === action.payload.id);

			if (existingItem && existingItem.quantity > 1) {
				existingItem.quantity -= 1;
				state.total -= Math.floor(action.payload.price);
				return;
			}
		},
		removeItem: (state, action: PayloadAction<{ id: string; price: number }>) => {
			const existingItem = state.items.find(obj => obj.id === action.payload.id);
			if (existingItem) {
				state.total -= Math.floor(action.payload.price) * existingItem.quantity;
				state.items = state.items.filter((obj) => obj.id !== action.payload.id);
			}
		},
		clearItems: (state) => {
			state.items = [];
			state.total = 0;
		},
	},
});

export const { addItem, decreaseItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;