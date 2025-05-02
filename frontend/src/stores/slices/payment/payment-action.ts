import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPayments, getPayments } from "@/api/payment-api";
import { PaymentFilters } from "@/types/payment-types";

// Fetch payments with filters
export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async (filters: PaymentFilters, { rejectWithValue }) => {
    try {
      const response = await getPayments(filters);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch payments");
    }
  }
);

export const fetchAllPayments = createAsyncThunk(
    "payments/fetchAllPayments",
    async (_, { rejectWithValue }) => {
      try {
        const response = await getAllPayments(); // Assuming getAllPayments fetches all payments without filters
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch all payments");
      }
    }
  );