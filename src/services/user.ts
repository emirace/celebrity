import { IProfileData } from "../types/user";
import api from "./api";

export const getUserProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const updateUserProfile = async (profileData: IProfileData) => {
  const response = await api.put("/users", profileData);
  return response.data;
};

export const updateUserById = async (id: string, profileData: IProfileData) => {
  const response = await api.patch(`/users/${id}`, profileData);
  return response.data;
};

export const fetchAllUsers = async (data?: { search?: string }) => {
  try {
    const response = await api.get("/users", {
      params: { ...data },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const fetchCelebrities = async (data?: {
  search?: string;
  page?: number;
}) => {
  try {
    const response = await api.get("/users/celebrities", {
      params: { ...data },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching celebritties:", error);
    throw error;
  }
};

export const adminFetchCelebrities = async (data?: {
  search?: string;
  page?: number;
}) => {
  try {
    const response = await api.get("/users/celebrities/admin", {
      params: { ...data },
    });
    return response.data;
  } catch (error) {
    console.error("Error user fetching celebritties:", error);
    throw error;
  }
};

export const addCelebrity = async (data: IProfileData) => {
  const response = await api.post("/users/celebrities", data);
  return response.data;
};

export const editCelebrity = async (id: string, profileData: IProfileData) => {
  const response = await api.put(`/users/celebrities/${id}`, profileData);
  return response.data;
};

export const deleteCelebrity = async (id: string) => {
  const response = await api.delete(`/users/celebrities/${id}`);
  return response.data;
};
