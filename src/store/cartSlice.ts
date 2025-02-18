import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define CartItem interface structure
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  weight: number;
}

// Define state structure for cart
interface CartState {
  items: CartItem[];
}

// Initialize empty cart state
const initialState: CartState = {
  items: [],
};

// Create the cart slice with reducers
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart or update quantity if it exists
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.weight += action.payload.weight;
      } else {
        state.items.push(action.payload);
      }
    },
    // Remove item from cart by ID
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Update item quantity and adjust weight accordingly
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        item.weight = item.weight * (action.payload.quantity / item.quantity);
      }
    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
