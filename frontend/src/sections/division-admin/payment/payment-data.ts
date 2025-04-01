import { PaymentEntry } from "@/types/payment";

export const paymentData: PaymentEntry[] = [
  {
    id: "P2025022801",
    name: "Abram Vaccaro",
    amount: 250.0,
    date: "2025-02-28",
    method: "Credit Card",
    status: "Completed",
  },
  {
    id: "P2025022002",
    name: "Skylar Bator",
    amount: 100.0,
    date: "2025-02-20",
    method: "Bank Slip",
    status: "Pending",
  },
  {
    id: "P2025021503",
    name: "Gustavo Curtis",
    amount: 75.5,
    date: "2025-02-15",
    method: "Online Payment",
    status: "Completed",
  },
  {
    id: "P2025021004",
    name: "Abram Vaccaro",
    amount: 320.0,
    date: "2025-02-10",
    method: "Credit Card",
    status: "Failed",
  },
  {
    id: "P2025020505",
    name: "Jakob Dokidis",
    amount: 150.0,
    date: "2025-02-05",
    method: "Bank Slip",
    status: "Completed",
  },
  {
    id: "P2025020306",
    name: "Elena Knight",
    amount: 50.0,
    date: "2025-02-03",
    method: "Online Payment",
    status: "Refunded",
  },
];
