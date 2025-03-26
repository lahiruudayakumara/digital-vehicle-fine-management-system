// officer-slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PoliceOfficer } from '@/types/officer-types';
import { fetchPoliceOfficers, fetchPoliceOfficerById, updatePoliceOfficer, deletePoliceOfficer } from './officer-actions';

interface OfficerState {
  officers: PoliceOfficer[];
  selectedOfficer: PoliceOfficer | null;
  loading: boolean;
  error: string | null;
}

const initialState: OfficerState = {
  officers: [],
  selectedOfficer: null,
  loading: false,
  error: null,
};

const officerSlice = createSlice({
  name: 'officer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all officers
    builder.addCase(fetchPoliceOfficers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPoliceOfficers.fulfilled, (state, action) => {
      state.officers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPoliceOfficers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch officers';
    });

    // Fetch a single officer by ID
    builder.addCase(fetchPoliceOfficerById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPoliceOfficerById.fulfilled, (state, action) => {
      state.selectedOfficer = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPoliceOfficerById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch officer';
    });

    // Update a police officer
    builder.addCase(updatePoliceOfficer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePoliceOfficer.fulfilled, (state, action) => {
      const index = state.officers.findIndex((officer) => officer.badgeID === action.payload.badgeID);
      if (index !== -1) {
        state.officers[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updatePoliceOfficer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update officer';
    });

    // Delete a police officer
    builder.addCase(deletePoliceOfficer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePoliceOfficer.fulfilled, (state, action) => {
      state.officers = state.officers.filter((officer) => officer.badgeID !== action.meta.arg);
      state.loading = false;
    });
    builder.addCase(deletePoliceOfficer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete officer';
    });
  },
});

export default officerSlice.reducer;
