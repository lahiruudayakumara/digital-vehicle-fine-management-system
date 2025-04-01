export interface Officer {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    patrolLocation: string;
    status?: "active" | "onLeave"; // Optional status field
}