import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Fine } from "@/types/fine-types";
import { createFineAction, getAllFinesAction, updateFineAction, deleteFineAction } from "@/stores/slices/fine/fine-action";

interface FineState {
  fines: Fine[];
  loading: boolean;
  error: string | null;
}

const initialState: FineState = {
  fines: [],
  loading: false,
  error: null,
};

const fineSlice = createSlice({
  name: 'fines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFinesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFinesAction.fulfilled, (state, action: PayloadAction<Fine[]>) => {
        state.loading = false;
        state.fines = action.payload;
      })
      .addCase(getAllFinesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createFineAction.fulfilled, (state, action: PayloadAction<Fine>) => {
        state.fines.push(action.payload);
      })
      .addCase(updateFineAction.fulfilled, (state, action: PayloadAction<Fine>) => {
        const index = state.fines.findIndex(fine => fine.fineId === action.payload.fineId);
        if (index !== -1) {
          state.fines[index] = action.payload;
        }
      })
      .addCase(deleteFineAction.fulfilled, (state, action: PayloadAction<number>) => {
        state.fines = state.fines.filter(fine => fine.fineId !== action.payload);
      });
  },
});

export default fineSlice.reducer;