import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define Product interface structure
interface Product {
  id: number;
  name: string;
  price: number; // Price in BTC
  weight: number;
  modelPath: string;
}

// Define state structure for products
interface ProductsState {
  items: Product[];
}

// Initialize state with default products
const initialState: ProductsState = {
  items: [
    {
      id: 1,
      name: "Outdoor",
      price: 0.0015,
      weight: 1,
      modelPath: "/models/product1.glb",
    },
    {
      id: 2,
      name: "Greenhouse",
      price: 0.002,
      weight: 1,
      modelPath: "/models/product2.glb",
    },
    {
      id: 3,
      name: "Indoor",
      price: 0.0025,
      weight: 1,
      modelPath: "/models/product3.glb",
    },
  ],
};

// Create the products slice with reducers
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Add a new product to the store
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
  },
});

// Export actions and reducer
export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
