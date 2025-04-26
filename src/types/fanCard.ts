import { IUser } from "./user";

export interface IFanCard {
  _id: string;
  createdAt: string;
  userId: string;
  fandomTheme: string;
  celebrityId: IUser;
  photoUrl: string;
  nickname: string;
  fanId: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
}

export interface IFanCardData {
  fandomTheme: string;
  photoUrl: string;
  nickname: string;
  celebrityId: string;
}
