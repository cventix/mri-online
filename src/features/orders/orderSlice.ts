import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchOrders } from './orderAPI';

export interface IOrder {
  order_number: number;
  customer: {
    first_name: string;
    last_name: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  order_details: {
    value: number;
    date: string;
  };
  shipping_details: {
    date: string;
  };
  status: 'open' | 'shipped' | 'cancelled';
}

export interface OrderState {
  entities: IOrder[];
  loading: boolean;
}

const initialState: OrderState = {
  entities: [],
  loading: false,
};

export const fetchOrdersAsync = createAsyncThunk('orders/fetchOrdersAsync', async () => {
  return await fetchOrders();
});

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action: PayloadAction<IOrder[]>) => {
        state.loading = false;
        state.entities = action.payload;
      });
  },
});

export const selectEntities = (state: RootState) => state.orders.entities;
export const selectLoading = (state: RootState) => state.orders.loading;

export default orderSlice.reducer;
