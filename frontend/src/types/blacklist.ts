export interface BlacklistEntry {
    id: string;
    name: string;
    license: string;
    date: string;
    reason: string;
    points: number;
    status:
    | "Blacklisted"
    | "Blacklisted (Immediate)"
    | "Blacklisted (Permanent)"
    | "Blacklisted (Temporary)";
}
