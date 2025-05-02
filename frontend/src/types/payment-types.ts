export interface Payment {
    paymentDate: any;
    fineId: any;
    name: string;
    status: any;
    paymentId: any;
    id: string;
    method: string;
    amount: number;
    date: string;
}

export interface PaymentResponse {
    content: Payment[];
    totalPages: number;
    totalElements: number;
    number: number; // current page number
}

export interface PaymentFilters {
    method?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
}

export interface PaymentAllResponse {
    payments: Payment[];
}
