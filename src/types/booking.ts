export interface IBooking {
  _id: string;
  createdAt: string;
  fullName: string;
  email: string;
  mobile: string;
  userId: string;
  serviceType: string;
  celebrityId: string;
  category: string;
  datetime: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
}

export interface IBookingData {
  name: string;
  email: string;
  phone: string;
  category: string;
  service: string;
  celebrityId: string;
  date: string;
  time: string;
}
