import { IFanCardData } from "@/types/fanCard";
import api from "./api";

export const getFanCards = async () => {
  const response = await api.get("/fan-cards");
  return response.data;
};

export const createFanCard = async (profileData: IFanCardData) => {
  const response = await api.post("/fan-cards", profileData);
  return response.data;
};

export const getFanCard = async (id: string) => {
  const response = await api.get(`/fan-cards/${id}`);
  return response.data;
};

export const updatFanCardById = async (
  id: string,
  profileData: IFanCardData
) => {
  const response = await api.patch(`/fan-cards/${id}`, profileData);
  return response.data;
};

export const deleteFanCard = async (id: string) => {
  const response = await api.delete(`/fan-cards/${id}`);
  return response.data;
};
