import API from "./api-instance";
import { PaymentResponse, PaymentFilters, PaymentAllResponse } from "@/types/payment-types";

export const getPayments = async (
    filters: PaymentFilters
): Promise<PaymentResponse> => {
    const response = await API.get<PaymentResponse>("/payment", {
        params: filters,
    });
    return response.data;
};

export const getAllPayments = async (): Promise<PaymentAllResponse> => {
    const response = await API.get<PaymentAllResponse>("/payment/all");
    console.log("All payments response:", response.data); // Debugging line
    return response.data;
};