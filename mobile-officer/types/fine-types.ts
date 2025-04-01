export interface FineRequest {
  driverName: string; // Driver's full name
  licenseNumber: string; // Driver's license number
  vehicleNumber: string; // Vehicle registration number
  location: string; // Location where the fine was issued
  category: string; // Category of the violation
  fineAmount: number; // Amount of the fine
  policeOfficerId: number; // ID of the issuing police officer
}

export interface Fine {
  fineId: number; // Unique identifier for the fine
  driverName: string;
  licenseNumber: string;
  vehicleNumber: string;
  location: string;
  category: string;
  fineAmount: number;
  policeOfficerId: number;
  status: "PENDING" | "COMPLETED"; // Fine status
  createdAt: string; // Date and time when the fine was created (ISO format)
  updatedAt: string; // Date and time when the fine was last updated (ISO format)
}