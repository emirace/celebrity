import { IMeetData } from "@/types/meet";
import api from "./api";

export const getMeets = async () => {
  const response = await api.get("/meets");
  return response.data;
};

export const createMeet = async (profileData: IMeetData) => {
  const response = await api.post("/meets", profileData);
  return response.data;
};

export const getMeet = async (id: string) => {
  const response = await api.get(`/meets/${id}`);
  return response.data;
};

export const updatMeetById = async (id: string, profileData: IMeetData) => {
  const response = await api.patch(`/meets/${id}`, profileData);
  return response.data;
};

export const deleteMeet = async (id: string) => {
  const response = await api.delete(`/meets/${id}`);
  return response.data;
};
