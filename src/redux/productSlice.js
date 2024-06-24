import { createSlice, nanoid } from '@reduxjs/toolkit';
import { updateInvoice } from './invoicesSlice';
const initialState = {
  products: [
    { id: nanoid(), name: 'Item 1', price: 1 },
  ],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({ ...action.payload, id: nanoid() });
    },
    editProduct: (state, action) => {
      const { id, name, price } = action.payload;
      const existingProduct = state.products.find(product => product.id === id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.price = price;
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter(product => product.id !== id);
    },
  },
});
export const selectProducts = (state) => state.products.products;
export const { addProduct, editProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
