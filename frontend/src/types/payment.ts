export interface PaymentEntry {
    id: string;
    name: string;
    amount: number;
    date: string;
    method: "Credit Card" | "Bank Slip" | "Online Payment";
    status: "Completed" | "Pending" | "Failed" | "Refunded";
}
