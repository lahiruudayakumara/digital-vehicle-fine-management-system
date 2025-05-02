import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllPayments, fetchPayments } from "@/stores/slices/payment/payment-action";
import { Payment, PaymentResponse, PaymentAllResponse } from "@/types/payment-types";

interface PaymentState {
    payments: Payment[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
}

const initialState: PaymentState = {
    payments: [],
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handling the fetchPayments action
            .addCase(fetchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action: PayloadAction<PaymentResponse>) => {
                state.payments = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.totalElements = action.payload.totalElements;
                state.currentPage = action.payload.number;
                state.loading = false;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Handling the fetchAllPayments action
            .addCase(fetchAllPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllPayments.fulfilled, (state, action: PayloadAction<any>) => {
                // Assuming the response contains a `payments` array
                state.payments = action.payload.data; // Adjust according to your API response structure
                state.loading = false;
            })
            .addCase(fetchAllPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default paymentSlice.reducer;
