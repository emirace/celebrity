import { IUser } from "./user";

export interface IMeet {
  _id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  userId: string;
  celebrityId: IUser;
  reason: string;
  gender: string;
  occupation: string;
  state: string;
  city: string;
  address: string;
  duration: string;
  passport: string;
  meetId: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
}

export interface IMeetData {
  firstName: string;
  lastName: string;
  celebrityId: string;
  reason: string;
  gender: string;
  occupation: string;
  state: string;
  city: string;
  address: string;
  duration: string;
  passport?: string;
}
