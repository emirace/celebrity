import { IMembership } from "@/types/membership";
import api from "./api";

export async function getAllMemberships(): Promise<IMembership[]> {
  const res = await api.get("/memberships");
  return res.data;
}

export async function getMembershipById(id: string): Promise<IMembership> {
  const res = await api.get(`/memberships/${id}`);
  return res.data;
}

export async function createMembership(
  data: Omit<IMembership, "_id">
): Promise<IMembership> {
  const res = await api.post("/memberships", data);
  return res.data;
}

export async function updateMembership(
  id: string,
  data: Partial<IMembership>
): Promise<IMembership> {
  const res = await api.put(`/memberships/${id}`, data);
  return res.data;
}

export async function deleteMembership(
  id: string
): Promise<{ message: string }> {
  const res = await api.delete(`/memberships/${id}`);
  return res.data;
}
