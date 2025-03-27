import { createAsyncThunk } from '@reduxjs/toolkit';
import { PoliceOfficer, PoliceOfficerUpdate } from '@/types/officer-types';
import { RootState } from '@/stores/store'; 


import {
  fetchPoliceOfficers as fetchOfficersAPI,
  fetchPoliceOfficerById as fetchOfficerByIdAPI,
  updatePoliceOfficer as updateOfficerAPI,
  deletePoliceOfficer as deleteOfficerAPI,
} from '@/api/officer-api';

// Fetch all police officers
export const fetchPoliceOfficers = createAsyncThunk<PoliceOfficer[], void, { state: RootState }>(
  'officers/fetchPoliceOfficers',
  async (_, { rejectWithValue }) => {
    try {
      const officers = await fetchOfficersAPI(); 
      return officers; 
    } catch (error) {
      return rejectWithValue('Failed to fetch officers');
    }
  }
);

// Fetch a single police officer by badgeID
export const fetchPoliceOfficerById = createAsyncThunk<PoliceOfficer, string, { state: RootState }>(
  'officers/fetchPoliceOfficerById',
  async (badgeID, { rejectWithValue }) => {
    try {
      const officer = await fetchOfficerByIdAPI(badgeID); 
      return officer; 
    } catch (error) {
      return rejectWithValue('Failed to fetch officer');
    }
  }
);

// Update a police officer
export const updatePoliceOfficer = createAsyncThunk<PoliceOfficer, { badgeID: string, data: PoliceOfficerUpdate }, { state: RootState }>(
  'officers/updatePoliceOfficer',
  async ({ badgeID, data }, { rejectWithValue }) => {
    try {
      const updatedOfficer = await updateOfficerAPI(badgeID, data); 
      return updatedOfficer;
    } catch (error) {
      return rejectWithValue('Failed to update officer');
    }
  }
);

// Delete a police officer
export const deletePoliceOfficer = createAsyncThunk<string, string, { state: RootState }>(
  'officers/deletePoliceOfficer',
  async (badgeID, { rejectWithValue }) => {
    try {
      await deleteOfficerAPI(badgeID); 
      return badgeID; 
    } catch (error) {
      return rejectWithValue('Failed to delete officer');
    }
  }
);
