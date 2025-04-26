import { IBookingData } from "@/types/booking";
import api from "./api";

export const getBookings = async () => {
  const response = await api.get("/bookings");
  return response.data;
};

export const createBooking = async (profileData: IBookingData) => {
  const response = await api.post("/bookings", profileData);
  return response.data;
};

export const getBooking = async (id: string) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

export const updatBookingById = async (
  id: string,
  profileData: IBookingData
) => {
  const response = await api.patch(`/bookings/${id}`, profileData);
  return response.data;
};

export const deleteBooking = async (id: string) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};
