import { createAsyncThunk } from '@reduxjs/toolkit';
import { PoliceOfficer, PoliceOfficerUpdate } from '@/types/officer-types';
import { RootState } from '@/stores/store'; // Ensure this path is correct

// Import the updated API functions
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
      const officers = await fetchOfficersAPI(); // Fetch officers from the API
      return officers; // Return the fetched officers
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
      const officer = await fetchOfficerByIdAPI(badgeID); // Fetch the officer by ID
      return officer; // Return the fetched officer
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
      const updatedOfficer = await updateOfficerAPI(badgeID, data); // Update officer using the API
      return updatedOfficer; // Return the updated officer
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
      await deleteOfficerAPI(badgeID); // Delete officer by ID using the API
      return badgeID; // Return the badgeID so it can be removed from the state
    } catch (error) {
      return rejectWithValue('Failed to delete officer');
    }
  }
);
