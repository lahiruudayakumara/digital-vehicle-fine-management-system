import { createAsyncThunk } from '@reduxjs/toolkit';
import { createFine, deleteFine, fetchFines, updateFine } from "@/api/fine-api";
import { FineRequest, Fine } from "@/types/fine-types";

// Create Fine Action
export const createFineAction = createAsyncThunk<Fine, FineRequest>(
  'fines/createFine',
  async (fineData, { rejectWithValue }) => {
    try {
      const response = await createFine(fineData);
      return response;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || 'An unknown error occurred');
    }
  }
);

// Get All Fines Action
export const getAllFinesAction = createAsyncThunk<Fine[]>(
  'fines/getAllFines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchFines();
      return response;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || 'An unknown error occurred');
    }
  }
);

// Update Fine Action
export const updateFineAction = createAsyncThunk<Fine, { fineId: number; fineData: FineRequest }>(
  'fines/updateFine',
  async ({ fineId, fineData }, { rejectWithValue }) => {
    try {
      const response = await updateFine(fineId.toString(), fineData);
      return response;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || 'An unknown error occurred');
    }
  }
);

// Delete Fine Action
export const deleteFineAction = createAsyncThunk<number, number>(
  'fines/deleteFine',
  async (fineId, { rejectWithValue }) => {
    try {
      await deleteFine(fineId.toString());
      return fineId;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || 'An unknown error occurred');
    }
  }
);