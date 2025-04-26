export interface IBooking {
  _id: string;
  createdAt: string;
  fullName: string;
  email: string;
  mobile: string;
  userId: string;
  serviceType: string;
  celebrityId: string;
  datetime: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
}

export interface IBookingData {
  fullName: string;
  email: string;
  mobile: string;
  serviceType: string;
  celebrityId: string;
  datetime: string;
}
