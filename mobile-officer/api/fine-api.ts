import { Fine, FineRequest } from "@/types/fine-types";
import API from "./api-instance";

// Fetch all fines
export const fetchFines = async (): Promise<Fine[]> => {
  const response = await API.get("/fines");
  return response.data;
};

// Create a new fine
export const createFine = async (data: FineRequest): Promise<Fine> => {
  const response = await API.post("/fines", data);
  return response.data;
};

// Update a fine
export const updateFine = async (fineId: string, data: FineRequest): Promise<Fine> => {
  const response = await API.put(`/fines/${fineId}`, data);
  return response.data;
};

// Delete a fine
export const deleteFine = async (fineId: string): Promise<void> => {
  await API.delete(`/fines/${fineId}`);
};