import { IPayment } from "@/types/payment";
import api from "./api";

interface ProcessPaymentParams {
  amount: number;
  currency: string;
  type: string;
  paymentMethod: string;
  receipt?: string;
  meta: object;
}

export const getAllPayments = async (): Promise<IPayment[]> => {
  const response = await api.get<IPayment[]>("/payments");
  return response.data;
};

export const getPaymentById = async (id: string): Promise<IPayment> => {
  const response = await api.get<IPayment>(`/payments/${id}`);
  return response.data;
};

export const updatePaymentStatus = async (
  id: string,
  status: string,
  reason?: string
): Promise<IPayment> => {
  const response = await api.put<IPayment>(`/payments/${id}`, {
    status,
    reason,
  });
  return response.data;
};

export const getUserPayments = async (): Promise<IPayment[]> => {
  const response = await api.get<IPayment[]>(`/payments/user`);
  return response.data;
};

export const processPayment = async (paymentData: ProcessPaymentParams) => {
  const response = await api.post("/payments", paymentData);
  return response.data;
};

export const deletePayment = async (id: string) => {
  const response = await api.delete("/payments/" + id);
  return response.data;
};
