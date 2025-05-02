export interface PaymentEntry {
    paymentId: string;
    fineId: string;
    amount: number;
    paymentDate: string;
    method: "Credit Card" | "SLIP" | "Online Payment";
    status: "AAPROVED" | "PENDING" | "Failed" | "Refunded";
}
