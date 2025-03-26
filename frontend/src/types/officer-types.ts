// officer-types.ts

export interface PoliceOfficer {
    badgeID: string;
    fullName: string;
    address: string;
    telephone: string;
    patrolLocations: string[];
  }
  
  export interface PoliceOfficerUpdate {
    fullName: string;
    username: string;
    email: string;
    password: string;
    address: string;
    telephone: string;
    patrolLocations: string[];
  }
  
  export interface PoliceOfficerResponseDTO {
    badgeID: string;
    fullName: string;
    address: string;
    telephone: string;
    patrolLocations: string[];
  }
  