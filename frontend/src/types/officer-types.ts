// officer-types.ts

export interface PoliceOfficer {
    badgeID: string;
    fullName: string;
    address: string;
    telephone: string;
    email: string;
    patrolLocations: string[];
  }
  
  export interface PoliceOfficerUpdate {
    username?: string;
    fullName: string;
    telephone: string;
    email: string;
    address: string;
    password?: string; 
    patrolLocations: string[];
  }
  
  export interface PoliceOfficerResponseDTO {
    badgeID: string;
    fullName: string;
    email: string;
    address: string;
    telephone: string;
    patrolLocations: string[];
  }
  