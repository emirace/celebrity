import { IMembership } from "./membership";

export interface IUser {
  _id: string;
  createdAt: string;
  role: string;
  username: string;
  emailVerified: boolean;
  email: string;
  fullName: string;
  image?: string;
  nationality: string;
  mobile: string;
  dob: string;
  gender: string;
  address: string;
  age: number;
  job: string[];
  meetFee?: number;
  bookingFee?: number;
  fanCardFee?: number;
  membership: IMembership;
  security: boolean;
  passport?: string;
  pin?: string;
  backup?: string;
  securityQuestion?: string;
  securityAnswer?: string;
}

export interface IProfileData {
  fullName?: string;
  username?: string;
  email?: string;
  image?: string;
  mobile?: string;
  nationality?: string;
  dob?: string;
  gender?: string;
  address?: string;
  age?: number;
  job?: string;
  meetFee?: number;
  bookingFee?: number;
  fanCardFee?: number;
}
