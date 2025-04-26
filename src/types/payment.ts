import { IUser } from "./user";

export interface IPayment {
  _id: string;
  createdAt: string;
  userId: IUser;
  amount: number;
  currency: string;
  type: string;
  paymentMethod: string;
  transactionId: string;
  status: string;
  receipt: string;
  meta: object;
}
