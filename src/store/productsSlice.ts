import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
  modelPath: string;
}

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [
    {
      id: 1,
      name: "Outdoor",
      price: 0.0005,
      weight: 1,
      modelPath: "/models/product1.glb",
    },
    {
      id: 2,
      name: "Greenhouse",
      price: 0.0007,
      weight: 1,
      modelPath: "/models/product2.glb",
    },
    {
      id: 3,
      name: "Indoor",
      price: 0.0009,
      weight: 1,
      modelPath: "/models/product3.glb",
    },
  ],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
