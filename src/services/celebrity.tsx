import { IProfileData } from "../types/user";
import api from "./api";

export const getCelebrities = async () => {
  const response = await api.get("/users/celebrities");
  return response.data;
};

export const createCelebrity = async (profileData: IProfileData) => {
  const response = await api.post("/users/celebrities", profileData);
  return response.data;
};

export const getCelebrity = async (id: string) => {
  const response = await api.get(`/users/celebrities/${id}`);
  return response.data;
};

export const updateUserById = async (id: string, profileData: IProfileData) => {
  const response = await api.patch(`/users/celebrities/${id}`, profileData);
  return response.data;
};

export const deleteCelebrity = async (id: string) => {
  const response = await api.delete(`/users/celebrities/${id}`);
  return response.data;
};
