import { PoliceOfficer, PoliceOfficerUpdate } from "@/types/officer-types";
import API from "./api-instance";

// Fetch all police officers
export const fetchPoliceOfficers = async (): Promise<PoliceOfficer[]> => {
  const response = await API.get("/police-officers");
  return response.data;
};

// Fetch a single police officer by badgeID
export const fetchPoliceOfficerById = async (badgeID: string): Promise<PoliceOfficer> => {
  const response = await API.get(`/police-officers/${badgeID}`);
  return response.data;
};

// Update a police officer
export const updatePoliceOfficer = async (badgeID: string, data: PoliceOfficerUpdate): Promise<PoliceOfficer> => {
  const response = await API.patch(`/police-officers/${badgeID}`, data);
  return response.data;
};

// Delete a police officer
export const deletePoliceOfficer = async (badgeID: string): Promise<void> => {
  await API.delete(`/police-officers/${badgeID}`);
};